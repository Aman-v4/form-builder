export type FieldType = 'text' | 'number' | 'textarea' | 'select' | 'radio' | 'checkbox' | 'date' | 'derived';

export interface ValidationRule {
  type: 'required' | 'minLength' | 'maxLength' | 'email' | 'passwordRule';
  value?: string | number;
}

export interface FormField {
  id: string;
  type: FieldType;
  label: string;
  required: boolean;
  defaultValue?: any;
  validations?: ValidationRule[];
  options?: string[];
  derived?: {
    parentIds: string[];
    formula: string;
  };
}

export interface FormSchema {
  id: string;
  name: string;
  createdAt: string;
  fields: FormField[];
}
