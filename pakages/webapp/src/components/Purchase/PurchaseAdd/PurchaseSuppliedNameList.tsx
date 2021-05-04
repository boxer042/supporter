import React from 'react'
import { css } from '@emotion/react'
import palette from '../../../foundations/palette'
import { useSuppliedNameAutocompleteIndex } from '../../../atoms/purchasesState'

type PuchaseSuppliedNameListProps = {
  index: number
  selected: boolean
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
  selected,
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
  const [, setSelectedIndex] = useSuppliedNameAutocompleteIndex()

  const onMouseEnter = () => {
    setSelectedIndex(index)
  }

  return (
    <div
      css={item(selected)}
      data-type="suppliedName-item"
      onMouseEnter={onMouseEnter}
    >
      <span>{goodsId}</span>
      <span>{suppliedName}</span>
      <span>{include === true ? 'true' : 'false'}</span>
      <span>{stock}</span>
    </div>
  )
}

const item = (selected: boolean) => css`
  cursor: pointer;
  height: 2.25rem;
  padding-left: 1rem;
  padding-right: 1rem;
  display: flex;
  align-items: center;
  span {
    margin-left: 0.5rem;
  }

  ${selected &&
  css`
    background: ${palette.cyan[100]};
  `}
`
