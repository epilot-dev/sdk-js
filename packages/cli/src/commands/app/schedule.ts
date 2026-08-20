/**
 * Validation for function schedule expressions — a dependency-free mirror of
 * the platform-side validation in app-api (@epilot/app-manifest), so
 * `epilot app validate` gives the same feedback the deploy would.
 *
 * Accepted formats (both map 1:1 onto EventBridge Scheduler):
 *  - 5-field cron, crontab.guru compatible: `0 3 * * *`
 *  - rate expressions: `rate(30 minutes)`, `rate(1 hour)`, `rate(2 days)`
 */

/** Platform-wide minimum gap between two scheduled runs, in minutes. */
export const MIN_SCHEDULE_INTERVAL_MINUTES = 15;

export interface ScheduleValidationResult {
  valid: boolean;
  error?: string;
  /** Smallest gap between two consecutive occurrences, in minutes */
  minIntervalMinutes?: number;
}

const RATE_PATTERN = /^rate\((\d+)\s+(minute|minutes|hour|hours|day|days)\)$/;

export function validateScheduleExpression(
  expression: string,
  minIntervalMinutes: number = MIN_SCHEDULE_INTERVAL_MINUTES,
): ScheduleValidationResult {
  const expr = expression.trim();

  const rate = expr.match(RATE_PATTERN);
  if (rate) {
    const value = Number(rate[1]);
    const unit = rate[2];
    if (value < 1) {
      return { valid: false, error: 'rate() value must be at least 1' };
    }
    const minutes = unit.startsWith('minute') ? value : unit.startsWith('hour') ? value * 60 : value * 24 * 60;
    if (minutes < minIntervalMinutes) {
      return {
        valid: false,
        error: `Schedule fires every ${minutes} minute(s) — the minimum interval is ${minIntervalMinutes} minutes`,
        minIntervalMinutes: minutes,
      };
    }
    return { valid: true, minIntervalMinutes: minutes };
  }

  if (expr.startsWith('rate(')) {
    return { valid: false, error: 'Invalid rate expression — expected e.g. "rate(30 minutes)"' };
  }

  let cron: CronFields;
  try {
    cron = parseCron(expr);
  } catch (err) {
    return { valid: false, error: (err as Error).message };
  }

  if (cron.domRestricted && cron.dowRestricted) {
    return {
      valid: false,
      error: 'Restricting both day-of-month and day-of-week is not supported — set one of them to *',
    };
  }

  const gap = minFireGapMinutes(cron, minIntervalMinutes);
  if (gap === null) {
    return { valid: false, error: 'Schedule never fires' };
  }
  if (gap < minIntervalMinutes) {
    return {
      valid: false,
      error: `Schedule fires ${gap} minute(s) apart — the minimum interval is ${minIntervalMinutes} minutes`,
      minIntervalMinutes: gap,
    };
  }
  return { valid: true, minIntervalMinutes: gap };
}

interface CronFields {
  minute: Set<number>;
  hour: Set<number>;
  dayOfMonth: Set<number>;
  month: Set<number>;
  dayOfWeek: Set<number>;
  domRestricted: boolean;
  dowRestricted: boolean;
}

const FIELD_RANGES: [string, number, number][] = [
  ['minute', 0, 59],
  ['hour', 0, 23],
  ['day of month', 1, 31],
  ['month', 1, 12],
  ['day of week', 0, 7],
];

const MONTH_NAMES: Record<string, number> = {
  jan: 1,
  feb: 2,
  mar: 3,
  apr: 4,
  may: 5,
  jun: 6,
  jul: 7,
  aug: 8,
  sep: 9,
  oct: 10,
  nov: 11,
  dec: 12,
};
const DOW_NAMES: Record<string, number> = { sun: 0, mon: 1, tue: 2, wed: 3, thu: 4, fri: 5, sat: 6 };

