import { searchPurchasesProducts } from '../../lib/api/purchases/searchPurchasesProducts'
import { QueryOptionsOf } from '../../lib/utils/types'
import { useQuery } from 'react-query'

export type useSearchPurchasesProductsQueryProps = {}

export default function useSearchPurchasesProductsQuery(
  keyword: string,
  options: QueryOptionsOf<typeof searchPurchasesProducts> = {}
) {
  return useQuery(
    createKey(keyword),
    () => searchPurchasesProducts(keyword),
    options
  )
}

const createKey = (keyword: string) => ['search_purchases_products', keyword]
useSearchPurchasesProductsQuery.createKey = createKey
