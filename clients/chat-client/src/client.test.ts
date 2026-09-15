import { describe, expect, it } from 'vitest';
import { createClient, getClient } from './client';
import definition from './openapi.json';
import type { Components } from './openapi';

describe('Chat client', () => {
  it('exposes management and public operations with their separate auth contracts', () => {
    const client = createClient();
    expect(client.defaults.baseURL).toBe('https://chat.sls.epilot.io');
    expect(client.api.getOperations().map((operation) => operation.operationId)).toEqual(
      expect.arrayContaining([
        'listChatWidgets',
        'createChatWidget',
        'getChatWidget',
        'updateChatWidget',
        'deleteChatWidget',
        'getPublicChatWidget',
        'createPublicChatGrant',
        'createAnonymousChatSession',
        'sendAnonymousChatMessage',
      ]),
    );
    expect(definition.paths['/v1/widgets'].get.security).toEqual([{ EpilotAuth: [] }]);
    expect(definition.paths['/v1/bootstrap'].post.security).toEqual([]);
    expect(definition.paths['/v1/sessions'].post.security).toEqual([]);
    expect(definition.paths['/v1/widgets/{widget_id}/configuration'].get.security).toEqual([]);
    expect(definition.paths['/v1/messages'].post.security).toEqual([{ AnonymousSession: [] }]);
    expect(definition.components.responses.Error.content['application/json'].schema.properties.code.enum).toContain(
      'SESSION_EXPIRED',
    );
    expect(definition.components.schemas.Error.properties).not.toHaveProperty('code');
  });

  it('encodes a widget update and preserves design and email verification settings', async () => {
    const client = createClient();
    const payload: Components.Schemas.UpdateChatWidgetRequest = {
      version: 1,
      website_chat: {
        allowed_origins: ['https://example.com'],
        organisation_name: 'Example Energy',
        default_locale: 'en',
        design_id: '550e8400-e29b-41d4-a716-446655440000',
        authentication: { email_code: { email_template_id: '660e8400-e29b-41d4-a716-446655440000' } },
      },
    };
    client.defaults.adapter = async (config) => {
      expect(config.method).toBe('put');
      expect(config.url).toBe('/v1/widgets/widget-1');
      expect(JSON.parse(config.data)).toEqual(payload);
      return { config, data: { widget_id: 'widget-1', ...payload }, status: 200, statusText: 'OK', headers: {} };
    };
    const response = await client.updateChatWidget({ widget_id: 'widget-1' }, payload);
    expect(response.data.website_chat.design_id).toBe(payload.website_chat?.design_id);
  });

  it('can isolate an anonymous session from the authenticated management singleton', () => {
    const management = getClient();
    const anonymous = createClient();
    management.defaults.headers.common.Authorization = 'Bearer management-token';
    expect(anonymous.defaults.headers.common.Authorization).toBeUndefined();
    expect(getClient()).toBe(management);
    delete management.defaults.headers.common.Authorization;
  });
});
