import { check, group } from 'k6';
import { describe, expect } from 'https://jslib.k6.io/k6chaijs/4.5.0.1/index.js';
import http from 'k6/http';

export const options = {
  vus: 1,
  iterations: 1,
  thresholds: {
    checks: ['rate==1.0'],
  },
};

const PORT = __ENV.PORT ?? 5553;

const BASE_URL = `http://localhost:${PORT}`;
const RESOLVE_ENDPOINT = `${BASE_URL}/api/resolve`;
const HEADERS = { headers: { 'Content-Type': 'application/json' } };

const testCases = [
  // Test case 1: Simple resolve with single file
  [
    'Simple resolve - single file',
    RESOLVE_ENDPOINT,
    {
      config: { strategy: 'deep-merge', array_strategy: 'append' },
      files: [
        {
          path: 'package.json',
          content: '{ "name": "project", "dependencies": {} }',
          origin: { template: 'atomi/frontend-template:5', layer: 4 },
        },
      ],
    },
    200,
    {
      path: 'package.json',
      content: '{ "name": "project", "dependencies": {} }',
    },
  ],

  // Test case 2: Resolve with multiple files
  [
    'Resolve - multiple files',
    RESOLVE_ENDPOINT,
    {
      config: { strategy: 'deep-merge', array_strategy: 'append' },
      files: [
        {
          path: 'package.json',
          content: '{ "name": "project", "dependencies": {} }',
          origin: { template: 'atomi/frontend-template:5', layer: 4 },
        },
        {
          path: 'package.json',
          content: '{ "name": "project", "devDependencies": {} }',
          origin: { template: 'atomi/backend-template:3', layer: 3 },
        },
      ],
    },
    200,
    {
      path: 'package.json',
      content: '{ "name": "project", "dependencies": {} }',
    },
  ],

  // Test case 3: Resolve with empty files array
  [
    'Resolve - empty files',
    RESOLVE_ENDPOINT,
    {
      config: { strategy: 'deep-merge' },
      files: [],
    },
    200,
    {
      path: '',
      content: '',
    },
  ],

  // Test case 4: Resolve with complex config
  [
    'Resolve - complex config',
    RESOLVE_ENDPOINT,
    {
      config: {
        strategy: 'deep-merge',
        array_strategy: 'append',
        customRules: {
          excludePatterns: ['*.test.js'],
          includeHidden: false,
        },
      },
      files: [
        {
          path: 'tsconfig.json',
          content: '{ "compilerOptions": { "target": "ES2020" } }',
          origin: { template: 'atomi/typescript-template:2', layer: 5 },
        },
      ],
    },
    200,
    {
      path: 'tsconfig.json',
      content: '{ "compilerOptions": { "target": "ES2020" } }',
    },
  ],

  // Test case 5: Resolve with YAML file
  [
    'Resolve - YAML file',
    RESOLVE_ENDPOINT,
    {
      config: { strategy: 'yaml-merge' },
      files: [
        {
          path: 'docker-compose.yaml',
          content: 'version: "3"\nservices:\n  web:\n    image: nginx',
          origin: { template: 'atomi/docker-template:1', layer: 2 },
        },
      ],
    },
    200,
    {
      path: 'docker-compose.yaml',
      content: 'version: "3"\nservices:\n  web:\n    image: nginx',
    },
  ],
];

export default function () {
  // Health check test
  group('Health Check', () => {
    const resp = http.get(BASE_URL);
    check(resp, {
      'Health check status 200': r => r.status === 200,
      'Health check response': r => {
        const body = r.json();
        return body.Status === 'OK' && body.Message === 'OK';
      },
    });
  });

  // Test cases
  for (const [name, url, input, status, expected] of testCases) {
    group(name, () => {
      const resp = http.post(url, JSON.stringify(input), HEADERS);
      check(resp, {
        [`${name} status 200`]: r => r.status === status,
        [`${name} response structure`]: r => {
          const body = r.json();
          // Check that path and content are present
          return typeof body.path === 'string' && typeof body.content === 'string';
        },
      });
    });
  }
}
