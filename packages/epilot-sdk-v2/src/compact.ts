/**
 * Compact OpenAPI definition format for reduced bundle size.
 *
 * Encodes only the fields openapi-client-axios reads at runtime:
 * paths, operationId, parameters (name, in, required, style, explode),
 * requestBody presence, servers, and $ref component parameters.
 */

/* Compact tuple types (stripped at compile time) */
type CP = [name: string, loc: 'p' | 'q' | 'h' | 'c', ...rest: (boolean | string)[]];
type CR = [ref: string];

export type CompactDefinition = {
  s: string;
  v?: string;
  o: [id: string, m: string, p: string, ps?: (CP | CR)[], b?: 0 | 1][];
  cp?: Record<string, CP>;
  pp?: Record<string, (CP | CR)[]>;
};

const L: Record<string, string> = { p: 'path', q: 'query', h: 'header', c: 'cookie' };

const ep = (p: CP) => {
  const r: Record<string, unknown> = { name: p[0], in: L[p[1]] };
  let i = 2;
  if (typeof p[i] === 'boolean') {
    if (p[i]) r.required = true;
    i++;
  }
  if (typeof p[i] === 'string') {
    r.style = p[i];
    i++;
  }
  if (typeof p[i] === 'boolean') {
    r.explode = p[i];
    i++;
  }
  return r;
};

const mp = (ps: (CP | CR)[]) =>
  ps.map((p) => (p.length === 1 ? { $ref: `#/components/parameters/${p[0]}` } : ep(p as CP)));

export const expand = (c: CompactDefinition): Record<string, unknown> => {
  const paths: Record<string, Record<string, unknown>> = {};

  for (const [id, m, p, ps, b] of c.o) {
    const op: Record<string, unknown> = { operationId: id, responses: {} };
    if (ps?.length) op.parameters = mp(ps);
    if (b) op.requestBody = { content: { 'application/json': {} } };
    if (!paths[p]) paths[p] = {};
    paths[p][m] = op;
  }

  if (c.pp)
    for (const [p, ps] of Object.entries(c.pp)) {
      if (!paths[p]) paths[p] = {};
      paths[p].parameters = mp(ps);
    }

  const doc: Record<string, unknown> = {
    openapi: c.v || '3.0.2',
    info: { title: '', version: '' },
    paths,
    servers: c.s ? [{ url: c.s }] : [],
  };

  if (c.cp) {
    const params: Record<string, unknown> = {};
    for (const [k, v] of Object.entries(c.cp)) params[k] = ep(v);
    doc.components = { parameters: params };
  }

  return doc;
};
