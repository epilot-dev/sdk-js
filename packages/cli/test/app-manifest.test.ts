import { describe, it, expect } from 'vitest';
import { appOptionsSafeBeforeComponentSync, validateManifest, toManifest } from '../src/commands/app/manifest.js';

const base = {
  manifest_version: 1,
  name: 'Test',
  description: { de: 'Test' },
  components: [{ id: 'c1', component_type: 'CUSTOM_FLOW_ACTION', configuration: { type: 'function' } }],
};

describe('validateManifest: app-level options', () => {
  it('accepts top-level options', () => {
    const result = validateManifest({
      ...base,
      options: [
        { key: 'sender_name', type: 'text', label: 'Sender' },
        { key: 'api_key', type: 'secret' },
        { key: 'mailboxes', type: 'object', repeatable: true, fields: [{ key: 'address', type: 'text' }] },
      ],
    });
    expect(result.errors).toEqual([]);
    expect(result.manifest?.options).toHaveLength(3);
  });

  it('rejects duplicate keys and unknown types', () => {
    const result = validateManifest({
      ...base,
      options: [
        { key: 'a', type: 'text' },
        { key: 'a', type: 'color' },
      ],
    });
    expect(result.errors.map((e) => e.path)).toEqual(['/options/1/key', '/options/1/type']);
  });

  it('requires primitive fields for object options', () => {
    expect(validateManifest({ ...base, options: [{ key: 'o', type: 'object' }] }).errors[0].path).toBe(
      '/options/0/fields',
    );
    expect(
      validateManifest({ ...base, options: [{ key: 'o', type: 'object', fields: [{ key: 'n', type: 'object' }] }] })
        .errors[0].path,
    ).toBe('/options/0/fields/0/type');
    expect(
      validateManifest({ ...base, options: [{ key: 't', type: 'text', fields: [{ key: 'n', type: 'text' }] }] })
        .errors[0].path,
    ).toBe('/options/0/fields');
  });

  it('rejects secrets declared non-sensitive, also inside objects', () => {
    const result = validateManifest({
      ...base,
      options: [
        { key: 's', type: 'secret', sensitive: false },
        { key: 'o', type: 'object', sensitive: false, fields: [{ key: 'pw', type: 'secret' }] },
      ],
    });
    expect(result.errors.map((e) => e.path)).toEqual(['/options/0/sensitive', '/options/1/sensitive']);
  });

  it('rejects a key declared at app level and on a component', () => {
    const result = validateManifest({
      ...base,
      options: [{ key: 'sender_name', type: 'text' }],
      components: [{ ...base.components[0], options: [{ key: 'sender_name', type: 'text' }] }],
    });
    expect(result.errors.map((e) => e.path)).toEqual(['/components/0/options/0']);
  });

  it('leaves manifests without top-level options unchanged', () => {
    const result = validateManifest({
      ...base,
      components: [{ ...base.components[0], options: [{ key: 'sender_name', type: 'text' }] }],
    });
    expect(result.valid).toBe(true);
  });
});

