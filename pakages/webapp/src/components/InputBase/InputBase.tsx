import { css } from '@emotion/react'
import React from 'react'
import palette from '../../foundations/palette'

export type InputBaseProps = {
  children?: React.ReactNode
  style?: React.CSSProperties
  className?: string
  disabled?: boolean
} & React.HTMLAttributes<HTMLDivElement>

function InputBase(
  { children, style, disabled, className, ...rest }: InputBaseProps,
  ref: React.Ref<HTMLDivElement>
) {
  return (
    <div css={block(disabled)} {...rest} style={style} className={className}>
      {children}
    </div>
  )
}

export default InputBase

const block = (disabled: boolean = false) => css`
  border: ${palette.blueGrey[50]} 1px solid;
  border-radius: 0.5rem;
  background: white;
  height: 2.625rem;
  color: ${palette.blueGrey[700]};
  font-size: 1rem;
  display: flex;

  ${disabled &&
  css`
    background: ${palette.blueGrey[50]};
    cursor: not-allowed;
    color: ${palette.blueGrey[300]};
  `};
`
