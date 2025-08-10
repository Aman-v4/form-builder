import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getFormsFromStorage } from '../utils/localStorage';
import { FormField, FormSchema } from '../store/types';
import TextField from '../components/fields/TextField';
import NumberField from '../components/fields/NumberField';
import TextareaField from '../components/fields/TextareaField';
import SelectField from '../components/fields/SelectField';
import RadioField from '../components/fields/RadioField';
import CheckboxField from '../components/fields/CheckboxField';
import DateField from '../components/fields/DateField';
import DerivedField from '../components/fields/DerivedField';
import { computeDerivedValue } from '../utils/derived';
import { validateField } from '../utils/validation';
import { Container, Typography, Button, Box } from '@mui/material';

function PreviewForm() {
  const { formId } = useParams<{ formId: string }>();
  const [form, setForm] = useState<FormSchema | null>(null);
  const [values, setValues] = useState<{ [k: string]: any }>({});
  const [errors, setErrors] = useState<{ [k: string]: string | null }>({});
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const forms = getFormsFromStorage();
    const found = forms.find((f: FormSchema) => f.id === formId);
    setForm(found || null);

    // Initialize values with default values from form fields
    if (found) {
      const initValues: { [key: string]: any } = {};
      found.fields.forEach(field => {
        if (field.defaultValue !== undefined) {
          initValues[field.id] = field.defaultValue;
        } else {
          initValues[field.id] = field.type === 'checkbox' ? [] : '';
        }
      });
      setValues(initValues);
    }
  }, [formId]);

  useEffect(() => {
    if (!form) return;

    const derivedUpdates: { [key: string]: any } = {};
    form.fields.forEach(field => {
      if (field.type === 'derived' && field.derived) {
        derivedUpdates[field.id] = computeDerivedValue(field, values);
      }
    });

    let updated = false;
    const newValues = { ...values };

    Object.entries(derivedUpdates).forEach(([key, val]) => {
      if (newValues[key] !== val) {
        newValues[key] = val;
        updated = true;
      }
    });

    if (updated) {
      setValues(newValues);
    }
  }, [values, form]);

  if (!form) {
    return (
      <Container>
        <Typography>Form Not Found</Typography>
      </Container>
    );
  }

  const onInput = (id: string, value: any) => {
    setValues(prev => ({ ...prev, [id]: value }));
  };

  const validate = () => {
    const errs: { [k: string]: string | null } = {};
    form.fields.forEach(field => {
      if (field.type !== 'derived') {
        errs[field.id] = validateField(values[field.id], field);
      }
    });
    setErrors(errs);
    return Object.values(errs).every(e => e === null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    if (validate()) {
      alert('Form input valid!');
    }
  };

  return (
    <Container>
      <Typography variant="h5" gutterBottom>{form.name} - Preview</Typography>
      <form onSubmit={handleSubmit}>
        {form.fields.map(field => {
          const commonProps = {
            key: field.id,
            label: field.label,
            required: field.required,
            value: values[field.id] || (field.type === 'checkbox' ? [] : ''),
            onChange: (val: any) => onInput(field.id, val),
            error: submitted ? errors[field.id] : undefined,
          };
          switch (field.type) {
            case 'text': return <TextField {...commonProps} />;
            case 'number': return <NumberField {...commonProps} />;
            case 'textarea': return <TextareaField {...commonProps} />;
            case 'select': return <SelectField {...commonProps} options={field.options || []} />;
            case 'radio': return <RadioField {...commonProps} options={field.options || []} />;
            case 'checkbox': return <CheckboxField {...commonProps} options={field.options || []} />;
            case 'date': return <DateField {...commonProps} />;
            case 'derived':
              return <DerivedField key={field.id} label={field.label} value={values[field.id] || ''} />;
            default: return null;
          }
        })}
        <Box my={2}>
          <Button type="submit" variant="contained" color="primary">Validate</Button>
        </Box>
      </form>
    </Container>
  );
}

export default PreviewForm;
