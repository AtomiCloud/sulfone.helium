interface ConfirmQuestionRes {
  message: string;
  desc?: string | null;
  default?: string | null;
  errorMessage?: string | null;
  type: 'confirm'; // Type discriminator value
}

interface DateQuestionRes {
  message: string;
  default?: string | null;
  desc?: string | null;
  minDate?: string | null;
  maxDate?: string | null;
  type: 'date'; // Type discriminator value
}

interface CheckboxQuestionRes {
  message: string;
  desc?: string | null;
  options: string[];
  type: 'checkbox'; // Type discriminator value
}

interface PasswordQuestionRes {
  message: string;
  desc?: string | null;
  confirmation?: boolean | null;
  type: 'password'; // Type discriminator value
}

interface SelectQuestionRes {
  message: string;
  options: string[];
  desc?: string | null;
  type: 'select'; // Type discriminator value
}

interface TextQuestionRes {
  message: string;
  default?: string | null;
  desc?: string | null;
  initial?: string | null;
  type: 'text'; // Type discriminator value
}

type QuestionRes =
  | ConfirmQuestionRes
  | DateQuestionRes
  | CheckboxQuestionRes
  | PasswordQuestionRes
  | SelectQuestionRes
  | TextQuestionRes;

// export all
export type {
  QuestionRes,
  ConfirmQuestionRes,
  DateQuestionRes,
  CheckboxQuestionRes,
  PasswordQuestionRes,
  SelectQuestionRes,
  TextQuestionRes,
};