describe('validateManifest: visible_if', () => {
  const validate = (options: unknown[]) => validateManifest({ ...base, options });

  it('accepts single values, lists, booleans and numbers', () => {
    const result = validate([
      { key: 'auth_mode', type: 'text' },
      { key: 'use_proxy', type: 'boolean' },
      { key: 'api_version', type: 'number' },
      { key: 'password', type: 'secret', visible_if: { auth_mode: 'basic' } },
      { key: 'token', type: 'secret', visible_if: { auth_mode: ['bearer', 'header'] } },
      { key: 'proxy_url', type: 'text', visible_if: { use_proxy: true } },
      { key: 'scope', type: 'text', visible_if: { api_version: 2, auth_mode: 'bearer' } },
    ]);
    expect(result.errors).toEqual([]);
    expect(result.manifest?.options?.[3].visible_if).toEqual({ auth_mode: 'basic' });
  });

  it('accepts a condition declared before its controlling option', () => {
    const result = validate([
      { key: 'password', type: 'secret', visible_if: { auth_mode: 'basic' } },
      { key: 'auth_mode', type: 'text' },
    ]);
    expect(result.errors).toEqual([]);
  });

  it.each([
    ['a string', 'auth_mode=basic'],
    ['a list', ['auth_mode']],
    ['null', null],
  ])('rejects visible_if given as %s', (_label, visible_if) => {
    const result = validate([
      { key: 'auth_mode', type: 'text' },
      { key: 'password', type: 'secret', visible_if },
    ]);
    expect(result.errors).toEqual([expect.objectContaining({ path: '/options/1/visible_if' })]);
  });

  it.each([
    ['an object', { equals: 'basic' }],
    ['null', null],
    ['an empty list', []],
    ['a list with an object', [{ v: 1 }]],
  ])('rejects %s as the expected value', (_label, expected) => {
    const result = validate([
      { key: 'auth_mode', type: 'text' },
      { key: 'password', type: 'secret', visible_if: { auth_mode: expected } },
    ]);
    expect(result.errors).toEqual([expect.objectContaining({ path: '/options/1/visible_if/auth_mode' })]);
  });

  it('rejects conditions on undeclared and component-level options', () => {
    const result = validateManifest({
      ...base,
      components: [{ ...base.components[0], options: [{ key: 'component_mode', type: 'text' }] }],
      options: [
        { key: 'a', type: 'text', visible_if: { missing: 'x' } },
        { key: 'b', type: 'text', visible_if: { component_mode: 'x' } },
      ],
    });
    expect(result.errors.map((e) => e.message)).toEqual([
      '"missing" is not an app-level option',
      '"component_mode" is not an app-level option',
    ]);
  });

  it('rejects an option that refers to itself', () => {
    const result = validate([{ key: 'mode', type: 'text', visible_if: { mode: 'x' } }]);
    expect(result.errors.map((e) => e.message)).toEqual(['Option "mode" must not refer to itself']);
  });

  it('rejects conditions on secret, sensitive and secret-carrying object options', () => {
    const result = validate([
      { key: 'api_key', type: 'secret' },
      { key: 'internal', type: 'text', sensitive: true },
      { key: 'endpoint', type: 'object', fields: [{ key: 'pw', type: 'secret' }] },
      { key: 'a', type: 'text', visible_if: { api_key: 'x' } },
      { key: 'b', type: 'text', visible_if: { internal: 'x' } },
      { key: 'c', type: 'text', visible_if: { endpoint: 'x' } },
    ]);
    expect(result.errors).toHaveLength(3);
    expect(result.errors.every((e) => /is sensitive/.test(e.message))).toBe(true);
  });

  it('rejects conditions on object and repeatable options', () => {
    const result = validate([
      { key: 'endpoint', type: 'object', fields: [{ key: 'url', type: 'text' }] },
      { key: 'tags', type: 'text', repeatable: true },
      { key: 'a', type: 'text', visible_if: { endpoint: 'x' } },
      { key: 'b', type: 'text', visible_if: { tags: 'x' } },
    ]);
    expect(result.errors).toHaveLength(2);
    expect(result.errors.every((e) => /non-repeatable text, number or boolean/.test(e.message))).toBe(true);
  });

  it('leaves options without visible_if unaffected', () => {
    const result = validate([
      { key: 'api_key', type: 'secret', required: true },
      { key: 'headline', type: 'text' },
    ]);
    expect(result.errors).toEqual([]);
  });
});

