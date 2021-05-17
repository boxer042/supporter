import {
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
  useSetRecoilState,
} from 'recoil'

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

export function useSelectedPurchasedGoodsListState() {
  return useRecoilState(selectedPurchasedGoodsListState)
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

export const saleGoodsState = atom<saleGoodsType>({
  key: 'saleGoodsState',
  default: {
    id: null,
    name: '',
    memo: '',
    purchased_goods: [],
  },
})

export type saleGoodsType = {
  id?: number | null
  name: string
  memo: string
  purchased_goods: {
    id: number | null
    supplied_name: string
  }[]

  //   apply_purchased_value: number
  //   apply_purchased_vat: number
  //   apply_purchased_price: number
  //   sale_value: number
  //   sale_vat: number
  //   sale_price: number
  //   margin: number
  //   margin_card: number
  //   margin_rate: number
  //   margin_card_rate: number
  //   card_fee: number
}

export const saleGoodsSelector = selector({
  key: 'saleGoodsSelector',
  get: ({ get }) => {
    const goodsResult = get(saleGoodsState)
    return { goodsResult }
  },
  //  \\ set: ({ set }, newValue) => {},
})

export function useGetSaleGoodsSelector() {
  return useRecoilValue(saleGoodsSelector)
}

export function useSetSaleGoodsState() {
  return useSetRecoilState(saleGoodsState)
}
