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
  name: string
  office: string
}
