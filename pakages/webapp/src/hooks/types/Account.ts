export interface Account {
  id: number
  thumbnail?: string
  name: string
  office: string | null
  metadata?: AccountMetadata
  handling_goods: AccountHandingGoods[] | null
}

export interface AccountMetadata {
  id?: number
  crn?: string | null
  representatives?: string | null
  address?: string | null
  category?: string | null
  category_type?: string | null
}

export interface AccountHandingGoods {
  id: number
  supplied_name: string
  include: boolean
  stock: number
  supplied_value: number
  supplied_vat: number
  supplied_price: number
  supplied_value_discount: number
  purchase_value: number
  purchase_vat: number
  purchase_price: number
}