function parseCron(expr: string): CronFields {
  const fields = expr.split(/\s+/);
  if (fields.length !== 5) {
    throw new Error(
      `Invalid cron expression "${expr}" — expected 5 fields (minute hour day-of-month month day-of-week)`,
    );
  }
  const sets = fields.map((field, i) => {
    const [label, min, max] = FIELD_RANGES[i];
    const names = i === 3 ? MONTH_NAMES : i === 4 ? DOW_NAMES : undefined;
    return parseField(field, label, min, max, names);
  });
  const dayOfWeek = sets[4];
  if (dayOfWeek.has(7)) {
    dayOfWeek.delete(7);
    dayOfWeek.add(0);
  }
  return {
    minute: sets[0],
    hour: sets[1],
    dayOfMonth: sets[2],
    month: sets[3],
    dayOfWeek,
    domRestricted: fields[2] !== '*',
    dowRestricted: fields[4] !== '*',
  };
}

function parseField(
  field: string,
  label: string,
  min: number,
  max: number,
  names?: Record<string, number>,
): Set<number> {
  const values = new Set<number>();
  for (const part of field.split(',')) {
    const [rangePart, stepPart, ...rest] = part.split('/');
    if (rest.length > 0 || stepPart === '') {
      throw new Error(`Invalid ${label} field "${field}"`);
    }
    const step = stepPart === undefined ? 1 : Number(stepPart);
    if (!Number.isInteger(step) || step < 1) {
      throw new Error(`Invalid step in ${label} field "${field}"`);
    }
    let lo: number;
    let hi: number;
    if (rangePart === '*') {
      lo = min;
      hi = max;
    } else if (rangePart.includes('-')) {
      const [a, b] = rangePart.split('-');
      lo = parseValue(a, label, names);
      hi = parseValue(b, label, names);
      if (lo > hi) throw new Error(`Invalid range in ${label} field "${field}"`);
    } else {
      lo = parseValue(rangePart, label, names);
      hi = stepPart === undefined ? lo : max;
    }
    if (lo < min || hi > max) {
      throw new Error(`Value out of range in ${label} field "${field}" (allowed ${min}-${max})`);
    }
    for (let v = lo; v <= hi; v += step) values.add(v);
  }
  if (values.size === 0) throw new Error(`Empty ${label} field "${field}"`);
  return values;
}

function parseValue(raw: string, label: string, names?: Record<string, number>): number {
  if (names) {
    const named = names[raw.toLowerCase()];
    if (named !== undefined) return named;
  }
  const value = Number(raw);
  if (!Number.isInteger(value)) {
    throw new Error(`Invalid value "${raw}" in ${label} field`);
  }
  return value;
}

/** Walks 14 months minute-by-minute and returns the smallest gap between fires. */
function minFireGapMinutes(cron: CronFields, threshold: number): number | null {
  const start = Date.UTC(2024, 0, 1);
  const totalMinutes = (366 + 60) * 24 * 60;
  let previous: number | null = null;
  let minGap = Number.POSITIVE_INFINITY;

  for (let m = 0; m < totalMinutes; m++) {
    const date = new Date(start + m * 60_000);
    if (!matches(cron, date)) continue;
    if (previous !== null) {
      const gap = m - previous;
      if (gap < minGap) minGap = gap;
      if (minGap < threshold) return minGap;
    }
    previous = m;
  }

  if (previous === null) return null;
  return minGap === Number.POSITIVE_INFINITY ? 366 * 24 * 60 : minGap;
}

function matches(cron: CronFields, date: Date): boolean {
  if (!cron.minute.has(date.getUTCMinutes())) return false;
  if (!cron.hour.has(date.getUTCHours())) return false;
  if (!cron.month.has(date.getUTCMonth() + 1)) return false;

  const domMatch = cron.dayOfMonth.has(date.getUTCDate());
  const dowMatch = cron.dayOfWeek.has(date.getUTCDay());
  if (cron.domRestricted && cron.dowRestricted) return domMatch || dowMatch;
  if (cron.domRestricted) return domMatch;
  if (cron.dowRestricted) return dowMatch;
  return true;
}
