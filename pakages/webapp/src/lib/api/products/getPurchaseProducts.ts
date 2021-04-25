import client from '../client'
import { PurchaseProduct } from './types'

export async function getPurchaseProducts() {
  const response = await client.get<PurchaseProduct[]>('api/purchases/products')
  return response.data
}
