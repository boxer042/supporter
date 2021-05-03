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

  return {
    results: data || prevData,
    selectedIndex,
    reset,
  }
}
