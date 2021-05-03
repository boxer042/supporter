import React, { useEffect, useState } from 'react'
import {
  useAutocompleteIndex,
  useResetAutocompleteIndex,
} from '../atoms/autocompleteIndex'
import { SearchAccountsResult } from '../lib/api/accounts/searchAccounts'
import useSearchAccountsQuery from './query/useSearchAccountsQuery'

export type useAccountsAutocompleteProps = {}

export default function useAccountsAutocomplete(keyword: string) {
  const [prevData, setPrevData] = useState<SearchAccountsResult[] | null>(null)
  const { data } = useSearchAccountsQuery(keyword, {
    enabled: keyword !== "'",
  })
  const [selectedIndex, setSelectedIndex] = useAutocompleteIndex()
  const reset = useResetAutocompleteIndex()

  useEffect(() => {
    return reset
  }, [reset])

  useEffect(() => {
    if (data) {
      setPrevData(data)
    }
  }, [data])

  useEffect(() => {
    if (keyword === "'") {
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
