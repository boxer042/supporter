import client from '../client'

export async function searchPurchasesProducts(keyword: string) {
  const response = await client.get<SearchPurchasesProductsResult[]>(
    '/api/purchase/search',
    {
      params: {
        keyword,
      },
    }
  )

  return response.data
}

export type SearchPurchasesProductsResult = {
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
  account: {
    id: number
    thumbnail?: string
    name: string
    office: string
    metadata?: {
      address?: string
    }
  }
}
