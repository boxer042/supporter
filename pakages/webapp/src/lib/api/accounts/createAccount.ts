import client from '../client'
import { Account } from './types'

export async function createAccount(form: any) {
  const response = await client.post<Account>('api/accounts/create', form)
  return response.data
}
