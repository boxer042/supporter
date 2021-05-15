import { atom, selector, useRecoilState } from 'recoil'

export const selectedPurchasedGoodsListState = atom<
  SelectedPurchasedGoodsType[]
>({
  key: 'selectedPurchasedGoodsListState',
  default: [],
})

export type SelectedPurchasedGoodsType = {
  id: number
  supplied_name: string
  include: boolean
  stock: number
  purchase_value: number
  purchase_vat: number
  purchase_price: number
  account: {
    id: number
    name: string
  }
  useStock: number
}

export const selectedPurchasedGoodsListStateState = selector({
  key: 'selectedPurchasedGoodsListStateState',
  get: ({ get }) => {
    const list = get(selectedPurchasedGoodsListState)
    const results = list.map((result) => ({
      id: result.id,
      supplied_name: result.supplied_name,
      account: {
        name: result.account.name,
      },
      include: result.include,
      stock: result.stock,
      purchase_value: result.purchase_value,
      useStock: result.useStock,
      cost_value: result.purchase_value * result.useStock,
      cost_vat: result.purchase_value * result.useStock * 0.1,
      cost_price: result.purchase_value * result.useStock * 1.1,
    }))
    const costValue = results.map((result) => result.cost_value)
    const costVat = results.map((result) => result.cost_vat)
    const costPrice = results.map((result) => result.cost_price)
    const costValueSum = costValue.reduce((a, b) => a + b, 0)
    const costVatSum = costVat.reduce((a, b) => a + b, 0)
    const costPriceSum = costPrice.reduce((a, b) => a + b, 0)
    return { results, costValueSum, costVatSum, costPriceSum }
  },
})

export function useSelectedPurchasedGoodsListState() {
  return useRecoilState(selectedPurchasedGoodsListState)
}
