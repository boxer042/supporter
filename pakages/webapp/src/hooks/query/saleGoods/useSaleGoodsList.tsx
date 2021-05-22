import client from '../../../lib/api/client'
import { useQuery } from 'react-query'
import { ISaleGoodsList } from './../../../lib/types/SaleGoods'

async function getSaleGoodsList() {
  const { data } = await client.get<ISaleGoodsList[]>('api/saleGoods')
  return data
}

export default function useSaleGoodsList() {
  return useQuery(['saleGoodsList'], () => getSaleGoodsList())
}
