import { css } from '@emotion/react'
import React from 'react'
import usePurchased from '../../../hooks/query/usePurchsed'
import PurchasedList from './PurchasedList'

export type PurchasedProps = {}

function Purchased({}: PurchasedProps) {
  const { status, data, error, isFetching } = usePurchased()

  if (data?.length === 0) return null
  return (
    <div css={block}>
      <PurchasedList results={data} />
    </div>
  )
}

export default Purchased

const block = css`
  padding-left: 1rem;
  padding-right: 1rem;
`
