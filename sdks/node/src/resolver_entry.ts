import { LambdaResolver } from './api/resolver/lambda.js';
import { StartResolver } from './main.js';

const resolver = new LambdaResolver(async input => {
  console.log('Resolver invoked', {
    fileCount: input.files.length,
    hasConfig: input.config != null,
  });

  const firstFile = input.files[0];
  if (!firstFile) {
    return { path: '', content: '' };
  }

  return { path: firstFile.path, content: firstFile.content };
});

StartResolver(resolver);
