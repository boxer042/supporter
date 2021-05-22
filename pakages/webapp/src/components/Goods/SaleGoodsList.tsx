import { css } from '@emotion/react'
import React, { useEffect, useState } from 'react'
import palette from '../../foundations/palette'
import useSaleGoodsList from '../../hooks/query/saleGoods/useSaleGoodsList'

export type SaleGoodsListProps = {}

function SaleGoodsList({}: SaleGoodsListProps) {
  const { data } = useSaleGoodsList()
  useEffect(() => {}, [])
  if (!data) return null
  return (
    <div css={block}>
      <h1>판매 상품</h1>
      <div>
        {data.map((item) => (
          <div css={itemList} key={item.id}>
            <div css={saleGoodsId}>{item.id}</div>
            <div css={saleGoodsName}>
              <div>{item.name}</div>
              <div>{item.purchased_goods.supplied_name}</div>
            </div>
            <div css={saleGoodsBrand}>{item.brand}</div>
            <div css={saleGoodsValueAndVat}>
              <div>{item.sale_value.toLocaleString()}</div>
              <div>{item.sale_vat.toLocaleString()}</div>
            </div>
            <div css={saleGoodsPrice}>{item.sale_price.toLocaleString()}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default SaleGoodsList

const block = css`
  padding-left: 1rem;
  padding-right: 1rem;
  width: 70%;
`

const itemList = css`
  display: flex;
  align-items: center;
  border-radius: 5px;
  border: 1px solid ${palette.base['line']};
  padding: 0.75rem;
  & + & {
    margin-top: 1rem;
  }
`
const saleGoodsId = css`
  width: 1.25rem;
`
const saleGoodsName = css`
  min-width: 15rem;
`
const saleGoodsBrand = css`
  min-width: 5rem;
`
const saleGoodsValueAndVat = css`
  text-align: right;
`
const saleGoodsPrice = css`
  text-align: right;
`
