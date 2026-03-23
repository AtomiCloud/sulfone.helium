import { LambdaProcessor } from './api/processor/lambda.js';
import { StartProcessor } from './main.js';

const processor = new LambdaProcessor(async (input, fileHelper) => {
  console.log('ReadDir:', input.readDir);
  console.log('WriteDir:', input.writeDir);
  console.log('Config:', JSON.stringify(input.config));

  const files = fileHelper.resolveAll();
  for (const file of files) {
    file.writeFile();
  }

  return { directory: fileHelper.writeDir };
});

StartProcessor(processor);
