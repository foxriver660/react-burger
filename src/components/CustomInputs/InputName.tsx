import { Input } from "@ya.praktikum/react-developer-burger-ui-components";
import React, { FC } from "react";
import { TInput } from "../../services/types/data";


const InputName: FC<TInput> = ({ value, onChange, placeholder }) => {
  const [isValidName, setIsValidName] = React.useState(true);
  return (
    <>
      <Input
        required={true}
        name="name"
        placeholder={placeholder}
        errorText="Ошибка"
        pattern={`[A-Za-zА-Яа-яЁё0-9]{3,}`}
        value={value}
        type="text"
        onChange={(e) => {
          onChange(e);
          setIsValidName(true);
        }}
        error={isValidName ? false : true}
        onInvalid={() => setIsValidName(false)}
      />
    </>
  );
};

export default InputName;
