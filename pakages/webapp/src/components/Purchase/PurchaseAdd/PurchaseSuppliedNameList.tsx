import React from 'react'
import { css } from '@emotion/react'
import palette from '../../../foundations/palette'

type PuchaseSuppliedNameListProps = {
  index: number
  goodsId: number | null
  suppliedName: string
  include: boolean
  stock: number
  suppliedValue: number
  suppliedVat: number
  suppliedPrice: number
  suppliedVauleDiscount: number
  purchaseValue: number
  purchaseVat: number
  purchasePrice: number
}
export default function PuchaseSuppliedNameList({
  index,
  goodsId,
  include,
  stock,
  suppliedName,
  suppliedValue,
  suppliedVat,
  suppliedPrice,
  suppliedVauleDiscount,
  purchaseValue,
  purchaseVat,
  purchasePrice,
}: PuchaseSuppliedNameListProps) {
  return (
    <div css={item}>
      <span>{goodsId}</span>
      <span>{suppliedName}</span>
      <span>{include === true ? 'true' : 'false'}</span>
      <span>{stock}</span>
    </div>
  )
}

const item = css`
  span {
    margin-left: 0.5rem;
  }
`
