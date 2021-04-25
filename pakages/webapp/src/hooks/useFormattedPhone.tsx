import { useState } from 'react'

export default function useFormattedPhone(defaultValue: number) {
  const [value, setValue] = useState(defaultValue.toLocaleString())
}
