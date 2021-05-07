import { css } from '@emotion/react'
import React, { Dispatch, SetStateAction } from 'react'
import { BiX } from 'react-icons/bi'
import palette from '../../foundations/palette'

export type PrimaryInputProps = {
  prefix?: string
  clearButton?: boolean
  value?: string | number | boolean
  setValue?: Dispatch<SetStateAction<string>>
} & React.InputHTMLAttributes<HTMLInputElement>

function PrimaryInput({
  prefix,
  clearButton,
  value,
  setValue,
  ...rest
}: PrimaryInputProps) {
  const onClear = () => {
    if (!setValue) {
      return
    }
    setValue('')
  }
  return (
    <div css={base}>
      {prefix !== undefined && <div css={prefixStyle}>{prefix}</div>}
      <input css={inputStyle} value={value} {...rest} />
      {clearButton !== undefined && (
        <div css={clearStyle} onClick={onClear}>
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
  border: 1px solid ${palette.base['line']};
  border-radius: 5px;
  padding-left: 0.5rem;
  padding-right: 0.5rem;
  padding-top: 2px;
  display: flex;
  align-items: center;
  &:focus-within {
    background: #fff;
  }
`
const prefixStyle = css`
  font-size: 0.75rem;
  color: ${palette.base['dec']};
  margin-right: 0.5rem;
  margin-bottom: 3px;
`

const inputStyle = css`
  width: 100%;
  flex: 1;
  color: inherit;
  padding: 0;
  font-size: 0.75rem;
  border: none;
  background: none;
  outline: none;
  color: ${palette.base['base']};
  &::placeholder {
    color: ${palette.base['dec']};
  }
`

const clearStyle = css`
  font-size: 1.0625rem;
  padding-left: 0.5rem;
  cursor: pointer;
  color: ${palette.base['dec']};
  &:hover {
    color: ${palette.base['base']};
  }
`
