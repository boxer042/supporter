import React, { useEffect, useState } from 'react'
import {
  useAutocompleteIndex,
  useResetAutocompleteIndex,
} from '../atoms/autocompleteIndex'
import {
  useResetSuppliedNameAutocompleteIndex,
  useSearchedHandlingGoodsValue,
  useSearchedPurchaseGoodsState,
  useSuppliedNameAutocompleteIndex,
} from '../atoms/purchasesState'
import { SearchAccountsHandingGoodsResult } from '../lib/api/accounts/searchAccounts'

export type usePurchaseSuppliedNameAutocompleteProps = {}

export default function usePurchaseSuppliedNameAutocomplete(keyword: string) {
  const [prevData, setPrevData] = useState<
    SearchAccountsHandingGoodsResult[] | null
  >(null)
  const [search, setSearch] = useSearchedPurchaseGoodsState()
  const data = useSearchedHandlingGoodsValue()

  const [selectedIndex, setSelectedIndex] = useSuppliedNameAutocompleteIndex()
  const reset = useResetSuppliedNameAutocompleteIndex()

  useEffect(() => {
    return reset
  }, [reset])

  useEffect(() => {
    setSearch(keyword)
  }, [keyword, setSearch])

  useEffect(() => {
    if (keyword === '') {
      setPrevData(null)
    }
    setSelectedIndex(-1)
  }, [keyword, setSelectedIndex])

  const goUp = () => {
    if (!data || data.length === 0) return
    if (selectedIndex === -1) {
      setSelectedIndex(data.length - 1)
      return
    }
    setSelectedIndex(selectedIndex - 1)
  }

  const goDown = () => {
    if (!data || data.length === 0) return
    if (selectedIndex === data.length - 1) {
      // unselect
      setSelectedIndex(-1)
      return
    }
    setSelectedIndex(selectedIndex + 1)
  }

  return {
    results: data || prevData,
    selectedIndex,
    goUp,
    goDown,
    reset,
  }
}
