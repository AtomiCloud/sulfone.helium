import { LambdaResolver } from './api/resolver/lambda.js';
import { StartResolver } from './main.js';

const resolver = new LambdaResolver(async input => {
  console.log('Config:', input.config);
  console.log('Files:', input.files.length);

  const firstFile = input.files[0];
  if (!firstFile) {
    return { path: '', content: '' };
  }

  return { path: firstFile.path, content: firstFile.content };
});

StartResolver(resolver);
