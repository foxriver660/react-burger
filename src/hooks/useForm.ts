import { ChangeEvent, FormEvent, useState } from "react";
import { useAppDispatch } from "../services/hooks";
import { useNavigate } from "react-router-dom";
import { TObjectString } from "../services/types/data";

function useForm(inputValues: TObjectString) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [form, setForm] = useState(inputValues);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;
    setForm({ ...form, [name]: value });
  };
  const handleReset = () => {
    setForm(inputValues);
  };
  const handleSubmit = (e: FormEvent, action: any, path?: string) => {
    e.preventDefault();
    dispatch(action(form)).then(() =>
      path ? navigate(path, { replace: true }) : null
    );
  };
  return { form, handleChange, handleReset, handleSubmit, setForm };
}

export default useForm;
