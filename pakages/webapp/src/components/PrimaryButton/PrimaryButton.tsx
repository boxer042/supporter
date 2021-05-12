import { css } from '@emotion/react'
import React from 'react'

export type PrimaryButtonProps = {
  children: React.ReactNode
  onClick?: () => void
}

function PrimaryButton({ children, onClick }: PrimaryButtonProps) {
  return (
    <button css={block} onClick={onClick}>
      {children}
    </button>
  )
}

export default PrimaryButton

const block = css`
  & + & {
    margin-left: 0.5rem;
  }
`
