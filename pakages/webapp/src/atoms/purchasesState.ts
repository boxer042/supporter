import { useCallback } from 'react'
import {
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
  useResetRecoilState,
  useSetRecoilState,
} from 'recoil'
import { selectedAccountsState } from './selectedAccountsState'

export const searchedPurchaseGoodsState = atom({
  key: 'searchedPurchaseGoodsState',
  default: '',
})

export const searchedHandlingGoodsState = selector({
  key: 'searchedHandlingGoodsState',
  get: ({ get }) => {
    const list = get(selectedAccountsState)
    const search = get(searchedPurchaseGoodsState)

    if (search.length > 0) {
      return list.handling_goods?.filter((item) =>
        item.supplied_name.includes(search)
      )
    }

    return list.handling_goods
  },
})

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
