export interface PurchaseGoods {
  id: number
  supplied_name: string
  include: true
  stock: number
  supplied_value: number
  supplied_value_discount: number
  account: {
    id: number
    name: string
  }
}
