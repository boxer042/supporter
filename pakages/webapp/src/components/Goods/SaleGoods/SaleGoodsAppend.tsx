import { css } from '@emotion/react'
import React, { useEffect, useState } from 'react'
import { useRecoilValue } from 'recoil'
import { useSelectedPurchasedGoodsListState } from '../../../atoms/saleGoodsState'
import SelectedPurchasedGoods from './SelectedPurchasedGoods'
import SelectedPurchasedGoodsTable from './SelectedPurchasedGoodsTable'
import { selectedPurchasedGoodsListStateState } from './../../../atoms/saleGoodsState'
import PrimaryInput from '../../PrimaryInput/PrimaryInput'
import SaleGoodsAppendPriceForm from './SaleGoodsAppendPriceForm'

export type SaleGoodsAppendProps = {}

function SaleGoodsAppend({}: SaleGoodsAppendProps) {
  const [purchasedGoodsList, setPurchasedGoodsList] =
    useSelectedPurchasedGoodsListState()
  const { results, costValueSum, costVatSum, costPriceSum } = useRecoilValue(
    selectedPurchasedGoodsListStateState
  )

  useEffect(() => {
    if (!results) {
      return
    }
  }, [results])

  return (
    <div css={block}>
      <h1>판매상품 등록</h1>
      <SelectedPurchasedGoods
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
  )
}

export default SaleGoodsAppend

const block = css`
  padding-left: 1rem;
  padding-right: 1rem;
  display: flex;
  flex-direction: column;
`
