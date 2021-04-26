import React from 'react'
import { css } from '@emotion/react'
import palette from '../../foundations/palette'
import { NavLink } from 'react-router-dom'

export type ProductsSidebarProps = {}

function ProductsSidebar({}: ProductsSidebarProps) {
  return (
    <div css={block}>
      <NavLink to="/product">상품</NavLink>
      <NavLink to="/product/purchase">구매 상품</NavLink>
      <div>판매 상품</div>
    </div>
  )
}

export default ProductsSidebar

const block = css`
  height: calc(100vh - 4rem);
  border-right: 1px solid ${palette.grey[300]};
  padding-top: 3rem;
  padding-left: 2rem;
  padding-right: 2rem;
  display: flex;
  flex-direction: column;
`
