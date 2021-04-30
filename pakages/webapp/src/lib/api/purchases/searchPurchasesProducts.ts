import client from '../client'

export async function searchPurchasesProducts(keyword: string) {
  const response = await client.get<SearchPurchasesProductsResult[]>(
    '/api/purchases/search',
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
  name: string
  stock: number
  unit_price: number
  unit_price_vat: number
  unit_price_discount: number
  price: number
  price_vat: number
  total_price: number
}
