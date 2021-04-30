import { useCallback, useState } from 'react'

export default function useFormattedNumber(defaultValue: number) {
  const [value, setValue] = useState(defaultValue.toLocaleString())
  const onChangeNumber = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const number = parseInt(e.target.value.replace(/[^\d]+/g, ''), 10)
      if (isNaN(number)) {
        setValue('0')
        return
      }
      setValue(number.toLocaleString())
    },
    []
  )

  return [value, onChangeNumber, setValue] as const
}
