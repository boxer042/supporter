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
  thumbnail: string
  name: string
  office: string
  metadata?: {
    address?: string
  }
}
