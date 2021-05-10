import client from './../../lib/api/client'
import { useQuery } from 'react-query'
import { PurchaseGoods } from '../types/Purchase'

async function getPurchaseGoodsByKeyword(keyword: string) {
  const { data } = await client.get<PurchaseGoods[]>('api/purchase/search', {
    params: { keyword },
  })
  return data
}

export default function usePurchaseGoodsByKeyword(keyword: string) {
  return useQuery(
    ['searchedPurchaseGoods', keyword],
    () => getPurchaseGoodsByKeyword(keyword),
    {
      enabled: keyword !== '',
    }
  )
}
