import { describe, it, expect } from 'vitest';
import { hoistFlagsAfterSubcommand } from '../src/lib/reorder-args.js';

describe('hoistFlagsAfterSubcommand', () => {
  describe('no reordering needed', () => {
    it('returns empty array unchanged', () => {
      expect(hoistFlagsAfterSubcommand([])).toEqual([]);
    });

    it('returns flag-only argv unchanged', () => {
      expect(hoistFlagsAfterSubcommand(['--help'])).toEqual(['--help']);
      expect(hoistFlagsAfterSubcommand(['--version'])).toEqual(['--version']);
      expect(hoistFlagsAfterSubcommand(['--use-dev', '--json'])).toEqual(['--use-dev', '--json']);
    });

    it('leaves flags placed after the subcommand alone', () => {
      expect(hoistFlagsAfterSubcommand(['entity', 'listTaxonomies', '--use-dev', '--json'])).toEqual([
        'entity',
        'listTaxonomies',
        '--use-dev',
        '--json',
      ]);
    });

    it('leaves flags between subcommand and operation alone', () => {
      expect(hoistFlagsAfterSubcommand(['entity', '--use-dev', 'listTaxonomies'])).toEqual([
        'entity',
        '--use-dev',
        'listTaxonomies',
      ]);
    });

    it('does not reorder when subcommand is first', () => {
      expect(hoistFlagsAfterSubcommand(['auth', 'login'])).toEqual(['auth', 'login']);
    });
  });

  describe('hoisting leading boolean flags', () => {
    it('moves a single leading boolean flag to after the subcommand', () => {
      expect(hoistFlagsAfterSubcommand(['--use-dev', 'entity', 'listTaxonomies'])).toEqual([
        'entity',
        'listTaxonomies',
        '--use-dev',
      ]);
    });

    it('moves multiple leading boolean flags preserving relative order', () => {
      expect(hoistFlagsAfterSubcommand(['--use-dev', '--json', 'entity', 'listTaxonomies'])).toEqual([
        'entity',
        'listTaxonomies',
        '--use-dev',
        '--json',
      ]);
    });

    it('handles --verbose short alias -v', () => {
      expect(hoistFlagsAfterSubcommand(['-v', 'entity', 'listSchemas'])).toEqual(['entity', 'listSchemas', '-v']);
    });

    it('handles --no-interactive negation flag', () => {
      expect(hoistFlagsAfterSubcommand(['--no-interactive', 'entity', 'listSchemas'])).toEqual([
        'entity',
        'listSchemas',
        '--no-interactive',
      ]);
    });
  });

  describe('hoisting leading value-taking flags', () => {
    it('moves --server <url> together as a pair', () => {
      expect(hoistFlagsAfterSubcommand(['--server', 'http://localhost:9999', 'entity', 'listSchemas'])).toEqual([
        'entity',
        'listSchemas',
        '--server',
        'http://localhost:9999',
      ]);
    });

    it('moves --token <token> together as a pair', () => {
      expect(hoistFlagsAfterSubcommand(['--token', 'abc123', 'user', 'getMeV2'])).toEqual([
        'user',
        'getMeV2',
        '--token',
        'abc123',
      ]);
    });

    it('moves -t <token> short alias together', () => {
      expect(hoistFlagsAfterSubcommand(['-t', 'abc123', 'entity', 'listSchemas'])).toEqual([
        'entity',
        'listSchemas',
        '-t',
        'abc123',
      ]);
    });

    it('moves --profile <name> together', () => {
      expect(hoistFlagsAfterSubcommand(['--profile', 'dev', 'entity', 'listSchemas'])).toEqual([
        'entity',
        'listSchemas',
        '--profile',
        'dev',
      ]);
    });

    it('handles --server=<url> form without consuming next token', () => {
      expect(hoistFlagsAfterSubcommand(['--server=http://localhost:9999', 'entity', 'listSchemas'])).toEqual([
        'entity',
        'listSchemas',
        '--server=http://localhost:9999',
      ]);
    });

    it('does not mistake a value-flag value for the subcommand', () => {
      // --token value 'entity' must be treated as the token's value, not the subcommand
      expect(hoistFlagsAfterSubcommand(['--token', 'entity', 'user', 'getMeV2'])).toEqual([
        'user',
        'getMeV2',
        '--token',
        'entity',
      ]);
    });
  });

  describe('mixed leading flags', () => {
    it('moves a combination of boolean and value-taking flags', () => {
      expect(
        hoistFlagsAfterSubcommand([
          '--use-dev',
          '--server',
          'http://localhost:9999',
          '--json',
          'entity',
          'listSchemas',
        ]),
      ).toEqual(['entity', 'listSchemas', '--use-dev', '--server', 'http://localhost:9999', '--json']);
    });

    it('preserves all positional args after the subcommand', () => {
      expect(hoistFlagsAfterSubcommand(['--use-dev', 'entity', 'getEntity', 'contact', 'abc123'])).toEqual([
        'entity',
        'getEntity',
        'contact',
        'abc123',
        '--use-dev',
      ]);
    });

    it('preserves flags that appear after the subcommand alongside hoisted ones', () => {
      expect(hoistFlagsAfterSubcommand(['--use-dev', 'entity', 'searchEntities', '-d', '{"q":"*"}'])).toEqual([
        'entity',
        'searchEntities',
        '-d',
        '{"q":"*"}',
        '--use-dev',
      ]);
    });
  });

  describe('immutability', () => {
    it('does not mutate the input array', () => {
      const input = ['--use-dev', 'entity', 'listTaxonomies'];
      const snapshot = [...input];
      hoistFlagsAfterSubcommand(input);
      expect(input).toEqual(snapshot);
    });
  });
});
