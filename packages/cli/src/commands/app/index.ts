import { defineCommand } from 'citty';

export default defineCommand({
  meta: {
    name: 'app',
    description: 'Manage epilot Apps — create, deploy, and manage app manifests',
  },
  subCommands: {
    init: () => import('./init.js').then((m) => m.default),
    'add-component': () => import('./add-component.js').then((m) => m.default),
    'remove-component': () => import('./remove-component.js').then((m) => m.default),
    'add-proxy': () => import('./add-proxy.js').then((m) => m.default),
    'remove-proxy': () => import('./remove-proxy.js').then((m) => m.default),
    validate: () => import('./validate.js').then((m) => m.default),
    deploy: () => import('./deploy.js').then((m) => m.default),
    export: () => import('./export.js').then((m) => m.default),
    versions: () => import('./versions.js').then((m) => m.default),
    review: () => import('./review.js').then((m) => m.default),
    api: () => import('./api.js').then((m) => m.default),
  },
});
