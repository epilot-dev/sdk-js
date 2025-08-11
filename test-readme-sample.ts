#!/usr/bin/env node

// Test the README.md sample code with TypeScript
import { authorizeWithToken } from 'epilot-sdk/auth';
import entityClient from 'epilot-sdk/entity-client';

console.log('✓ Successfully imported authorizeWithToken');
console.log('✓ Successfully imported entityClient');

// Test authorization (should not throw)
authorizeWithToken(entityClient, 'mock_access_token');
console.log('✓ Authorization completed without errors');

console.log('🎉 README sample code works correctly!');