describe('toManifest: visible_if', () => {
  const config = { app_id: 'app-1', name: 'Test', description: { de: 'Test' } };

  it('keeps visible_if when exporting an app', () => {
    const manifest = toManifest(config, {
      version: '0.0.1',
      components: [],
      options: [
        { key: 'auth_mode', type: 'text', value: 'basic' },
        { key: 'password', type: 'secret', sensitive: true, configured: true, visible_if: { auth_mode: ['basic'] } },
      ],
    });
    expect(manifest.options).toEqual([
      { key: 'auth_mode', type: 'text' },
      { key: 'password', type: 'secret', sensitive: true, visible_if: { auth_mode: ['basic'] } },
    ]);
  });

  it('omits an empty visible_if', () => {
    const manifest = toManifest(config, {
      version: '0.0.1',
      components: [],
      options: [{ key: 'a', type: 'text', visible_if: {} }],
    });
    expect(manifest.options?.[0]).not.toHaveProperty('visible_if');
  });

  it('an exported manifest with visible_if validates again', () => {
    const manifest = toManifest(config, {
      version: '0.0.1',
      components: base.components,
      options: [
        { key: 'auth_mode', type: 'text' },
        { key: 'token', type: 'secret', sensitive: true, visible_if: { auth_mode: 'bearer' } },
      ],
    });
    expect(validateManifest(manifest).errors).toEqual([]);
  });
});

