import { atom, useRecoilState } from 'recoil'

export const selectedPurchasedGoodsListState = atom<
  SelectedPurchasedGoodsType[]
>({
  key: 'selectedPurchasedGoodsListState',
  default: [],
})

export type SelectedPurchasedGoodsType = {
  id: number
  supplied_name: string
  include: boolean
  stock: number
  purchase_value: number
  purchase_vat: number
  purchase_price: number
  account: {
    id: number
    name: string
  }
  useStock: number
}

export function useSelectedPurchasedGoodsListState() {
  return useRecoilState(selectedPurchasedGoodsListState)
}
