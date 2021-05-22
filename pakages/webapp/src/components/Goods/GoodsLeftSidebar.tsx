import { css } from '@emotion/react'
import React from 'react'
import { NavLink } from 'react-router-dom'
import palette from '../../foundations/palette'

export type GoodsLeftSidebarProps = {}

function GoodsLeftSidebar({}: GoodsLeftSidebarProps) {
  return (
    <div css={block}>
      <NavLink to="/workspaces/goods">dashboard</NavLink>
      <NavLink to="/workspaces/goods/saleGoods">판매상품</NavLink>
      <NavLink to="/workspaces/goods/salegoods/append">판매상품 추가</NavLink>
      <NavLink to="/workspaces/goods/salegoods/create">판매상품 생성</NavLink>
      <NavLink to="/workspaces/goods/purchasedgoods">매입상품</NavLink>
    </div>
  )
}

export default GoodsLeftSidebar

const block = css`
  display: flex;
  flex-direction: column;
  width: 100%;
  color: ${palette.base['base']};
`
