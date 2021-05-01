import client from './../client'

export async function addPurchasesProducts(form: AddPurchasesProducts) {
  const response = await client.post<AddPurchasesProducts>(
    'api/purchases/add',
    form
  )
  return response.data
}

type AddPurchasesProducts = {
  accountId: number
  name: string
  quantity: number
  include_vat?: boolean
  unit_price: number
  purchase_price_discount: number
}
