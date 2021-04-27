import client from '../client'
import { Metadata } from './types'

export async function addMetadata(form: Metadata) {
  const response = await client.post<Metadata>(
    'api/accounts/metadata/add',
    form
  )
  return response.data
}
