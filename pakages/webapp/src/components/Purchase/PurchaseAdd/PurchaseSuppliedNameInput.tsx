import React, { useCallback, useEffect, useRef, useState } from 'react'
import useOnClickOutside from 'use-onclickoutside'
import {
  usePurchaseGoodsActions,
  useSearchedPurchaseGoodsState,
} from '../../../atoms/purchasesState'
import usePurchaseSuppliedNameAutocomplete from '../../../hooks/usePurchaseSuppliedNameAutocomplete'
import Input from '../../Input/Input'
import PurchaseSuppliedNameAutocomplete from './PurchaseSuppliedNameAutocomplete'

export type PurchaseSuppliedNameInputProps = {}

function PurchaseSuppliedNameInput({}: PurchaseSuppliedNameInputProps) {
  const [keyword, setKeyword] = useState('')
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const { append, reseted } = usePurchaseGoodsActions()

  const {
    results,
    goUp,
    goDown,
    selectedIndex,
    reset,
  } = usePurchaseSuppliedNameAutocomplete(keyword)

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

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!['ArrowDown', 'ArrowUp', 'Enter'].includes(e.key)) return
    e.preventDefault()
    if (e.key === 'ArrowDown') {
      goDown()
    } else if (e.key === 'ArrowUp') {
      goUp()
    } else if (e.key === 'Enter') {
      const selectedSuppliedName = results?.[selectedIndex]
      if (selectedIndex === -1) {
        console.log('-1임')
        return
      }
      if (!selectedSuppliedName) return
      const {
        id,
        include,
        stock,
        supplied_name,
        supplied_value,
        supplied_vat,
        supplied_price,
        supplied_value_discount,
        purchase_value,
        purchase_vat,
        purchase_price,
      } = selectedSuppliedName
      append({
        id,
        include,
        stock,
        supplied_name,
        supplied_value,
        supplied_vat,
        supplied_price,
        supplied_value_discount,
        purchase_value,
        purchase_vat,
        purchase_price,
      })
      setKeyword(supplied_name)
      setOpen(false)
      if (results?.[selectedIndex]) console.log(results?.[selectedIndex])
    }
  }

  return (
    <div>
      <Input
        name="suppliedName"
        value={keyword}
        onChange={onChange}
        onFocus={() => setOpen(true)}
        onBlur={(e) => {
          e.persist()
          const relatedTarget = e.relatedTarget as HTMLElement | null
          if (
            relatedTarget &&
            relatedTarget.dataset.type === 'suppliedName-item'
          ) {
            return
          }
        }}
        autoComplete="off"
        onKeyDown={onKeyDown}
        placeholder="구매 상품명"
      />

      {open && (
        <PurchaseSuppliedNameAutocomplete
          results={results}
          visible={open}
          onClose={onClose}
          selectedIndex={selectedIndex}
        />
      )}
    </div>
  )
}

export default PurchaseSuppliedNameInput
