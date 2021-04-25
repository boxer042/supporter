import client from '../client'
import { Account } from './types'

export async function getAccount(id: number | null) {
  const response = await client.get<Account>(`api/accounts/${id}`)
  return response.data
}
