import { css } from '@emotion/react'
import React from 'react'
import { BiChevronRight } from 'react-icons/bi'
import palette from '../../foundations/palette'

export type PurchaseLeftSidebarProps = {}

function PurchaseLeftSidebar({}: PurchaseLeftSidebarProps) {
  return (
    <div css={block}>
      <div css={title}>Purchase Goods</div>
      <div css={itemList}>
        <div css={item}>
          <div css={name}>구매 상품 전체보기</div>
          <BiChevronRight />
        </div>
        <div css={item}>
          <div css={name}>상품 구매</div>
          <BiChevronRight />
        </div>
        <div css={item}>
          <div css={name}>상품 주문</div>
          <BiChevronRight />
        </div>
      </div>
    </div>
  )
}

export default PurchaseLeftSidebar

const block = css`
  display: flex;
  flex-direction: column;
  width: 100%;
  color: ${palette.base['base']};
`

const title = css`
  font-size: 0.875rem;
  font-weight: bold;
  padding-left: 1rem;
  padding-right: 1rem;
`

const itemList = css`
  margin-top: 0.5rem;
`

const item = css`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  height: 1.75rem;
  padding-left: 1rem;
  padding-right: 1rem;
  svg {
    margin-top: 3px;
    font-size: 1.0625rem;
  }
  &:hover {
    background: ${palette.grey[200]};
  }
`

const name = css``
