import { css } from '@emotion/react'
import React, { useState } from 'react'
import { BiTrash, BiTrashAlt } from 'react-icons/bi'
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
    <table css={tableStyle}>
      <thead>
        <tr>
          <th>상품ID</th>
          <th>상품명</th>
          <th>구매처</th>
          <th>보유재고</th>
          <th>구매단가</th>
          <th>사용 수량</th>
          <th>사용 원가</th>
          <th>사용 세액</th>
          <th>사용 합계</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {results.map((result) => (
          <tr key={result.id}>
            <td>{result.id}</td>
            <td>{result.supplied_name}</td>
            <td>{result.account.name}</td>
            <td>{result.stock}</td>
            <td>{result.purchase_value.toLocaleString()}</td>
            <td>
              <input
                value={result.useStock.toLocaleString()}
                onChange={(e) => onChangeUseStock(e.target.value, result.id)}
              />
            </td>
            <td>{result.cost_value.toLocaleString()}</td>
            <td>{result.cost_vat.toLocaleString()}</td>
            <td>{result.cost_price.toLocaleString()}</td>
            <td>
              <BiTrashAlt />
            </td>
          </tr>
        ))}
      </tbody>
      <tfoot>
        <tr>
          <td colSpan={6}>합계</td>

          <td>{costValueSum.toLocaleString()}</td>
          <td>{costVatSum.toLocaleString()}</td>
          <td>{costPriceSum.toLocaleString()}</td>
          <td></td>
        </tr>
      </tfoot>
    </table>
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

const tableStyle = css`
  margin-top: 0.5rem;
  border-collapse: collapse;
  text-align: center;
  td,
  th {
    height: 2.25rem;
    padding: 0 0.5rem;
  }
  thead {
    border-bottom: 1px solid ${palette.base['line']};
  }
  tbody tr {
    border-bottom: 1px solid ${palette.base['line']};
  }
  tfoot {
    border-bottom: 1px solid ${palette.base['line']};
  }
  input {
    width: 3rem;
    background: none;
    border: none;
    text-align: center;
    font-size: 0.75rem;
    margin-top: 3px;
  }
`
