import { IAppendSaleGoods } from '../../types/SaleGoods'
import client from '../client'

export default async function createSaleGoods(form: IAppendSaleGoods) {
  const { data } = await client.post<IAppendSaleGoods>(
    'api/saleGoods/create',
    form
  )
  return data
}
