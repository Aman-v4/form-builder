import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FormSchema, FormField } from './types';

interface FormBuilderState {
  currentForm: FormSchema;
  savedForms: FormSchema[];
}

const blankForm = (): FormSchema => ({
  id: '',
  name: '',
  createdAt: '',
  fields: [],
});

const initialState: FormBuilderState = {
  currentForm: blankForm(),
  savedForms: [],
};

const formBuilderSlice = createSlice({
  name: 'formBuilder',
  initialState,
  reducers: {
    setCurrentForm(state, action: PayloadAction<FormSchema>) {
      state.currentForm = action.payload;
    },
    addField(state, action: PayloadAction<FormField>) {
      state.currentForm.fields.push(action.payload);
    },
    updateField(state, action: PayloadAction<FormField>) {
      const idx = state.currentForm.fields.findIndex(f => f.id === action.payload.id);
      if (idx !== -1) state.currentForm.fields[idx] = action.payload;
    },
    deleteField(state, action: PayloadAction<string>) {
      state.currentForm.fields = state.currentForm.fields.filter(f => f.id !== action.payload);
    },
    reorderFields(state, action: PayloadAction<FormField[]>) {
      state.currentForm.fields = action.payload;
    },
    clearCurrentForm(state) {
      state.currentForm = blankForm();
    },
    saveForm(state, action: PayloadAction<FormSchema>) {
      state.savedForms.push(action.payload);
    },
    setSavedForms(state, action: PayloadAction<FormSchema[]>) {
      state.savedForms = action.payload;
    },
  }
});

export const {
  addField, updateField, deleteField, reorderFields, saveForm,
  setSavedForms, setCurrentForm, clearCurrentForm
} = formBuilderSlice.actions;

export default formBuilderSlice.reducer;
