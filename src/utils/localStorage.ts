import { FormSchema } from '../store/types';

const STORAGE_KEY = 'forms';

export const getFormsFromStorage = (): FormSchema[] => {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
};

export const saveFormToStorage = (form: FormSchema) => {
  const forms = getFormsFromStorage();
  forms.push(form);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(forms));
};

export const clearFormsFromStorage = () => {
  localStorage.removeItem(STORAGE_KEY);
};
