import { css } from '@emotion/react'
import * as React from 'react'
import HeaderNav from './HeaderNav'

export type THeaderProps = {}

export default function Header(props: THeaderProps) {
  return (
    <div css={block}>
      <HeaderNav />
    </div>
  )
}

const block = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
`
