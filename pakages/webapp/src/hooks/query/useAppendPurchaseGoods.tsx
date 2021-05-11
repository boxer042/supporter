import { AppendPurchaseGoods } from '../types/Purchase'
import client from './../../lib/api/client'
import { useMutation, useQuery } from 'react-query'

// export async function appendPurchaseGoods(form: AppendPurchaseGoods) {
//   const { data } = await client.post<AppendPurchaseGoods>(
//     'api/purchase/append',
//     form
//   )
//   return data
// }

// export default function useAppendPurchaseGoods() {
//   return useMutation(appendPurchaseGoods, {
//     onSuccess: (data) => {
//       console.log(data)
//       alert('성공')
//     },
//   })
// }
export default async function appendPurchaseGoods(form: AppendPurchaseGoods) {
  const { data } = await client.post<AppendPurchaseGoods>(
    'api/purchase/append',
    form
  )
  return data
}
