import { FormField } from '../store/types';

// Note: For demo, only support age from DOB type formulas.
// Production code would involve parsing actual JS formulas securely.
export function computeDerivedValue(field: FormField, formValues: { [key: string]: any }) {
  if (!field.derived) return '';
  // Example: formula = "2025 - (new Date(parent).getFullYear())"
  // We'll demo one: calculate age from DOB
  if (field.derived.formula === 'ageFromDOB') {
    const dob = formValues[field.derived.parentIds[0]];
    if (!dob) return '';
    const dobDate = new Date(dob);
    const age = new Date().getFullYear() - dobDate.getFullYear();
    return age >= 0 ? age : '';
  }
  return '';
}
