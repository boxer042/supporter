export interface Purchased {
  id: number
  include: boolean
  include_vat: boolean
  quantity: number
  supplied_value: number
  supplied_vat: number
  supplied_price: number
  supplied_value_discount: number
  total_supplied_value_discount: number
  purchase_value: number
  purchase_vat: number
  purchase_price: number
  total_purchase_value: number
  total_purchase_vat: number
  total_purchase_price: number
  purchased_at: string
  created_at: string
  supplied_name: {
    id: number
    supplied_name: string
    account: {
      id: number
      name: string
    }
  }
}

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
  purchase_value: number
  purchase_vat: number
  purchase_price: number
  account: {
    id: number
    name: string
  }
  purchase: PurchasedGoodsPurchase[]
  price_history: PurchasedGoodsPriceHistroy[]
}

export interface AppendPurchaseGoods {
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

export interface PurchasedGoodsPurchase {
  id: number
  include: boolean
  include_vat: boolean
  quantity: number
  supplied_value: number
  supplied_vat: number
  supplied_price: number
  supplied_value_discount: number
  total_supplied_value_discount: number
  purchase_value: number
  purchase_vat: number
  purchase_price: number
  total_purchase_value: number
  total_purchase_vat: number
  total_purchase_price: number
  created_at: string
  purchased_at: string
}

export interface PurchasedGoodsPriceHistroy {
  id: number
  prev_include: boolean
  prev_include_vat: boolean
  change_price_at: string
  prev_supplied_value: number
  prev_supplied_vat: number
  prev_supplied_price: number
  prev_supplied_value_discount: number
  prev_purchase_value: number
  prev_purchase_vat: number
  prev_purchase_price: number
}
