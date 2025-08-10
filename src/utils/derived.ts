import { FormField } from '../store/types';

export function computeDerivedValue(field: FormField, formValues: { [key: string]: any }) {
  if (!field.derived) return '';
  if (field.derived.formula === 'ageFromDOB') {
    const dob = formValues[field.derived.parentIds[0]];
    if (!dob) return '';
    const dobDate = new Date(dob);
    const age = new Date().getFullYear() - dobDate.getFullYear();
    return age >= 0 ? age : '';
  }
  return '';
}
