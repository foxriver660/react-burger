import { Input } from "@ya.praktikum/react-developer-burger-ui-components";
import React, { FC, useRef, useState } from "react";
import { TInput } from "../../services/types/data";


const InputPassword: FC<TInput> = ({value, onChange, placeholder}) => {
  const [isValidPassword, setIsValidPassword] = useState(true);
  const [showPassword, setShowPassword] = React.useState(false);
  
  const ref = useRef<HTMLInputElement | null>(null);
  const handlePasswordClick = () => {
    ref.current?.focus();
    setShowPassword(!showPassword);
  };
  return (
    <>
      <Input
        required={true}
        name="password"
        placeholder={placeholder}
        maxLength={12}
        minLength={2}
        errorText="Ошибка"
        autoComplete="off"
        value={value}
        ref={ref}
        type={showPassword ? "text" : "password"}
        icon={showPassword ? "HideIcon" : "ShowIcon"}
        error={isValidPassword ? false : true}
        onInvalid={(e) => setIsValidPassword(false)}
        onIconClick={handlePasswordClick}
        onChange={(e) => {
          onChange(e);
          setIsValidPassword(true);
        }}
      />
    </>
  );
};

 export default InputPassword;