describe('validateManifest: option fields', () => {
  const errorsOf = (options: unknown[], extra: object = {}) => validateManifest({ ...base, options, ...extra }).errors;
  const messagesOf = (options: unknown[], extra: object = {}) => errorsOf(options, extra).map((e) => e.message);

  it('accepts a manifest using every new field', () => {
    const result = validateManifest({
      ...base,
      option_groups: [
        { key: 'server', label: { de: 'Server', en: 'Server' } },
        { key: 'auth', label: 'Authentifizierung', description: { de: 'Zugangsdaten' } },
      ],
      options: [
        {
          key: 'wms_host',
          type: 'text',
          required: true,
          label: { de: 'WMS-Server (Host)', en: 'WMS server (host)' },
          description: 'Nur der Hostname',
          placeholder: 'geo.example.de',
          format: 'hostname',
          group: 'server',
        },
        {
          key: 'auth_mode',
          type: 'text',
          default: 'none',
          choices: [{ value: 'none', label: { de: 'Keine' } }, { value: 'basic', label: 'Basic' }, { value: 'bearer' }],
          group: 'auth',
        },
        {
          key: 'password',
          type: 'secret',
          pattern: '\\S{8,}',
          pattern_message: { de: 'Mindestens 8 Zeichen' },
          visible_if: { auth_mode: 'basic' },
          group: 'auth',
        },
        { key: 'timeout', type: 'number', default: 25, min: 1, max: 25 },
        { key: 'verbose', type: 'boolean', default: false },
      ],
    });
    expect(result.errors).toEqual([]);
    expect(result.manifest?.option_groups).toHaveLength(2);
  });

  it.each([
    ['choices on a boolean', { type: 'boolean', choices: [{ value: 'x' }] }, '/options/0/choices'],
    ['an empty choices list', { type: 'text', choices: [] }, '/options/0/choices'],
    ['a number choice on a text option', { type: 'text', choices: [{ value: 1 }] }, '/options/0/choices/0/value'],
    ['a string choice on a number option', { type: 'number', choices: [{ value: '1' }] }, '/options/0/choices/0/value'],
    ['an empty choice value', { type: 'text', choices: [{ value: '' }] }, '/options/0/choices/0/value'],
    ['duplicate choices', { type: 'text', choices: [{ value: 'a' }, { value: 'a' }] }, '/options/0/choices/1/value'],
    ['a blank choice label', { type: 'text', choices: [{ value: 'a', label: ' ' }] }, '/options/0/choices/0/label'],
    ['format on a number', { type: 'number', format: 'url' }, '/options/0/format'],
    ['an unknown format', { type: 'text', format: 'iban' }, '/options/0/format'],
    ['pattern on a number', { type: 'number', pattern: 'x' }, '/options/0/pattern'],
    ['an invalid pattern', { type: 'text', pattern: '([a-z' }, '/options/0/pattern'],
    ['an over-long pattern', { type: 'text', pattern: 'a'.repeat(201) }, '/options/0/pattern'],
    ['pattern_message without pattern', { type: 'text', pattern_message: 'x' }, '/options/0/pattern_message'],
    ['min on a text option', { type: 'text', min: 1 }, '/options/0/min'],
    ['a non-numeric max', { type: 'number', max: '9' }, '/options/0/max'],
    ['min greater than max', { type: 'number', min: 9, max: 1 }, '/options/0/min'],
    ['placeholder on a boolean', { type: 'boolean', placeholder: 'x' }, '/options/0/placeholder'],
    ['a label given as a number', { type: 'text', label: 5 }, '/options/0/label'],
    ['a translated label without German', { type: 'text', label: { en: 'x' } }, '/options/0/label'],
    ['default of the wrong type', { type: 'text', default: 5 }, '/options/0/default'],
    ['an empty default', { type: 'text', default: '' }, '/options/0/default'],
    ['default on a secret', { type: 'secret', default: 'x' }, '/options/0/default'],
    ['default on a sensitive option', { type: 'text', sensitive: true, default: 'x' }, '/options/0/default'],
    ['default on a repeatable option', { type: 'text', repeatable: true, default: 'x' }, '/options/0/default'],
    ['default outside the choices', { type: 'text', default: 'z', choices: [{ value: 'a' }] }, '/options/0/default'],
    ['default below min', { type: 'number', default: 0, min: 1 }, '/options/0/default'],
    ['default above max', { type: 'number', default: 9, max: 5 }, '/options/0/default'],
  ])('rejects %s', (_label, option, path) => {
    expect(errorsOf([{ key: 'o', ...option }])).toEqual([expect.objectContaining({ path })]);
  });

  it('accepts defaults of false and zero', () => {
    expect(
      errorsOf([
        { key: 'flag', type: 'boolean', default: false },
        { key: 'retries', type: 'number', default: 0, min: 0 },
      ]),
    ).toEqual([]);
  });

  it('accepts choices on text and number options, also repeatable ones', () => {
    expect(
      errorsOf([
        { key: 'a', type: 'text', choices: [{ value: 'x' }, { value: 'y', label: { de: 'Y', en: 'Y' } }] },
        { key: 'b', type: 'number', choices: [{ value: 1 }, { value: 2 }] },
        { key: 'c', type: 'text', repeatable: true, choices: [{ value: 'email' }] },
      ]),
    ).toEqual([]);
  });

  describe('option groups', () => {
    it('rejects an option in an undeclared group', () => {
      expect(
        messagesOf([{ key: 'a', type: 'text', group: 'missing' }], { option_groups: [{ key: 'g', label: 'G' }] }),
      ).toEqual(['Group "missing" is not declared in option_groups']);
    });

    it('rejects a grouped option when no groups are declared', () => {
      expect(errorsOf([{ key: 'a', type: 'text', group: 'g' }])).toEqual([
        expect.objectContaining({ path: '/options/0/group' }),
      ]);
    });

    it.each([
      ['a group without a key', [{ label: 'G' }], '/option_groups/0/key'],
      ['a group without a label', [{ key: 'g' }], '/option_groups/0/label'],
      ['a group with a blank label', [{ key: 'g', label: ' ' }], '/option_groups/0/label'],
      ['a group label without German', [{ key: 'g', label: { en: 'G' } }], '/option_groups/0/label'],
      [
        'duplicate group keys',
        [
          { key: 'g', label: 'A' },
          { key: 'g', label: 'B' },
        ],
        '/option_groups/1/key',
      ],
      ['groups given as an object', { g: 'G' }, '/option_groups'],
    ])('rejects %s', (_label, option_groups, path) => {
      expect(errorsOf([], { option_groups })).toEqual([expect.objectContaining({ path })]);
    });

    it('accepts unused groups', () => {
      expect(errorsOf([{ key: 'a', type: 'text' }], { option_groups: [{ key: 'g', label: 'G' }] })).toEqual([]);
    });
  });
});

