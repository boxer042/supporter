export interface IAppendSaleGoods {
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

export interface IPurchasedGoodsPurchase {
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
    office: string
    fax: string
    phone: string
  }
  useStock: number
}

export interface ISaleGoodsList {
  id: number
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
  purchased_goods: {
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
  }
}
