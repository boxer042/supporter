import { atom, useRecoilState, useResetRecoilState } from 'recoil'

export const purchasedGoodsState = atom<PurchasedGoodsRecoilType>({
  key: 'purchasedGoodsState',
  default: {
    id: null,
    supplied_name: '',
    include: true,
    stock: 0,
    purchase_value: 0,
    purchase_vat: 0,
    purchase_price: 0,
    account: {
      id: null,
      name: '',
    },
  },
})

export type PurchasedGoodsRecoilType = {
  id: number | null
  supplied_name: string
  include: boolean
  stock: number
  purchase_value: number
  purchase_vat: number
  purchase_price: number
  account: {
    id: number | null
    name: string
  }
}

export function usePurchasedGoodsRecoilState() {
  return useRecoilState(purchasedGoodsState)
}

export function useResetPurchasedGoodsRecoilState() {
  return useResetRecoilState(purchasedGoodsState)
}

export const saleGoodsState = atom<SaleGoodsRecoilType>({
  key: 'saleGoodsState',
  default: {
    name: '',
    brand: '',
    type: '단일상품',
    apply_purchased_value: 0,
    apply_purchased_vat: 0,
    apply_purchased_price: 0,
    sale_value: 0,
    sale_vat: 0,
    sale_price: 0,
    margin: 0,
    margin_card: 0,
    margin_rate: 0,
    margin_card_rate: 0,
    card_fee: 0,
    purchased_goods: null,
  },
})

export type SaleGoodsRecoilType = {
  name: string
  brand: string
  type: string
  apply_purchased_value: number
  apply_purchased_vat: number
  apply_purchased_price: number
  sale_value: number
  sale_vat: number
  sale_price: number
  margin: number
  margin_card: number
  margin_rate: number
  margin_card_rate: number
  card_fee: number
  purchased_goods: number | null
}

export function useSaleGoodsState() {
  return useRecoilState(saleGoodsState)
}
