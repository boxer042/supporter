import { css } from '@emotion/react'
import React, { useEffect, useState } from 'react'
import { useRecoilValue } from 'recoil'
import { useSelectedPurchasedGoodsListState } from '../../../atoms/saleGoodsState'
import SaleGoodsAppendFormGroup from './SelectedPurchasedGoods'
import SelectedPurchasedGoodsTable from './SelectedPurchasedGoodsTable'
import { selectedPurchasedGoodsListStateState } from './../../../atoms/saleGoodsState'
import PrimaryInput from '../../PrimaryInput/PrimaryInput'

export type SaleGoodsAppendProps = {}

function SaleGoodsAppend({}: SaleGoodsAppendProps) {
  const [
    purchasedGoodsList,
    setPurchasedGoodsList,
  ] = useSelectedPurchasedGoodsListState()
  const { results, costValueSum, costVatSum, costPriceSum } = useRecoilValue(
    selectedPurchasedGoodsListStateState
  )
  const [recentPrice, setRecentPrice] = useState('0')
  const [applyPrice, setApplyPrice] = useState('0')
  useEffect(() => {
    if (!results) {
      return
    }
    setRecentPrice(costPriceSum.toLocaleString())
  }, [results])

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    const number = parseInt(value.replace(/\$\s?|(,*)/g, ''))
    console.log(value)
    setRecentPrice(number.toLocaleString())
  }
  return (
    <div css={block}>
      SaleGoodsAppend
      <div>
        <div>
          <div>최근 단가</div>
          <PrimaryInput value={recentPrice} onChange={onChange} />
        </div>
      </div>
      <div>적용 단가</div>
      <PrimaryInput value={applyPrice} />
      <SaleGoodsAppendFormGroup
        purchasedGoodsList={purchasedGoodsList}
        setPurchasedGoodsList={setPurchasedGoodsList}
      />
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
