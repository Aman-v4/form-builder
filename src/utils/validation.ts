import { FormField, ValidationRule } from '../store/types';

export function validateField(value: any, field: FormField): string | null {
  if (!field.validations) return null;
  for (const rule of field.validations) {
    switch (rule.type) {
      case 'required':
        if (!value) return `${field.label} is required.`;
        break;
      case 'minLength':
        if (value && value.length < (rule.value as number)) return `${field.label} must be at least ${rule.value} characters.`;
        break;
      case 'maxLength':
        if (value && value.length > (rule.value as number)) return `${field.label} must be at most ${rule.value} characters.`;
        break;
      case 'email':
        if (value && !/\S+@\S+\.\S+/.test(value)) return 'Enter a valid email address.';
        break;
      case 'passwordRule':
        if (value && (!/\d/.test(value) || value.length < 8)) return 'Password must be at least 8 characters and include a number.';
        break;
      default:
        break;
    }
  }
  return null;
}
