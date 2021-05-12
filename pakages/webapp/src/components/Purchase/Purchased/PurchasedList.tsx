import React from 'react'
import { Purchased } from '../../../hooks/types/Purchase'
import moment from 'moment'
import { css } from '@emotion/react'
import palette from '../../../foundations/palette'
export type PurchasedListProps = {
  results: Purchased[] | undefined
}

function PurchasedList({ results }: PurchasedListProps) {
  return (
    <div css={block}>
      <table css={table}>
        <thead>
          <tr>
            <th>구매일</th>
            <th>거래처명</th>
            <th>상품명</th>
            <th css={numberTable}>수량</th>
            <th css={numberTable}>단가</th>
            <th css={numberTable}>할인</th>
            <th css={numberTable}>구매가</th>
            <th css={numberTable}>구매가액</th>
            <th css={numberTable}>구매세액</th>
            <th css={numberTable}>합계</th>
          </tr>
        </thead>
        <tbody>
          {results?.map((result) => (
            <tr key={result.id}>
              <td>{moment(result.purchased_at).format('YY-MM-DD')}</td>
              <td>{result.supplied_name.account.name}</td>
              <td>{result.supplied_name.supplied_name}</td>
              <td css={numberTable}>{result.quantity}</td>
              <td css={numberTable}>
                {result.supplied_value.toLocaleString()}
              </td>
              <td css={numberTable}>
                {result.supplied_value_discount.toLocaleString()}
              </td>
              <td css={numberTable}>
                {result.purchase_value.toLocaleString()}
              </td>
              <td css={numberTable}>
                {result.total_purchase_value.toLocaleString()}
              </td>
              <td css={numberTable}>
                {result.total_purchase_vat.toLocaleString()}
              </td>
              <td css={numberTable}>
                {result.total_purchase_price.toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default PurchasedList

const block = css`
  color: ${palette.base['base']};
  font-size: 0.75rem;
`
const table = css`
  border-collapse: collapse;
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
`
const numberTable = css`
  text-align: right;
`
