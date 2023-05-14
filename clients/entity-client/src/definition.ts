import type { Document } from 'openapi-client-axios';

import definition from './openapi-runtime.json';

export default (definition as unknown) as Document;
