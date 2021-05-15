import { css } from '@emotion/react'
import React, { useState } from 'react'
import { SetterOrUpdater, useRecoilState, useRecoilValue } from 'recoil'
import { SelectedPurchasedGoodsType } from '../../../atoms/saleGoodsState'
import palette from '../../../foundations/palette'
import { selectedPurchasedGoodsListStateState } from './../../../atoms/saleGoodsState'

export type SelectedPurchasedGoodsTableProps = {
  purchasedGoodsList: SelectedPurchasedGoodsType[]
  setPurchasedGoodsList: SetterOrUpdater<SelectedPurchasedGoodsType[]>
}

function SelectedPurchasedGoodsTable({
  purchasedGoodsList,
  setPurchasedGoodsList,
}: SelectedPurchasedGoodsTableProps) {
  // const [useStock, setUseStock] = useState('')
  const { results, costValueSum, costVatSum, costPriceSum } = useRecoilValue(
    selectedPurchasedGoodsListStateState
  )
  const onChangeUseStock = (value: string, id: number) => {
    const number = parseInt(value.replace(/\$\s?|(,*)/g, ''))
    if (isNaN(number)) {
      setPurchasedGoodsList(
        purchasedGoodsList.map((goods) =>
          goods.id === id ? { ...goods, useStock: 0 } : goods
        )
      )
      return
    }
    setPurchasedGoodsList(
      purchasedGoodsList.map((goods) =>
        goods.id === id ? { ...goods, useStock: number } : goods
      )
    )
  }
  return (
    <div>
      <div css={gridStyle}>
        <div>ID</div>
        <div>상품명</div>
        <div>구매처</div>
        <div>보유재고</div>
        <div>구매단가</div>
        <div>사용수량</div>
        <div>원가</div>
        <div>원가세액</div>
        <div>원가가격</div>
        {results.map((result) => (
          <React.Fragment key={result.id}>
            <div>{result.id}</div>
            <div>{result.supplied_name}</div>
            <div>{result.account.name}</div>
            <div>{result.stock}</div>
            <div>{result.purchase_value.toLocaleString()}</div>
            <input
              value={result.useStock.toLocaleString()}
              onChange={(e) => onChangeUseStock(e.target.value, result.id)}
            />
            <div>{result.cost_value.toLocaleString()}</div>
            <div>{result.cost_vat.toLocaleString()}</div>
            <div>{result.cost_price.toLocaleString()}</div>
          </React.Fragment>
        ))}
        <div css={test}></div>
        <div css={test}></div>
        <div css={test}></div>
        <div></div>
        <div></div>
        <div></div>
        <div>{costValueSum.toLocaleString()}</div>
        <div>{costVatSum.toLocaleString()}</div>
        <div>{costPriceSum.toLocaleString()}</div>
      </div>
    </div>
  )
}

export default SelectedPurchasedGoodsTable

const gridStyle = css`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
  border-top: 1px solid ${palette.base['base']};
  border-right: 1px solid ${palette.base['base']};
  input {
    outline: none;
    width: 100%;
  }
  div {
    border-bottom: 1px solid ${palette.base['base']};
    border-left: 1px solid ${palette.base['base']};
  }
`
const test = css`
  border-bottom: 1px solid red;
`
