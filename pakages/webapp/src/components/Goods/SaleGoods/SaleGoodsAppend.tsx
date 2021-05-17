import { css } from '@emotion/react'
import React, { useEffect, useState } from 'react'
import { useRecoilValue } from 'recoil'
import {
  useGetSaleGoodsSelector,
  useSelectedPurchasedGoodsListState,
} from '../../../atoms/saleGoodsState'
import SelectedPurchasedGoods from './SelectedPurchasedGoods'
import SelectedPurchasedGoodsTable from './SelectedPurchasedGoodsTable'
import { selectedPurchasedGoodsListStateState } from './../../../atoms/saleGoodsState'
import SaleGoodsAppendPriceForm from './SaleGoodsAppendPriceForm'
import SaleGoodsAppendForm from './SaleGoodsAppendForm'
import palette from '../../../foundations/palette'

export type SaleGoodsAppendProps = {}

function SaleGoodsAppend({}: SaleGoodsAppendProps) {
  const [purchasedGoodsList, setPurchasedGoodsList] =
    useSelectedPurchasedGoodsListState()

  const { results, costValueSum, costVatSum, costPriceSum } = useRecoilValue(
    selectedPurchasedGoodsListStateState
  )

  const { goodsResult } = useGetSaleGoodsSelector()

  console.log(goodsResult)
  useEffect(() => {
    if (!results) {
      return
    }
  }, [results])

  return (
    <div css={block}>
      <h1>판매상품 등록</h1>
      <div css={leftBlock}>
        <SaleGoodsAppendForm goodsResult={goodsResult} />
        <div css={divider}>
          <hr />
        </div>
        <SelectedPurchasedGoods
          goodsResult={goodsResult}
          purchasedGoodsList={purchasedGoodsList}
          setPurchasedGoodsList={setPurchasedGoodsList}
        />
        <SelectedPurchasedGoodsTable
          purchasedGoodsList={purchasedGoodsList}
          setPurchasedGoodsList={setPurchasedGoodsList}
        />
        <SaleGoodsAppendPriceForm
          costValueSum={costValueSum}
          costVatSum={costVatSum}
          costPriceSum={costPriceSum}
        />
      </div>
    </div>
  )
}

export default SaleGoodsAppend

const block = css`
  padding-left: 1rem;
  padding-right: 1rem;
  display: flex;
  flex-direction: column;
  width: 100%;
`
const leftBlock = css``
const divider = css`
  margin-top: 2rem;
  margin-bottom: 2rem;
  hr {
    border: unset;
    border-radius: 2px;
    border-top: 1px solid ${palette.grey[300]};
    width: 100%;
    height: 1px;
  }
`
