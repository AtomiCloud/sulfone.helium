import { LambdaPlugin } from './api/plugin/lambda.js';
import { StartPlugin } from './main.js';

const plugin = new LambdaPlugin(async input => {
  console.log('Directory:', input.directory);
  console.log('Config:', JSON.stringify(input.config));

  return { directory: input.directory };
});

StartPlugin(plugin);
