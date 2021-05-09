import { Account } from '../types/Account'
import client from './../../lib/api/client'
import { useQuery } from 'react-query'

async function getAccountByKeyword(keyword: string) {
  const { data } = await client.get<Account[]>('api/accounts/search', {
    params: { keyword },
  })
  return data
}

export default function useAccountByKeyword(keyword: string) {
  return useQuery(
    ['searchedAccount', keyword],
    () => getAccountByKeyword(keyword),
    {
      enabled: keyword !== '',
    }
  )
}
