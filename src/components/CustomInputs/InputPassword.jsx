import { Input } from "@ya.praktikum/react-developer-burger-ui-components";
import React, { useRef, useState } from "react";

const InputPassword = ({value, onChange, placeholder}) => {
  const [isValidPassword, setIsValidPassword] = useState(true);
  const [showPassword, setShowPassword] = React.useState(false);
  const passwordRef = useRef(null);

  const handlePasswordClick = () => {
    passwordRef.current?.focus();
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
        ref={passwordRef}
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