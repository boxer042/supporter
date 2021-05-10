import { css } from '@emotion/react'
import React from 'react'
import { usePurchaseGoodsValueState } from '../../atoms/purchaseState'
import PurchaseGoodsAppend from '../../components/Purchase/PurchaseGoodsAppend'
import PurchaseLeftSidebar from '../../components/Purchase/PurchaseLeftSidebar'
import palette from '../../foundations/palette'

export type PurchaseProps = {}

function Purchase({}: PurchaseProps) {
  const purchaseGoods = usePurchaseGoodsValueState()
  return (
    <div css={block}>
      <div css={leftSide}>
        <PurchaseLeftSidebar />
        <div css={divider}>
          <hr />
        </div>
      </div>
      <div css={contents}>
        <PurchaseGoodsAppend />
        <div>
          <div>{purchaseGoods?.account_id}</div>
          <div>{purchaseGoods?.supplied_name}</div>
        </div>
      </div>
    </div>
  )
}

export default Purchase

const block = css``

const leftSide = css`
  position: fixed;
  width: 18.75rem;
  left: 5rem;
  height: 100%;
  background: ${palette.grey[50]};
  border-right: 1px solid ${palette.grey[300]};
  overflow-y: auto;
  padding-top: 1rem;

  font-size: 0.75rem;
`
const divider = css`
  padding-left: 1rem;
  padding-right: 1rem;
  margin-top: 1.125rem;
  margin-bottom: 1.125rem;
  hr {
    border: unset;
    border-radius: 2px;
    border-top: 1px solid ${palette.grey[300]};
    width: 100%;
    height: 1px;
  }
`

const contents = css`
  padding-left: 18.75rem;
  display: flex;
`
