import client from '../../lib/api/client'
import { useQuery } from 'react-query'
import { Purchased } from '../types/Purchase'

async function getPurchased() {
  const { data } = await client.get<Purchased[]>('api/purchase/purchased')
  return data
}

export default function usePurchased() {
  return useQuery(['purchased'], () => getPurchased())
}
