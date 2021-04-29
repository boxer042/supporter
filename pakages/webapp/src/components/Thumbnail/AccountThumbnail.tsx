import { css } from '@emotion/react'
import React from 'react'
import { FaUserCircle } from 'react-icons/fa'

export type AccountThumbnailProps = {}

function AccountThumbnail({}: AccountThumbnailProps) {
  return (
    <div css={block}>
      <FaUserCircle />
    </div>
  )
}

export default AccountThumbnail

const block = css`
  color: red;
`
