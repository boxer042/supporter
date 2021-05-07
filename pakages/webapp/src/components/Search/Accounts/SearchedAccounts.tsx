import React, { useState } from 'react'
import { useRef } from 'react'
import useOnClickOutside from 'use-onclickoutside'
import { css } from '@emotion/react'
import PrimaryInput from '../../PrimaryInput/PrimaryInput'
import SearchedAccountsDataList from './SearchedAccountsDataList'

export type SearchedAccountsProps = {}

function SearchedAccounts({}: SearchedAccountsProps) {
  const [keyword, setKeyword] = useState('')
  const [accountsListOpen, setAccountsListOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  const onClose: Parameters<typeof useOnClickOutside>[1] = (e) => {
    if (ref.current === e.target || ref.current?.contains(e.target as Node)) {
      return
    }
    setAccountsListOpen(false)
  }

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value !== '' && !accountsListOpen) {
      setAccountsListOpen(true)
    }
    setKeyword(e.target.value)
  }

  const onFocus = () => setAccountsListOpen(true)

  return (
    <div>
      <PrimaryInput value={keyword} onFocus={onFocus} onChange={onChange} />
      <SearchedAccountsDataList
        keyword={keyword}
        visible={accountsListOpen}
        onClose={onClose}
      />
    </div>
  )
}

export default SearchedAccounts
