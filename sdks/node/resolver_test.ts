import { StartResolverWithLambda, type ResolverInput, type ResolverOutput } from './src/main.js';

StartResolverWithLambda(async (i: ResolverInput): Promise<ResolverOutput> => {
  console.log('Config:', i.config);
  console.log('Files:', i.files.length);

  // Simple merge: just return the first file's content as-is (placeholder implementation)
  const firstFile = i.files[0];
  if (!firstFile) {
    return { path: '', content: '' };
  }

  return { path: firstFile.path, content: firstFile.content };
});