describe('toManifest: option fields', () => {
  const config = { app_id: 'app-1', name: 'Test', description: { de: 'Test' } };

  const declared = [
    {
      key: 'auth_mode',
      type: 'text',
      label: { de: 'Authentifizierung', en: 'Authentication' },
      description: 'Wie sich epilot anmeldet',
      placeholder: 'none',
      default: 'none',
      choices: [{ value: 'none', label: { de: 'Keine' } }, { value: 'basic' }],
      group: 'auth',
    },
    { key: 'host', type: 'text', format: 'hostname', pattern: '.*\\.de', pattern_message: { de: 'Nur .de' } },
    { key: 'timeout', type: 'number', default: 0, min: 0, max: 60 },
    { key: 'verbose', type: 'boolean', default: false },
  ];
  const groups = [{ key: 'auth', label: { de: 'Authentifizierung', en: 'Authentication' }, description: 'Zugang' }];

  it('exports every new field and the groups unchanged', () => {
    const manifest = toManifest(config, { version: '0.0.1', components: [], options: declared, option_groups: groups });
    expect(manifest.options).toEqual(declared);
    expect(manifest.option_groups).toEqual(groups);
  });

  it('keeps defaults of false and zero, and a zero bound', () => {
    const manifest = toManifest(config, { version: '0.0.1', components: [], options: declared });
    expect(manifest.options?.[2]).toEqual({ key: 'timeout', type: 'number', default: 0, min: 0, max: 60 });
    expect(manifest.options?.[3]).toEqual({ key: 'verbose', type: 'boolean', default: false });
  });

  it('drops configured values while keeping the default', () => {
    const manifest = toManifest(config, {
      version: '0.0.1',
      components: [],
      options: [{ key: 'auth_mode', type: 'text', default: 'none', value: 'basic' }],
    });
    expect(manifest.options).toEqual([{ key: 'auth_mode', type: 'text', default: 'none' }]);
  });

  it('omits option_groups when the version has none', () => {
    const manifest = toManifest(config, { version: '0.0.1', components: [], options: declared.slice(1) });
    expect(manifest).not.toHaveProperty('option_groups');
  });

  it('an exported manifest validates again', () => {
    const manifest = toManifest(config, {
      version: '0.0.1',
      components: base.components,
      options: declared,
      option_groups: groups,
    });
    expect(validateManifest(manifest).errors).toEqual([]);
  });
});

describe('toManifest: app-level options', () => {
  it('exports declarations without values and skips lifted component options', () => {
    const manifest = toManifest(
      { app_id: 'app', name: 'Test', description: { de: 'Test' } },
      {
        options: [
          { key: 'sender_name', type: 'text', label: 'Sender', value: 'ACME' },
          { key: 'api_key', type: 'secret', sensitive: true, configured: true, value_updated_at: '2026-10-01' },
        ],
        components: [
          {
            id: 'c1',
            component_type: 'CUSTOM_FLOW_ACTION',
            configuration: {},
            uses_options: ['sender_name'],
            options: [
              { key: 'sender_name', type: 'text', lifted: true, value: 'ACME' },
              { key: 'legacy', type: 'object', repeatable: true, fields: [{ key: 'n', type: 'text' }] },
            ],
          },
        ],
      },
    );

    expect(manifest.options).toEqual([
      { key: 'sender_name', type: 'text', label: 'Sender' },
      { key: 'api_key', type: 'secret', sensitive: true },
    ]);
    expect(manifest.components[0].options).toEqual([
      { key: 'legacy', type: 'object', repeatable: true, fields: [{ key: 'n', type: 'text' }] },
    ]);
    expect(manifest.components[0].uses_options).toEqual(['sender_name']);
  });
});

describe('appOptionsSafeBeforeComponentSync', () => {
  const options = [
    { key: 'username', type: 'text' as const },
    { key: 'password', type: 'secret' as const },
    { key: 'base_url', type: 'text' as const },
  ];

  it('returns every option for a new app without remote components', () => {
    expect(appOptionsSafeBeforeComponentSync(options, [])).toEqual(options);
  });

  it('holds back keys a remote component still declares', () => {
    const remote = [{ options: [{ key: 'username' }, { key: 'password' }] }, { options: null }, {}];
    expect(appOptionsSafeBeforeComponentSync(options, remote).map((o) => o.key)).toEqual(['base_url']);
  });
});
