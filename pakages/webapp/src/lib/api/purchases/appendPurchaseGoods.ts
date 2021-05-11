import { AppendPurchaseGoods } from '../../../hooks/types/Purchase'
import client from './../client'

export default async function appendPurchaseGoods(form: AppendPurchaseGoods) {
  const { data } = await client.post<AppendPurchaseGoods>(
    'api/purchase/append',
    form
  )
  console.log(data)
  return data
}
