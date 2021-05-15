import { css } from '@emotion/react'
import * as React from 'react'
import { BiListMinus, BiListPlus, BiPackage, BiPoll } from 'react-icons/bi'
import { NavLink } from 'react-router-dom'
import palette from '../../foundations/palette'

export type TWorkspacesNavProps = {}

export default function WorkspacesNav(props: TWorkspacesNavProps) {
  return (
    <div css={block}>
      <NavLink css={item} to="/workspaces" exact>
        <BiPoll css={icon} />
        <div css={name}>모니터링</div>
      </NavLink>
      <NavLink css={item} to="/workspaces/purchase">
        <BiListMinus css={icon} />
        <div css={name}>구매</div>
      </NavLink>
      <NavLink css={item} to="/workspaces" exact>
        <BiListPlus css={icon} />
        <div css={name}>판매</div>
      </NavLink>
      <NavLink css={item} to="/workspaces/goods">
        <BiPackage css={icon} />
        <div css={name}>상품</div>
      </NavLink>
    </div>
  )
}

const block = css`
  display: flex;
  align-items: center;
  flex-direction: column;
`
const item = css`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 5rem;
  height: 3.75rem;
  cursor: pointer;
  color: ${palette.base['base']};
  text-decoration: none;

  &:hover {
    background: ${palette.grey[200]};
  }

  &.active {
    background: ${palette.grey[300]};
  }
  &.active::before {
    content: '';
    position: absolute;
    left: 0;
    height: 3.75rem;
    width: 2px;
    background: ${palette.blue[400]};
  }
`

const icon = css`
  font-size: 1.25rem;
`
const name = css`
  font-size: 0.75rem;
`
