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
