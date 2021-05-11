import { atom, useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'

export const purchaseGoodsState = atom<PurchaseGoodsStateType | null>({
  key: 'purchaseGoods',
  default: null,
})

export type PurchaseGoodsStateType = {
  purchased_at: string
  account_id: number
  supplied_name: string
  include: boolean
  include_vat: boolean
  supplied_value: number
  supplied_vat: number
  supplied_price: number
  supplied_value_discount: number
  quantity: number
  total_supplied_value_discount: number
  purchase_value: number
  purchase_vat: number
  purchase_price: number
  total_purchase_value: number
  total_purchase_vat: number
  total_purchase_price: number
}

export type SelectedGoodsType = {
  supplied_name: string
  include: boolean
  include_vat: boolean
  supplied_value: number
  supplied_vat: number
  supplied_price: number
  supplied_value_discount: number
  stock: number
  account: {
    id: number
    name: string
  }
}

export const selectedGoodsState = atom<SelectedGoodsType | null>({
  key: 'selectedGoodsState',
  default: null,
})

export function usePurchaseGoodsState() {
  return useRecoilState(purchaseGoodsState)
}

export function usePurchaseGoodsSetState() {
  return useSetRecoilState(purchaseGoodsState)
}

export function usePurchaseGoodsValueState() {
  return useRecoilValue(purchaseGoodsState)
}

export function useSelectedGoodsSetState() {
  return useSetRecoilState(selectedGoodsState)
}

export function useSelectedGoodsValueState() {
  return useRecoilValue(selectedGoodsState)
}
