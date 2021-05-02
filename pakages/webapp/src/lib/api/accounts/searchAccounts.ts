import client from '../client'

export async function searchAccounts(keyword: string) {
  const response = await client.get<SearchAccountsResult[]>(
    '/api/accounts/search',
    {
      params: {
        keyword,
      },
    }
  )
  return response.data
}

export type SearchAccountsResult = {
  id: number
  thumbnail?: string
  name: string
  office: string
  metadata?: {
    address?: string
  }
  handling_goods?: SearchAccountsHandingGoodsResult[]
}

export type SearchAccountsHandingGoodsResult = {
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
