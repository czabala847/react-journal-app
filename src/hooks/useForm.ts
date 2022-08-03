import { useState } from "react";

export const useForm = <T>(initialState: T) => {
  const [stateForm, setStateForm] = useState<T>(initialState);

  const changeValueInput = ({
    target,
  }: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = target;

    setStateForm({ ...stateForm, [name]: value });
  };

  const reset = () => {
    setStateForm(initialState);
  };

  return {
    ...stateForm,
    stateForm,
    changeValueInput,
    reset,
  };
};
