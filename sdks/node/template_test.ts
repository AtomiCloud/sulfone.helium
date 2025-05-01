import { QuestionType, StartTemplateWithLambda, GlobType } from './src/main.js';

StartTemplateWithLambda(async (i, d) => {
  const name = await i.text('What is your name?', 'q1');

  const age = await i.text({
    id: 'q2',
    message: 'What is your age?',
    type: QuestionType.Text,
    desc: 'The age of the person',
    default: '20',
    initial: '18',
    validate: x => {
      try {
        const num = Number(x);
        if (isNaN(num)) return 'Needs to be a number';
        return null;
      } catch (e) {
        return 'Needs to be a number';
      }
    },
  });

  const food = await i.checkbox('What is your food?', ['apple', 'orange', 'pear', 'honeydew'], 'q3');

  const color = await i.checkbox({
    id: 'q4',
    message: 'What is your color?',
    options: ['red', 'blue', 'green', 'yellow'],
    desc: 'The color of the person',
    type: QuestionType.Checkbox,
    validate: x => (x.length > 0 ? null : 'You must select at least one color'),
  });

  const beefOk = await i.confirm('Is beef ok?', 'q5');

  const porkOk = await i.confirm({
    id: 'q6',
    message: 'Is pork ok?',
    desc: 'Whether the person likes pork',
    type: QuestionType.Confirm,
    default: true,
    errorMessage: 'You must tell me if you like pork',
  });

  const birthday = await i.dateSelect('What is your birthday', 'q7', 'State your birthday');

  const mumBirthday = await i.dateSelect({
    id: 'q8',
    message: "What is your mum's birthday?",
    desc: 'The birthday of your mum',
    type: QuestionType.DateSelect,
    default: new Date('1980-01-01'),
    maxDate: new Date('2025-12-31'),
    minDate: new Date('1900-01-01'),
  });

  const password = await i.password('What is your password?', 'q9');

  const pin = await i.password({
    id: 'q10',
    message: 'What is your pin?',
    desc: 'The pin of the person',
    confirmation: true,
    type: QuestionType.Password,
    validate: x => (/[A-Z]/.test(x) ? null : 'You must have a capital letter'),
  });

  const car = await i.select(
    'What is your favourite car?',
    [
      'BMW',
      'Mercedes',
      'Audi',
      'Volkswagen',
      'Toyota',
      'Honda',
      'Ford',
      'Chevrolet',
      'Nissan',
      'Hyundai',
      'Kia',
      'Volvo',
      'Jeep',
      'Land Rover',
      'Lexus',
      'Mazda',
      'Mercury',
      'Mitsubishi',
      'Pontiac',
      'Saab',
      'Skoda',
      'Suzuki',
      'Toyota',
      'Volkswagen',
      'Volvo',
    ],
    'q11',
    'State your favourite car',
  );

  const plane = await i.select({
    id: 'q12',
    message: 'What is your favourite plane?',
    desc: 'The plane of the person',
    type: QuestionType.Select,
    options: [
      'Boeing',
      'Airbus',
      'Bombardier',
      'Embraer',
      'Cessna',
      'Piper',
      'Hawker',
      'Dassault',
      'Lockheed',
      'Beechcraft',
      'Gulfstream',
      'Cessna',
      'Piper',
      'Hawker',
      'Dassault',
      'Lockheed',
      'Beechcraft',
      'Gulfstream',
    ],
    validate: x => (x === 'Airbus' ? 'You must not select Airbus' : null),
  });

  const t = d.get('time', () => '7');

  return {
    plugins: [],
    processors: [
      {
        name: 'hello',
        files: [
          {
            glob: '**/*.*',
            exclude: [],
            type: GlobType.Template,
          },
        ],
        config: {
          Name: name,
          Age: age,
          Food: food,
          Color: color,
          Beef: beefOk,
          Pork: porkOk,
          Birthday: birthday,
          MumBirthday: mumBirthday,
          Password: password,
          Pin: pin,
          Car: car,
          Plane: plane,
          Time: t,
        },
      },
    ],
  };
});
