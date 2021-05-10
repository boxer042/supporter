import { atom, useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'

export const purchaseGoodsState = atom<PurchaseGoodsStateType | null>({
  key: 'purchaseGoods',
  default: null,
})

export type PurchaseGoodsStateType = {
  account_id?: number
  supplied_name?: string
}

export type SelectedGoodsType = {
  supplied_name: string
  include: boolean
  supplied_value: number
  supplied_value_discount: number
  stock: number
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
