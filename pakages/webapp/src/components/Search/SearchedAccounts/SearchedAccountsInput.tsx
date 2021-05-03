import React, { useEffect, useRef, useState } from 'react'
import useAccountsAutocomplete from '../../../hooks/useAccountsAutocomplete'
import useOnClickOutside from 'use-onclickoutside'
import { useDebounce } from 'use-debounce'
import Input from '../../Input/Input'
import AccountsAutocomplete from './AccountsAutocomplete'
import {
  useResetAccountsUnmountEffect,
  useSelectedAccountsActions,
} from '../../../atoms/selectedAccountsState'
import { SearchAccountsHandingGoodsResult } from '../../../lib/api/accounts/searchAccounts'

export type SearchedAccountsInputProps = {} & React.HTMLAttributes<HTMLDivElement>

function SearchedAccountsInput({}: SearchedAccountsInputProps) {
  const [keyword, setKeyword] = useState('')
  const replaceKeyword = `'${keyword}`
  const [debouncedKeyword] = useDebounce(replaceKeyword, 200)
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const { append, reseted } = useSelectedAccountsActions()
  const {
    results,
    goUp,
    goDown,
    selectedIndex,
    reset,
  } = useAccountsAutocomplete(debouncedKeyword)

  useResetAccountsUnmountEffect()

  useEffect(() => {
    if (!open) reset()
  }, [open, reset])

  useEffect(() => {
    if (keyword === '' || keyword.length === 0) {
      reseted()
    }
  }, [keyword, reseted])

  const onFocus = () => setOpen(true)
  const onBlur = () => {
    //setOpen(false)
  }

  const onClose: Parameters<typeof useOnClickOutside>[1] = (e) => {
    if (ref.current === e.target || ref.current?.contains(e.target as Node)) {
      return
    }
    setOpen(false)
  }

  const onSelect = ({
    id,
    name,
    office,
    metadata,
    handlingGoods,
  }: {
    id: number
    name: string
    office: string
    metadata?: {
      address?: string
    }
    handlingGoods: SearchAccountsHandingGoodsResult[] | null
  }) => {
    //마우스 이벤트
    setOpen(false)

    append({
      id,
      name,
      office,
      metadata,
      handling_goods: handlingGoods,
    })
  }

  const appendWhenAccountExists = async () => {
    // 그냥 엔터쳤을 때
    try {
      setOpen(false)
    } catch (error) {}
  }

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!['ArrowDown', 'ArrowUp', 'Enter'].includes(e.key)) return
    e.preventDefault()
    if (e.key === 'ArrowDown') {
      goDown()
    } else if (e.key === 'ArrowUp') {
      goUp()
    } else if (e.key === 'Enter') {
      const selectedAccount = results?.[selectedIndex]
      if (selectedIndex === -1) {
        console.log('-1임')
        return
      }
      if (!selectedAccount) return
      const { id, name, office, metadata, handling_goods } = selectedAccount
      append({
        id,
        name,
        office,
        metadata,
        handling_goods,
      })
      setKeyword(name)
      setOpen(false)
      if (results?.[selectedIndex]) console.log(results?.[selectedIndex])
    }
  }

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value !== '' && !open) {
      setOpen(true)
    }
    setKeyword(e.target.value)
  }

  return (
    <div>
      <Input
        placeholder="거래처 선택"
        onFocus={onFocus}
        onBlur={(e) => {
          e.persist()
          const relatedTarget = e.relatedTarget as HTMLElement | null
          if (relatedTarget && relatedTarget.dataset.type === 'account-itme') {
            return
          }
          onBlur()
        }}
        value={keyword}
        onChange={onChange}
        onKeyDown={onKeyDown}
      />
      <AccountsAutocomplete
        visible={open}
        results={results}
        onClose={onClose}
        onSelect={onSelect}
        selectedIndex={selectedIndex}
      />
    </div>
  )
}

export default SearchedAccountsInput

//useAccountsAutocomplete
