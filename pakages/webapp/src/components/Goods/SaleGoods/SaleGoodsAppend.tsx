import { css } from '@emotion/react'
import React from 'react'
import { useSelectedPurchasedGoodsListState } from '../../../atoms/saleGoodsState'
import SaleGoodsAppendFormGroup from './SelectedPurchasedGoods'
import SelectedPurchasedGoodsTable from './SelectedPurchasedGoodsTable'

export type SaleGoodsAppendProps = {}

function SaleGoodsAppend({}: SaleGoodsAppendProps) {
  const [purchasedGoodsList, setPurchasedGoodsList] =
    useSelectedPurchasedGoodsListState()

  console.log(purchasedGoodsList)
  return (
    <div css={block}>
      SaleGoodsAppend
      <SaleGoodsAppendFormGroup setPurchasedGoodsList={setPurchasedGoodsList} />
      <SelectedPurchasedGoodsTable
        purchasedGoodsList={purchasedGoodsList}
        setPurchasedGoodsList={setPurchasedGoodsList}
      />
    </div>
  )
}

export default SaleGoodsAppend

const block = css`
  padding-left: 1rem;
  padding-right: 1rem;
  display: flex;
  flex-direction: column;
  width: 70%;
`
