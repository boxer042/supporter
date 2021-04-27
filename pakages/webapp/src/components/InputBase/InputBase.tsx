import { css } from '@emotion/react'
import React from 'react'
import palette from '../../foundations/palette'

export type InputBaseProps = {
  children?: React.ReactNode
  style?: React.CSSProperties
} & React.HTMLAttributes<HTMLDivElement>

function InputBase({ children, style, ...rest }: InputBaseProps) {
  return (
    <div css={block} {...rest} style={style}>
      {children}
    </div>
  )
}

export default InputBase

const block = css`
  border: ${palette.blueGrey[50]} 1px solid;
  background: #fff;
  height: 2.5rem;
  font-size: 1rem;
  display: flex;
`
