import { css } from '@emotion/react'
import React from 'react'
import palette from '../../foundations/palette'
import PurchaseGoodsAppendFormGroup from './PurchaseGoodsAppendFormGroup'

export type PurchaseGoodsAppendProps = {}

function PurchaseGoodsAppend({}: PurchaseGoodsAppendProps) {
  return (
    <div css={block}>
      <div css={header}>
        <h3 css={title}>Append Purchase Goods</h3>
        <div css={description}>
          데이터는 로컬스토리지에 저장되어 지며, 최종 확인을 눌러 데이터베이스에
          저장해야 합니다.
        </div>
      </div>
      <div css={contents}>
        <PurchaseGoodsAppendFormGroup />
      </div>
      {/* <div css={footer}>Append to PurchaseGoodsList</div> */}
    </div>
  )
}

export default PurchaseGoodsAppend

const block = css`
  position: fixed;
  right: 0;
  width: 24.5rem;
  /* height: calc(100vh - 3rem); */
  height: 100%;
  border-left: 1px solid ${palette.grey[300]};
  display: flex;
  flex-direction: column;
  padding-left: 1rem;
  padding-right: 1rem;
`
const header = css``
const title = css`
  color: ${palette.base['base']};
`

const description = css`
  font-size: 0.75rem;
  color: ${palette.base['dec']};
`

const contents = css`
  margin-top: 1rem;
`
const footer = css``
