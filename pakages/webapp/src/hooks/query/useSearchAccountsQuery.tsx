import { useQuery } from 'react-query'
import { searchAccounts } from '../../lib/api/accounts/searchAccounts'
import { QueryOptionsOf } from '../../lib/utils/types'

export default function useSearchAccountsQuery(
  keyword: string,
  options: QueryOptionsOf<typeof searchAccounts> = {}
) {
  return useQuery(createKey(keyword), () => searchAccounts(keyword), options)
}

const createKey = (keyword: string) => ['search_accounts', keyword]
useSearchAccountsQuery.createKey = createKey
