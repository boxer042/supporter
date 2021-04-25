import React from 'react'
import { NavLink } from 'react-router-dom'
import { IconsType } from './../Icons/Icons'
import { css } from '@emotion/react'
import palette from '../../foundations/palette'

export type FooterItemprops = {
  icon?: IconsType
  reactIcon?: Object
  text: string
  to: string
}

function FooterItem({ icon, text, to, reactIcon }: FooterItemprops) {
  return (
    <div css={itemStyle}>
      <NavLink css={linkStyle} to={to} exact>
        {reactIcon}
        <span>{text}</span>
      </NavLink>
    </div>
  )
}

const itemStyle = css`
  display: flex;
`

const linkStyle = css`
  color: ${palette.blueGrey[400]};
  display: flex;
  flex-direction: column;
  width: 5rem;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  svg {
    font-size: 1.5rem;
  }
  span {
    margin-top: 0.2rem;
    font-size: 0.75rem;
  }
  &.active {
    color: ${palette.blueGrey[900]};
  }
`

export default FooterItem
