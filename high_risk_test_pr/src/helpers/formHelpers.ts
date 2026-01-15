/**
 * Form Helpers
 * Utilities for form handling and validation
 */

export interface FormErrors {
  [key: string]: string | undefined;
}

export const getFieldError = (errors: FormErrors, fieldName: string): string | undefined => {
  return errors[fieldName];
};

export const hasFieldError = (errors: FormErrors, fieldName: string): boolean => {
  return Boolean(errors[fieldName]);
};

export const hasErrors = (errors: FormErrors): boolean => {
  return Object.values(errors).some((error) => Boolean(error));
};

export const clearFieldError = (errors: FormErrors, fieldName: string): FormErrors => {
  const newErrors = { ...errors };
  delete newErrors[fieldName];
  return newErrors;
};

export const clearAllErrors = (): FormErrors => {
  return {};
};

export const setFieldError = (errors: FormErrors, fieldName: string, error: string): FormErrors => {
  return {
    ...errors,
    [fieldName]: error,
  };
};

export const formatFormData = <T extends Record<string, any>>(formData: T): T => {
  const formatted = { ...formData };

  Object.keys(formatted).forEach((key) => {
    const value = formatted[key];

    if (typeof value === 'string') {
      formatted[key] = value.trim();
    }
  });

  return formatted;
};

export const resetFormData = <T extends Record<string, any>>(template: T): T => {
  return Object.keys(template).reduce((acc, key) => {
    const value = template[key];

    if (typeof value === 'string') {
      acc[key] = '';
    } else if (typeof value === 'number') {
      acc[key] = 0;
    } else if (typeof value === 'boolean') {
      acc[key] = false;
    } else if (Array.isArray(value)) {
      acc[key] = [];
    } else if (typeof value === 'object') {
      acc[key] = null;
    }

    return acc;
  }, {} as T);
};
