import { Input } from '@ya.praktikum/react-developer-burger-ui-components';
import React, { FC } from 'react'
import { TInput } from '../../services/types/data';


const InputEmail: FC<TInput> = ({value, onChange, placeholder, profile=false}) => {
  const [isValidEmail, setIsValidEmail] = React.useState(true);
  return (
    <>
    <Input
     icon={profile ? "EditIcon" : undefined}
          required={true}
          name="email"
          placeholder={placeholder}
          errorText="Ошибка"
          value={value}
          type="email"
          error={isValidEmail ? false : true}
          onInvalid={() => setIsValidEmail(false)}
          onChange={(e) => {
            onChange(e);
            setIsValidEmail(true);
          }}
        />
    </>
  )
}
export default InputEmail
