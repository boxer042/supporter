import { css } from '@emotion/react'
import React from 'react'
import { BiX } from 'react-icons/bi'
import palette from '../../foundations/palette'

export type PrimaryInputProps = {
  prefix?: string
  clearButton?: boolean
} & React.InputHTMLAttributes<HTMLInputElement>

function PrimaryInput({ prefix, clearButton, ...rest }: PrimaryInputProps) {
  return (
    <div css={base}>
      {prefix !== undefined && <div css={prefixStyle}>{prefix}</div>}
      <input css={inputStyle} />
      {clearButton !== undefined && (
        <div css={clearStyle}>
          <BiX />
        </div>
      )}
    </div>
  )
}

export default PrimaryInput

const base = css`
  height: 1.875rem;
  background: ${palette.grey[50]};
  border: 1px solid ${palette.grey[200]};
  border-radius: 5px;
  padding-left: 0.5rem;
  padding-right: 0.5rem;
  display: flex;
  align-items: center;
`
const prefixStyle = css`
  font-size: 0.875rem;
  color: ${palette.grey[700]};
  margin-right: 0.5rem;
`

const inputStyle = css`
  font-size: 0.875rem;
  width: 100%;
`

const clearStyle = css`
  font-size: 1.0625rem;
  margin-top: 3px;
  padding-left: 0.5rem;
`
