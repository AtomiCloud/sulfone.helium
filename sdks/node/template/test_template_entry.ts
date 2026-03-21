import { LambdaTemplate } from './api/template/lambda.js';
import { StartTemplate } from './main.js';

const template = new LambdaTemplate(async (inquirer, determinism) => {
  const name = await inquirer.text('What is your name?', 'q1');
  const age = await inquirer.text('What is your age?', 'q2', '20');
  const food = await inquirer.checkbox('What is your food?', ['apple', 'orange', 'pear'], 'q3');

  const time = determinism.get('time', () => '7');

  return {
    processors: [],
    plugins: [],
  };
});

StartTemplate(template);
