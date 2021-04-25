import { atom, selector, useRecoilState, useRecoilValue } from 'recoil'
import { PurchaseProduct } from '../lib/api/products/types'

export const productsPurchaseState = atom<PurchaseProduct[]>({
  key: 'productsPurchaseState',
  default: [],
})

export const testLength = selector({
  key: 'testLength',
  get: ({ get }) => {
    const text = get(productsPurchaseState)
    return text.length
  },
})

export function useProductsPurchaseState() {
  return useRecoilState(productsPurchaseState)
}
