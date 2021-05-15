import { css } from '@emotion/react'
import React, { useState } from 'react'
import { SetterOrUpdater } from 'recoil'
import { SelectedPurchasedGoodsType } from '../../../atoms/saleGoodsState'
import palette from '../../../foundations/palette'

export type SelectedPurchasedGoodsTableProps = {
  purchasedGoodsList: SelectedPurchasedGoodsType[]
  setPurchasedGoodsList: SetterOrUpdater<SelectedPurchasedGoodsType[]>
}

function SelectedPurchasedGoodsTable({
  purchasedGoodsList,
}: SelectedPurchasedGoodsTableProps) {
  const [useStock, setUseStock] = useState('')

  const onChangeUseStock = (value: string, id: number) => {
    const purchasedGoodsId = purchasedGoodsList.find((pg) => pg.id === id)

    console.log(value)
  }
  return (
    <div>
      <div css={gridStyle}>
        <div>ID</div>
        <div>상품명</div>
        <div>구매처</div>
        <div>보유재고</div>
        <div>구매가액</div>
        <div>구매세액</div>
        <div>구매가격</div>
        <div>사용수량</div>
        {purchasedGoodsList.map((result) => (
          <>
            <div>{result.id}</div>
            <div>{result.supplied_name}</div>
            <div>{result.account.name}</div>
            <div>{result.stock}</div>
            <div>{result.purchase_value.toLocaleString()}</div>
            <div>{result.purchase_vat.toLocaleString()}</div>
            <div>{result.purchase_price.toLocaleString()}</div>
            <input
              value={result.useStock}
              onChange={(e) => onChangeUseStock(e.target.value, result.id)}
            />
          </>
        ))}
      </div>
    </div>
  )
}

export default SelectedPurchasedGoodsTable

const gridStyle = css`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
  border-top: 1px solid ${palette.base['base']};
`
