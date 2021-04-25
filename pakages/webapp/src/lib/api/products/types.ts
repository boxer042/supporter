import { Account } from '../accounts/types'

export type PurchaseProduct = {
  id: number
  name: string
  created_at: string
  updated_at: string
  stock: number
  unit_price: number
  unit_price_discount: number
  price: number
  price_vat: number
  total_price: number
  account: Account
}
