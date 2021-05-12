import { css } from '@emotion/react'
import * as React from 'react'
import { NavLink } from 'react-router-dom'
import palette from '../../foundations/palette'

type THeaderNavProps = {}

export default function HeaderNav(props: THeaderNavProps) {
  return (
    <div css={block}>
      <div css={item}>
        <NavLink css={link} to="/" exact>
          Home
        </NavLink>
      </div>
      <div css={item}>
        <NavLink css={link} to="/workspaces">
          Workspaces
        </NavLink>
      </div>
      <div css={item}>
        <NavLink css={link} to="/reports" exact>
          Reports
        </NavLink>
      </div>
      <div css={item}>
        <NavLink css={link} to="/sales" exact>
          Sales
        </NavLink>
      </div>
    </div>
  )
}

const block = css`
  display: flex;
  flex-direction: row;
`

const item = css`
  padding: 1rem;
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
