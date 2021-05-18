export interface IAppendSaleGoods {
  name: string
  memo: string
  purchased_goods: (number | null)[]
  //   apply_purchased_value: number
  //   apply_purchased_vat: number
  //   apply_purchased_price: number
  //   sale_value: number
  //   sale_vat: number
  //   sale_price: number
  //   margin: number
  //   margin_card: number
  //   margin_rate: number
  //   margin_card_rate: number
  //   card_fee: number
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
