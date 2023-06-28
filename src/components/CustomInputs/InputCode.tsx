import { Input } from '@ya.praktikum/react-developer-burger-ui-components'
import React, { FC } from 'react'
import { TInputCode } from '../../services/types/data';


const InputCode: FC<TInputCode> = ({value, onChange}) => {
  const [isValidCode, setIsValidCode] = React.useState(true);

  return (
    <>
      <Input
          required={true}
          name="token"
          placeholder="Введите код из письма"
          errorText="Ошибка"
          value={value}
          type="text"
          onChange={onChange}
          error={isValidCode ? false : true}
          onInvalid={() => setIsValidCode(false)}
        />
    </>
  )
}

export default InputCode
