import { css } from '@emotion/react'
import React, { useEffect, useState } from 'react'
import { useRecoilValue } from 'recoil'
import {
  useGetSaleGoodsSelector,
  useSelectedPurchasedGoodsListState,
  useSetSaleGoodsState,
} from '../../../atoms/saleGoodsState'
import SelectedPurchasedGoods from './SelectedPurchasedGoods'
import SelectedPurchasedGoodsTable from './SelectedPurchasedGoodsTable'
import { selectedPurchasedGoodsListStateState } from './../../../atoms/saleGoodsState'
import SaleGoodsAppendPriceForm from './SaleGoodsAppendPriceForm'
import SaleGoodsAppendForm from './SaleGoodsAppendForm'
import palette from '../../../foundations/palette'
import PrimaryButton from '../../PrimaryButton/PrimaryButton'
import createSaleGoods from '../../../lib/api/goods/createSaleGoods'

export type SaleGoodsAppendProps = {}

function SaleGoodsAppend({}: SaleGoodsAppendProps) {
  const [purchasedGoodsList, setPurchasedGoodsList] =
    useSelectedPurchasedGoodsListState()

  const { results, costValueSum, costVatSum, costPriceSum, validStockResult } =
    useRecoilValue(selectedPurchasedGoodsListStateState)

  const { goodsResult } = useGetSaleGoodsSelector()
  const setSaleGoods = useSetSaleGoodsState()

  const onClickSave = () => {
    console.log(goodsResult)
    const purchasedId = goodsResult.purchased_goods.map((result) => result.id)
    createSaleGoods({
      name: goodsResult.name,
      memo: goodsResult.memo,
      purchased_goods: purchasedId,
    })
  }

  return (
    <div css={block}>
      <h1>상품 등록</h1>
      <div css={leftBlock}>
        <SaleGoodsAppendForm
          goodsResult={goodsResult}
          validStockResult={validStockResult}
        />
        <div css={divider}>
          <hr />
        </div>
        <SelectedPurchasedGoods
          goodsResult={goodsResult}
          purchasedGoodsList={purchasedGoodsList}
          setPurchasedGoodsList={setPurchasedGoodsList}
        />
        <SelectedPurchasedGoodsTable
          goodsResult={goodsResult}
          purchasedGoodsList={purchasedGoodsList}
          setPurchasedGoodsList={setPurchasedGoodsList}
        />
        <SaleGoodsAppendPriceForm
          costValueSum={costValueSum}
          costVatSum={costVatSum}
          costPriceSum={costPriceSum}
          goodsResult={goodsResult}
          setSaleGoods={setSaleGoods}
        />
      </div>
      <PrimaryButton onClick={onClickSave}>추가</PrimaryButton>
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
