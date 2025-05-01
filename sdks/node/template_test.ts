import { QuestionType, StartTemplateWithLambda } from './src/main.js';

StartTemplateWithLambda(async i => {
  const name = await i.text('Can i get your name?', 'q1');
  const age = await i.text({
    id: 'q2',
    message: 'Can I get your age?',
    type: QuestionType.Text,
    validate: x => {
      try {
        const num = Number(x);
        if (isNaN(num)) return 'not a number';
        return null;
      } catch (e) {
        return 'not a number';
      }
    },
  });
  const food = await i.checkbox('What is your favorite food?', ['pizza', 'burger', 'fries'], 'q3');
  return {
    plugins: [],
    processors: [
      {
        name: 'test',
        files: [],
        config: {
          name,
          age,
          food,
        },
      },
    ],
  };
});
