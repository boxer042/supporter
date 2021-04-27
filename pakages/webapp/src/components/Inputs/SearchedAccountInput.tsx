import React, { useEffect, useState } from 'react'
import {
  searchAccounts,
  SearchAccountsResult,
} from '../../lib/api/accounts/searchAccounts'

export type SearchedAccountInputProps = {}

function SearchedAccountInput({}: SearchedAccountInputProps) {
  const [open, setOpen] = useState(false)
  const [keyword, setKeyword] = useState('')
  const [results, setResults] = useState<SearchAccountsResult[]>([])

  useEffect(() => {
    const search = async () => {
      const replaceKeyword = `'${keyword}`
      const data = await searchAccounts(replaceKeyword)
      setResults(data)
    }
    search()
  }, [keyword])

  const onFocus = () => setOpen(true)
  const onBlur = () => setOpen(false)

  const onChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value !== '' && !open) {
      setOpen(true)
    }
    setKeyword(e.target.value)
  }

  return (
    <div>
      <input
        placeholder="거래처 선택"
        value={keyword}
        onFocus={onFocus}
        onBlur={onBlur}
        onChange={onChange}
      />
      {open && (
        <div>
          {results.map((result) => (
            <div key={result.id}>
              <div>{result.name}</div>
              <div>{result.office}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default SearchedAccountInput
