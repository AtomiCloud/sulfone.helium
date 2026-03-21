import { LambdaPlugin } from './api/plugin/lambda.js';
import { StartPlugin } from './main.js';

const plugin = new LambdaPlugin(async input => {
  console.log('Plugin invoked', {
    directory: input.directory,
    hasConfig: input.config != null,
  });

  return { directory: input.directory };
});

StartPlugin(plugin);
