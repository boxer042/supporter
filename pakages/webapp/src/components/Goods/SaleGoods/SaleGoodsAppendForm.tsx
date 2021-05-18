import { css } from '@emotion/react'
import React, { useEffect, useState } from 'react'
import PrimaryInput from '../../PrimaryInput/PrimaryInput'
import {
  saleGoodsType,
  useSetSaleGoodsState,
} from './../../../atoms/saleGoodsState'

export type SaleGoodsAppendFormProps = {
  goodsResult: saleGoodsType
  validStockResult: number
}

function SaleGoodsAppendForm({
  goodsResult,
  validStockResult,
}: SaleGoodsAppendFormProps) {
  const setSaleGoods = useSetSaleGoodsState()

  const [name, setName] = useState('')
  const [memo, setMemo] = useState('')
  const [validStock, setValidStock] = useState(0)

  useEffect(() => {
    setSaleGoods({
      ...goodsResult,
      name: name,
      memo: memo,
    })
  }, [name, memo])

  useEffect(() => {
    if (validStockResult === Infinity) {
      return setValidStock(0)
    }
    setValidStock(validStockResult)
  }, [validStockResult])

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target

    switch (name) {
      case 'name':
        setName(value)
        return
      case 'memo':
        setMemo(value)
        return
      default:
        break
    }
  }

  return (
    <div css={block}>
      <h2>상품 기본정보</h2>
      <div css={item}>
        <div css={itemLabel}>상품명</div>
        <PrimaryInput
          css={itemInput}
          name="name"
          value={name}
          onChange={onChange}
          clearButton
        />
      </div>
      <div css={item}>
        <div css={itemLabel}>상품메모</div>
        <PrimaryInput
          css={itemInput}
          name="memo"
          value={memo}
          onChange={onChange}
          clearButton
        />
      </div>
      <div css={item}>
        <div css={itemLabel}>유효재고</div>
        <PrimaryInput
          css={itemInput}
          name="validStock"
          value={validStock}
          readOnly
        />
      </div>
    </div>
  )
}

export default SaleGoodsAppendForm

const block = css``
const item = css`
  & + & {
    margin-top: 1.125rem;
  }
`
const itemLabel = css`
  font-weight: bold;
  margin-bottom: 0.5rem;
`
const itemInput = css``
