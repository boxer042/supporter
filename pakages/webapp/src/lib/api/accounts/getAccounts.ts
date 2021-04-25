import client from '../client'
import { Account } from './types'

export async function getAccounts() {
  const response = await client.get<Account[]>('api/accounts')
  return response.data
}
