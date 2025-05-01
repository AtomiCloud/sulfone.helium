// TypeScript equivalent of the C# enum
enum QuestionType {
  Text = 0,
  DateSelect = 1,
  Select = 2,
  Checkbox = 3,
  Password = 4,
  Confirm = 5,
}

interface CheckboxQ {
  type: QuestionType.Checkbox;
  id: string;
  message: string;
  desc?: string | null;
  validate?: (input: string) => string | null;

  options: string[];
}

interface ConfirmQ {
  type: QuestionType.Confirm;
  id: string;
  message: string;
  desc?: string | null;
  validate?: (input: string) => string | null;

  default?: string | null;
  errorMessage?: string | null;
}

interface DateQ {
  type: QuestionType.DateSelect;
  id: string;
  message: string;
  desc?: string | null;
  validate?: (input: string) => string | null;

  default?: Date | null;
  minDate?: Date | null;
  maxDate?: Date | null;
}

interface PasswordQ {
  type: QuestionType.Password;
  id: string;
  message: string;
  desc?: string | null;
  validate?: (input: string) => string | null;

  confirmation?: boolean | null;
}

interface SelectQ {
  type: QuestionType.Select;
  id: string;
  message: string;
  desc?: string | null;
  validate?: (input: string) => string | null;

  options: string[];
}

interface TextQ {
  type: QuestionType.Text;
  id: string;
  message: string;
  desc?: string | null;
  validate?: (input: string) => string | null;

  default?: string | null;
  initial?: string | null;
}

type Question = TextQ | SelectQ | PasswordQ | DateQ | ConfirmQ | CheckboxQ;

// export all
export { QuestionType };
export type { Question, TextQ, SelectQ, PasswordQ, DateQ, ConfirmQ, CheckboxQ };
