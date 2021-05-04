import { useCallback } from 'react'
import {
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
  useResetRecoilState,
  useSetRecoilState,
} from 'recoil'
import { SearchAccountsHandingGoodsResult } from '../lib/api/accounts/searchAccounts'
import { selectedAccountsState } from './selectedAccountsState'

export const selectedSuppliedNameState = atom<SearchAccountsHandingGoodsResult | null>(
  {
    key: 'selectedSuppliedNameState',
    default: null,
  }
)

export const searchedPurchaseGoodsState = atom({
  key: 'searchedPurchaseGoodsState',
  default: '',
})

export const suppliedNameAutocompleteIndex = atom<number>({
  key: 'suppliedNameAutocompleteIndex',
  default: -1,
})

export const searchedHandlingGoodsState = selector({
  key: 'searchedHandlingGoodsState',
  get: ({ get }) => {
    const list = get(selectedAccountsState)
    const search = get(searchedPurchaseGoodsState)
    const results = list?.handling_goods
    if (search.length > 0) {
      return (
        results?.filter((item) => item.supplied_name.includes(search)) || null
      )
    }

    return results || null
  },
})

export function usePurchaseGoodsActions() {
  const set = useSetRecoilState(selectedSuppliedNameState)
  const reseted = useResetRecoilState(selectedSuppliedNameState)

  const append = useCallback(
    (selected: SearchAccountsHandingGoodsResult) => {
      set((prev) => {
        const exist = prev?.id === selected.id
        return exist ? prev : selected
      })
    },
    [set]
  )
  return {
    set,
    reseted,
    append,
  }
}

export function useSelectedSuppliedNameStateValue() {
  return useRecoilValue(selectedSuppliedNameState)
}

// 위에 새로운
export const purchasesProductState = atom<PurchaseProduct>({
  key: 'purchasesProductsState',
  default: {
    accountId: 0,
    id: 0,
    name: '',
    stock: 0,
    unit_price: 0,
    unit_price_discount: 0,
    price: 0,
    price_vat: 0,
    total_price: 0,
  },
})

export type PurchaseProduct = {
  accountId?: number
  id?: number
  name: string
  stock?: number
  unit_price?: number
  unit_price_discount?: number
  price?: number
  price_vat?: number
  total_price?: number
}

export function usePurchasesProductActions() {
  const set = useSetRecoilState(purchasesProductState)
  const reset = useResetRecoilState(purchasesProductState)

  const append = useCallback(
    (selected: PurchaseProduct) => {
      set((prev) => {
        const exists = prev.name === selected.name
        return exists ? prev : selected
      })
    },
    [set]
  )
  return {
    set,
    reset,
    append,
  }
}

export function usePurchasesProductState() {
  return useRecoilState(purchasesProductState)
}

export function useCurrentPruchasesProductState() {
  return useRecoilValue(purchasesProductState)
}

export function useSearchedPurchaseGoodsState() {
  return useRecoilState(searchedPurchaseGoodsState)
}

export function useSearchedHandlingGoodsValue() {
  return useRecoilValue(searchedHandlingGoodsState)
}

export function useSuppliedNameAutocompleteIndex() {
  return useRecoilState(suppliedNameAutocompleteIndex)
}

export function useResetSuppliedNameAutocompleteIndex() {
  return useResetRecoilState(suppliedNameAutocompleteIndex)
}
