import { css } from '@emotion/react'
import React from 'react'
import { BiChevronRight } from 'react-icons/bi'
import { NavLink } from 'react-router-dom'
import palette from '../../foundations/palette'

export type PurchaseLeftSidebarProps = {}

function PurchaseLeftSidebar({}: PurchaseLeftSidebarProps) {
  return (
    <div css={block}>
      <div css={title}>Purchase Goods</div>
      <div css={itemList}>
        <NavLink to="/workspaces/purchase/list" css={item}>
          <div css={name}>상품 구매 전체보기</div>
          <BiChevronRight />
        </NavLink>
        <NavLink to="/workspaces/purchase/appendgoods" css={item}>
          <div css={name}>상품 구매</div>
          <BiChevronRight />
        </NavLink>
        <div css={item}>
          <div css={name}>상품 주문</div>
          <BiChevronRight />
        </div>
      </div>
      <div css={divider}>
        <hr />
      </div>
      <div css={title}>Purchased Goods</div>
      <div css={itemList}>
        <div css={item}>
          <div css={name}>구매상품 현황</div>
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
  text-decoration: none;
  color: ${palette.base['base']};
  svg {
    margin-top: 3px;
    font-size: 1.0625rem;
  }
  &:hover {
    background: ${palette.grey[200]};
  }
  &.active {
    background: ${palette.grey[300]};
  }
`

const link = css`
  text-decoration: none;
  font-size: 0.875rem;
  font-weight: bold;
  color: #6b6b6b;
  &:hover {
    color: ${palette.grey[900]};
  }
  &.active {
    color: ${palette.grey[900]};
  }
`

const name = css``

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
