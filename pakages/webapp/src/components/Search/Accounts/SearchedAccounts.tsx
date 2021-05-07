import React, { useState } from 'react'
import { useRef } from 'react'
import useOnClickOutside from 'use-onclickoutside'
import { css } from '@emotion/react'

export type SearchedAccountsProps = {}

function SearchedAccounts({}: SearchedAccountsProps) {
  const [keyword, setKeyword] = useState('')
  const ref = useRef<HTMLDivElement>(null)

  const onClose: Parameters<typeof useOnClickOutside>[1] = (e) => {
    if (ref.current === e.target || ref.current?.contains(e.target as Node)) {
      return
    }
    //여기 옵션
  }

  useOnClickOutside(ref, onClose)
  return <div>SearchedAccounts</div>
}

export default SearchedAccounts
