import React, { useState } from 'react'
import Input from '../../Input/Input'
import AccountsAutocomplete from './AccountsAutocomplete'

export type SearchedAccountsInputProps = {}

function SearchedAccountsInput({}: SearchedAccountsInputProps) {
  const [keyword, setKeyword] = useState('')
  return (
    <div>
      <Input />
      <input value={keyword} onChange={(e) => setKeyword(e.target.value)} />
      <AccountsAutocomplete keyword={keyword} />
    </div>
  )
}

export default SearchedAccountsInput
