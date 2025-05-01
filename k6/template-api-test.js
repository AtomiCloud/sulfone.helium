import { check, group } from 'k6';
import { describe, expect } from 'https://jslib.k6.io/k6chaijs/4.5.0.1/index.js';
import http from 'k6/http';

export let options = {
  vus: 1,
  iterations: 1,
  thresholds: {
    checks: ['rate==1.0'],
  },
};

const BASE_URL = 'http://localhost:5550';
const TEMPLATE_INIT = `${BASE_URL}/api/template/init`;
const TEMPLATE_VALIDATE = `${BASE_URL}/api/template/validate`;
const HEADERS = { headers: { 'Content-Type': 'application/json' } };

const testCases = [
  // Q1: Text - Name
  [
    'Q1',
    TEMPLATE_INIT,
    {
      answers: {},
      deterministicStates: {},
    },
    200,
    {
      type: 'questionnaire',
      deterministicState: {},
      question: {
        type: 'text',
        message: 'What is your name?',
        id: 'q1',
        default: null,
        desc: null,
        initial: null,
      },
    },
  ],
  [
    'Q1 validate',
    TEMPLATE_VALIDATE,
    {
      answers: {},
      deterministicStates: {},
      validate: 'John Doe',
    },
    200,
    {
      valid: null,
    },
  ],

  // Q2: Text - Age (Complex)
  [
    'Q2',
    TEMPLATE_INIT,
    {
      answers: { q1: { type: 'string', answer: 'John Doe' } },
      deterministicStates: {},
    },
    200,
    {
      type: 'questionnaire',
      deterministicState: {},
      question: {
        type: 'text',
        message: 'What is your age?',
        id: 'q2',
        default: '20',
        desc: 'The age of the person',
        initial: '18',
      },
    },
  ],
  [
    'Q2 validate - pass',
    TEMPLATE_VALIDATE,
    {
      answers: { q1: { type: 'string', answer: 'John Doe' } },
      deterministicStates: {},
      validate: '25',
    },
    200,
    {
      valid: null,
    },
  ],
  [
    'Q2 validate - fail',
    TEMPLATE_VALIDATE,
    {
      answers: { q1: { type: 'string', answer: 'John Doe' } },
      deterministicStates: {},
      validate: 'not-a-number',
    },
    200,
    {
      valid: 'Needs to be a number',
    },
  ],

  // Q3: Checkbox - Food
  [
    'Q3',
    TEMPLATE_INIT,
    {
      answers: {
        q1: { type: 'string', answer: 'John Doe' },
        q2: { type: 'string', answer: '25' },
      },
      deterministicStates: {},
    },
    200,
    {
      type: 'questionnaire',
      deterministicState: {},
      question: {
        type: 'checkbox',
        message: 'What is your food?',
        id: 'q3',
        desc: null,
        options: ['apple', 'orange', 'pear', 'honeydew'],
      },
    },
  ],

  // Q4: Checkbox - Color (Complex)
  [
    'Q4',
    TEMPLATE_INIT,
    {
      answers: {
        q1: { type: 'string', answer: 'John Doe' },
        q2: { type: 'string', answer: '25' },
        q3: { type: 'str_array', answer: ['apple', 'orange'] },
      },
      deterministicStates: {},
    },
    200,
    {
      type: 'questionnaire',
      deterministicState: {},
      question: {
        type: 'checkbox',
        message: 'What is your color?',
        id: 'q4',
        desc: 'The color of the person',
        options: ['red', 'blue', 'green', 'yellow'],
      },
    },
  ],

  // Q5: Confirm - Beef
  [
    'Q5',
    TEMPLATE_INIT,
    {
      answers: {
        q1: { type: 'string', answer: 'John Doe' },
        q2: { type: 'string', answer: '25' },
        q3: { type: 'str_array', answer: ['apple', 'orange'] },
        q4: { type: 'str_array', answer: ['red', 'blue'] },
      },
      deterministicStates: {},
    },
    200,
    {
      type: 'questionnaire',
      deterministicState: {},
      question: {
        type: 'confirm',
        message: 'Is beef ok?',
        id: 'q5',
        desc: null,
        default: null,
        errorMessage: null,
      },
    },
  ],

  // Q6: Confirm - Pork (Complex)
  [
    'Q6',
    TEMPLATE_INIT,
    {
      answers: {
        q1: { type: 'string', answer: 'John Doe' },
        q2: { type: 'string', answer: '25' },
        q3: { type: 'str_array', answer: ['apple', 'orange'] },
        q4: { type: 'str_array', answer: ['red', 'blue'] },
        q5: { type: 'boolean', answer: true },
      },
      deterministicStates: {},
    },
    200,
    {
      type: 'questionnaire',
      deterministicState: {},
      question: {
        type: 'confirm',
        message: 'Is pork ok?',
        id: 'q6',
        desc: 'Whether the person likes pork',
        default: true,
        errorMessage: 'You must tell me if you like pork',
      },
    },
  ],

  // Q7: DateSelect - Birthday
  [
    'Q7',
    TEMPLATE_INIT,
    {
      answers: {
        q1: { type: 'string', answer: 'John Doe' },
        q2: { type: 'string', answer: '25' },
        q3: { type: 'str_array', answer: ['apple', 'orange'] },
        q4: { type: 'str_array', answer: ['red', 'blue'] },
        q5: { type: 'boolean', answer: true },
        q6: { type: 'boolean', answer: false },
      },
      deterministicStates: {},
    },
    200,
    {
      type: 'questionnaire',
      deterministicState: {},
      question: {
        type: 'date',
        message: 'What is your birthday',
        id: 'q7',
        default: null,
        desc: 'State your birthday',
        minDate: null,
        maxDate: null,
      },
    },
  ],
  [
    'Q7 validate',
    TEMPLATE_VALIDATE,
    {
      answers: {
        q1: { type: 'string', answer: 'John Doe' },
        q2: { type: 'string', answer: '25' },
        q3: { type: 'str_array', answer: ['apple', 'orange'] },
        q4: { type: 'str_array', answer: ['red', 'blue'] },
        q5: { type: 'boolean', answer: true },
        q6: { type: 'boolean', answer: false },
      },
      deterministicStates: {},
      validate: '1990-01-15',
    },
    200,
    {
      valid: null,
    },
  ],

  // Q8: DateSelect - Mum's Birthday (Complex)
  [
    'Q8',
    TEMPLATE_INIT,
    {
      answers: {
        q1: { type: 'string', answer: 'John Doe' },
        q2: { type: 'string', answer: '25' },
        q3: { type: 'str_array', answer: ['apple', 'orange'] },
        q4: { type: 'str_array', answer: ['red', 'blue'] },
        q5: { type: 'boolean', answer: true },
        q6: { type: 'boolean', answer: false },
        q7: { type: 'string', answer: '1990-01-15' },
      },
      deterministicStates: {},
    },
    200,
    {
      type: 'questionnaire',
      deterministicState: {},
      question: {
        type: 'date',
        message: "What is your mum's birthday?",
        id: 'q8',
        default: '1980-01-01',
        desc: 'The birthday of your mum',
        minDate: '1900-01-01',
        maxDate: '2025-12-31',
      },
    },
  ],
  [
    'Q8 validate - pass',
    TEMPLATE_VALIDATE,
    {
      answers: {
        q1: { type: 'string', answer: 'John Doe' },
        q2: { type: 'string', answer: '25' },
        q3: { type: 'str_array', answer: ['apple', 'orange'] },
        q4: { type: 'str_array', answer: ['red', 'blue'] },
        q5: { type: 'boolean', answer: true },
        q6: { type: 'boolean', answer: false },
        q7: { type: 'string', answer: '1990-01-15' },
      },
      deterministicStates: {},
      validate: '1965-12-10',
    },
    200,
    {
      valid: null,
    },
  ],
  [
    'Q8 validate - fail',
    TEMPLATE_VALIDATE,
    {
      answers: {
        q1: { type: 'string', answer: 'John Doe' },
        q2: { type: 'string', answer: '25' },
        q3: { type: 'str_array', answer: ['apple', 'orange'] },
        q4: { type: 'str_array', answer: ['red', 'blue'] },
        q5: { type: 'boolean', answer: true },
        q6: { type: 'boolean', answer: false },
        q7: { type: 'string', answer: '1990-01-15' },
      },
      deterministicStates: {},
      validate: '1990-11-30',
    },
    200,
    {
      valid: 'Needs to be in December',
    },
  ],

  // Q9: Password
  [
    'Q9',
    TEMPLATE_INIT,
    {
      answers: {
        q1: { type: 'string', answer: 'John Doe' },
        q2: { type: 'string', answer: '25' },
        q3: { type: 'str_array', answer: ['apple', 'orange'] },
        q4: { type: 'str_array', answer: ['red', 'blue'] },
        q5: { type: 'boolean', answer: true },
        q6: { type: 'boolean', answer: false },
        q7: { type: 'string', answer: '1990-01-15' },
        q8: { type: 'string', answer: '1965-05-10' },
      },
      deterministicStates: {},
    },
    200,
    {
      type: 'questionnaire',
      deterministicState: {},
      question: {
        type: 'password',
        message: 'What is your password?',
        id: 'q9',
        desc: null,
        confirmation: null,
      },
    },
  ],
  [
    'Q9 validate',
    TEMPLATE_VALIDATE,
    {
      answers: {
        q1: { type: 'string', answer: 'John Doe' },
        q2: { type: 'string', answer: '25' },
        q3: { type: 'str_array', answer: ['apple', 'orange'] },
        q4: { type: 'str_array', answer: ['red', 'blue'] },
        q5: { type: 'boolean', answer: true },
        q6: { type: 'boolean', answer: false },
        q7: { type: 'string', answer: '1990-01-15' },
        q8: { type: 'string', answer: '1965-05-10' },
      },
      deterministicStates: {},
      validate: 'password123',
    },
    200,
    {
      valid: null,
    },
  ],

  // Q10: Password with confirmation (Complex)
  [
    'Q10',
    TEMPLATE_INIT,
    {
      answers: {
        q1: { type: 'string', answer: 'John Doe' },
        q2: { type: 'string', answer: '25' },
        q3: { type: 'str_array', answer: ['apple', 'orange'] },
        q4: { type: 'str_array', answer: ['red', 'blue'] },
        q5: { type: 'boolean', answer: true },
        q6: { type: 'boolean', answer: false },
        q7: { type: 'string', answer: '1990-01-15' },
        q8: { type: 'string', answer: '1965-05-10' },
        q9: { type: 'string', answer: 'password123' },
      },
      deterministicStates: {},
    },
    200,
    {
      type: 'questionnaire',
      deterministicState: {},
      question: {
        type: 'password',
        message: 'What is your pin?',
        id: 'q10',
        desc: 'The pin of the person',
        confirmation: true,
      },
    },
  ],
  [
    'Q10 validate - pass',
    TEMPLATE_VALIDATE,
    {
      answers: {
        q1: { type: 'string', answer: 'John Doe' },
        q2: { type: 'string', answer: '25' },
        q3: { type: 'str_array', answer: ['apple', 'orange'] },
        q4: { type: 'str_array', answer: ['red', 'blue'] },
        q5: { type: 'boolean', answer: true },
        q6: { type: 'boolean', answer: false },
        q7: { type: 'string', answer: '1990-01-15' },
        q8: { type: 'string', answer: '1965-05-10' },
        q9: { type: 'string', answer: 'password123' },
      },
      deterministicStates: {},
      validate: 'Password123',
    },
    200,
    {
      valid: null,
    },
  ],
  [
    'Q10 validate - fail',
    TEMPLATE_VALIDATE,
    {
      answers: {
        q1: { type: 'string', answer: 'John Doe' },
        q2: { type: 'string', answer: '25' },
        q3: { type: 'str_array', answer: ['apple', 'orange'] },
        q4: { type: 'str_array', answer: ['red', 'blue'] },
        q5: { type: 'boolean', answer: true },
        q6: { type: 'boolean', answer: false },
        q7: { type: 'string', answer: '1990-01-15' },
        q8: { type: 'string', answer: '1965-05-10' },
        q9: { type: 'string', answer: 'password123' },
      },
      deterministicStates: {},
      validate: 'password123',
    },
    200,
    {
      valid: 'You must have a capital letter',
    },
  ],

  // Q11: Select - Car
  [
    'Q11',
    TEMPLATE_INIT,
    {
      answers: {
        q1: { type: 'string', answer: 'John Doe' },
        q2: { type: 'string', answer: '25' },
        q3: { type: 'str_array', answer: ['apple', 'orange'] },
        q4: { type: 'str_array', answer: ['red', 'blue'] },
        q5: { type: 'boolean', answer: true },
        q6: { type: 'boolean', answer: false },
        q7: { type: 'string', answer: '1990-01-15' },
        q8: { type: 'string', answer: '1965-05-10' },
        q9: { type: 'string', answer: 'password123' },
        q10: { type: 'string', answer: 'Password123' },
      },
      deterministicStates: {},
    },
    200,
    {
      type: 'questionnaire',
      deterministicState: {},
      question: {
        type: 'select',
        message: 'What is your favourite car?',
        id: 'q11',
        options: [
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
        desc: 'State your favourite car',
      },
    },
  ],

  // Q12: Select - Plane (Complex)
  [
    'Q12',
    TEMPLATE_INIT,
    {
      answers: {
        q1: { type: 'string', answer: 'John Doe' },
        q2: { type: 'string', answer: '25' },
        q3: { type: 'str_array', answer: ['apple', 'orange'] },
        q4: { type: 'str_array', answer: ['red', 'blue'] },
        q5: { type: 'boolean', answer: true },
        q6: { type: 'boolean', answer: false },
        q7: { type: 'string', answer: '1990-01-15' },
        q8: { type: 'string', answer: '1965-05-10' },
        q9: { type: 'string', answer: 'password123' },
        q10: { type: 'string', answer: 'Password123' },
        q11: { type: 'string', answer: 'BMW' },
      },
      deterministicStates: {},
    },
    200,
    {
      type: 'questionnaire',
      deterministicState: {},
      question: {
        type: 'select',
        message: 'What is your favourite plane?',
        id: 'q12',
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
        desc: 'The plane of the person',
      },
    },
  ],
];

export default function () {
  for (const [name, url, input, status, expected] of testCases) {
    group(name, () => {
      const resp = http.post(url, JSON.stringify(input), HEADERS);
      check(resp, {
        [`${name} status 200`]: r => r.status === status,
        [`${name} full response structure`]: r => expect(r.json()).to.deep.equal(expected),
      });
    });
  }
}
