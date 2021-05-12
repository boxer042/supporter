import { css } from '@emotion/react'
import React from 'react'
import usePurchasedGoodsList from '../../hooks/query/usePuchasedGoodsList'

export type PurchasedGoodsListProps = {}

function PurchasedGoodsList({}: PurchasedGoodsListProps) {
  const { status, data, error, isFetching } = usePurchasedGoodsList()
  if (!data) return null
  return (
    <div css={block}>
      <table>
        <tbody>
          {data.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.supplied_name}</td>
              <td>{item.stock}</td>
              <td>{item.supplied_value.toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default PurchasedGoodsList

const block = css`
  display: flex;
  flex-direction: column;
  font-size: 0.75rem;
`
const listStyle = css`
  display: flex;
`
