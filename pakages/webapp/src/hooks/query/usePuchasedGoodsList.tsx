import { PurchaseGoods } from '../types/Purchase'
import client from './../../lib/api/client'
import { useQuery } from 'react-query'

async function getPurchasedGoodsList() {
  const { data } = await client.get<PurchaseGoods[]>(
    'api/purchase/purchasedGoods'
  )
  return data
}

export default function usePurchasedGoodsList() {
  return useQuery(['purchasedGoodsList'], () => getPurchasedGoodsList())
}
