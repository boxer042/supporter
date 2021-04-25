import { css } from '@emotion/react'
import React from 'react'
import { IoChevronBackSharp } from 'react-icons/io5'
import palette from '../../foundations/palette'

export type ContentsHeaderProps = {}

function ContentsHeader({}: ContentsHeaderProps) {
  return (
    <div css={block}>
      <button css={actionButton}>
        <IoChevronBackSharp />
      </button>
      <span></span>
    </div>
  )
}

export default ContentsHeader

const block = css`
  width: 100%;
  border-bottom: 1px solid ${palette.grey[300]};
  position: fixed;
`
const actionButton = css``
