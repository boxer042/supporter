export interface PurchaseGoods {
  id: number
  supplied_name: string
  include: boolean
  include_vat: boolean
  stock: number
  supplied_value: number
  supplied_vat: number
  supplied_price: number
  supplied_value_discount: number
  account: {
    id: number
    name: string
  }
}

export interface AppendPurchaseGoods {
  purchased_at: string
  account_id: number
  supplied_name: string
  include: boolean
  include_vat: boolean
  quantity: number
  supplied_value: number
  supplied_value_discount: number
}
