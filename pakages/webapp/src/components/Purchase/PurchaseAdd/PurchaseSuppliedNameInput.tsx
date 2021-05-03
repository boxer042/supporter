import React, { useCallback, useEffect, useRef, useState } from 'react'
import useOnClickOutside from 'use-onclickoutside'
import { useSearchedPurchaseGoodsState } from '../../../atoms/purchasesState'
import usePurchaseSuppliedNameAutocomplete from '../../../hooks/usePurchaseSuppliedNameAutocomplete'
import Input from '../../Input/Input'
import PurchaseSuppliedNameAutocomplete from './PurchaseSuppliedNameAutocomplete'

export type PurchaseSuppliedNameInputProps = {}

function PurchaseSuppliedNameInput({}: PurchaseSuppliedNameInputProps) {
  const [keyword, setKeyword] = useState('')
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const { results, reset } = usePurchaseSuppliedNameAutocomplete(keyword)

  useEffect(() => {
    if (!open) {
      reset()
    }
  }, [open, reset])

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value !== '' && !open) {
      setOpen(true)
    }
    setKeyword(e.target.value)
  }

  const onClose: Parameters<typeof useOnClickOutside>[1] = (e) => {
    if (ref.current === e.target || ref.current?.contains(e.target as Node)) {
      return
    }
    setOpen(false)
  }

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {}

  return (
    <div>
      <Input
        name="suppliedName"
        value={keyword}
        onChange={onChange}
        onFocus={() => setOpen(true)}
        onBlur={() => setOpen(false)}
        autoComplete="off"
        onKeyDown={onKeyDown}
        placeholder="구매 상품명"
      />

      {open && (
        <PurchaseSuppliedNameAutocomplete
          keyword={keyword}
          results={results}
          visible={open}
          onClose={onClose}
        />
      )}
    </div>
  )
}

export default PurchaseSuppliedNameInput
