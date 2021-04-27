import { css } from '@emotion/react'
import React from 'react'
import palette from '../../foundations/palette'
import InputBase from '../InputBase/InputBase'

export type InputProps = {} & React.InputHTMLAttributes<HTMLInputElement>

function Input({}: InputProps) {
  return (
    <InputBase css={block}>
      <input css={inputStyle} />
    </InputBase>
  )
}

export default Input

const block = css`
  padding-left: 1rem;
  padding-right: 1rem;
  display: flex;
  align-items: center;
  cursor: text;
`
const inputStyle = css`
  flex: 1;
  border: none;
  color: inherit;
  background: none;
  outline: none;
  padding: 0;

  font-size: inherit;
  &::placeholder {
    color: ${palette.grey[200]};
  }
  &:disabled {
    cursor: not-allowed;
    color: inherit;
  }
`
