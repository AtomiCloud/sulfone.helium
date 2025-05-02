import type { CheckboxQ, ConfirmQ, DateQ, PasswordQ, SelectQ, TextQ } from './question.js';

interface IInquirer {
  checkbox(q: CheckboxQ): Promise<string[]>;

  checkbox(q: string, options: string[], id: string, help?: string | null): Promise<string[]>;

  confirm(q: ConfirmQ): Promise<boolean>;

  confirm(q: string, id: string, help?: string | null): Promise<boolean>;

  password(q: PasswordQ): Promise<string>;

  password(q: string, id: string, help?: string | null): Promise<string>;

  select(q: SelectQ): Promise<string>;

  select(q: string, options: string[], id: string, help?: string | null): Promise<string>;

  text(q: TextQ): Promise<string>;

  text(q: string, id: string, help?: string | null): Promise<string>;

  dateSelect(q: DateQ): Promise<string>;

  dateSelect(q: string, id: string, help?: string | null): Promise<string>;
}

export type { IInquirer };
