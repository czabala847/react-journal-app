import { useEffect, useMemo, useState } from "react";

export type FormData = {
  [key: string]: string;
};

export type FormValidation = {
  [key: string]: [(value: string) => boolean, string];
};

type FormCheckedValue = {
  [key: string]: string | null;
};

export const useForm = (
  initialState: FormData,
  validations?: FormValidation
) => {
  const [stateForm, setStateForm] = useState<FormData>(initialState);
  const [formValidation, setFormValidation] = useState<FormCheckedValue>({});

  useEffect(() => {
    createValidators();
  }, [stateForm]);

  useEffect(() => {
    setStateForm(initialState);
  }, [initialState]);

  const changeValueInput = ({
    target,
  }: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = target;

    setStateForm({ ...stateForm, [name]: value });
  };

  const reset = () => {
    setStateForm(initialState);
  };

  const isFormValid = useMemo(() => {
    for (const key in formValidation) {
      if (formValidation[key] !== null) return false;
    }

    return true;
  }, [formValidation]);

  const createValidators = () => {
    const formCheckedValues: FormCheckedValue = {};

    for (const key in validations) {
      const [fn, messageError] = validations[key];

      formCheckedValues[`${key}Valid`] = fn(stateForm[key])
        ? null
        : messageError;
    }

    setFormValidation(formCheckedValues);
  };

  return {
    changeValueInput,
    formValidation,
    isFormValid,
    reset,
    stateForm,
  };
};
