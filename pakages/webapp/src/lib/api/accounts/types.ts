export type Account = {
  id?: number
  name: string
  office: string | null
  fax: string | null
  phone: string | null
  metadata?: Metadata | null
  handling_products?: HandlingProducts[] | null
}

export type Metadata = {
  id: number
  crn: string
  representatives: string
  address: string
  category: string
  category_type: string
}

export type HandlingProducts = {
  id: number
  name: string
  unit_price: number
  unit_price_discount: number
  price: number
  price_vat: number
  total_price: number
}
