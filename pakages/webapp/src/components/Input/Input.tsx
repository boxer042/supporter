import { css } from '@emotion/react'
import React from 'react'
import palette from '../../foundations/palette'
import InputBase from '../InputBase/InputBase'

export type InputProps = {
  prefix?: string
} & React.InputHTMLAttributes<HTMLInputElement>

function Input(
  { prefix, className, disabled, ...rest }: InputProps,
  ref: React.Ref<HTMLDivElement>
) {
  return (
    <InputBase css={block(disabled)} className={className} disabled={disabled}>
      {prefix !== undefined && <span>{prefix}</span>}
      <input css={inputStyle} disabled={disabled} {...rest} />
    </InputBase>
  )
}

export default Input

const block = (disabled?: boolean) => css`
  padding-left: 1rem;
  padding-right: 1rem;
  display: flex;
  align-items: center;
  cursor: text;

  span {
    color: ${palette.blueGrey[300]};
    margin-right: 0.5rem;
  }
  input {
    margin-top: 0.85px;
  }

  ${disabled &&
  css`
    span {
      color: ${palette.blueGrey[200]};
    }
    cursor: not-allowed;
  `}
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
    color: ${palette.blueGrey[200]};
  }

  &:disabled {
    cursor: not-allowed;
    color: inherit;
  }
`
