import React from 'react'
import { css } from '@emotion/react'
import palette from '../../../foundations/palette'
import { formattedPhone } from './../../../lib/api/utils/formattedPhone'
import { useAutocompleteIndex } from '../../../atoms/autocompleteIndex'
import { SearchAccountsHandingGoodsResult } from '../../../lib/api/accounts/searchAccounts'

export type SerachedAccountsListProps = {
  id: number
  thumbnail?: string
  name: string
  office: string
  metadata?: {
    address?: string
  }
  handlingGoods: SearchAccountsHandingGoodsResult[] | null
  index: number
  selected: boolean
  onSelect: (params: {
    id: number
    name: string
    office: string
    metadata?: {
      address?: string
    }
    handlingGoods: SearchAccountsHandingGoodsResult[] | null
  }) => void
}

function SerachedAccountsList({
  id,
  name,
  office,
  metadata,
  handlingGoods,
  index,
  selected,
  onSelect,
}: SerachedAccountsListProps) {
  const [, setSelectedIndex] = useAutocompleteIndex()

  const onMouseEnter = () => {
    setSelectedIndex(index)
  }

  const onClick = () => {
    onSelect({
      id,
      name,
      office,
      metadata,
      handlingGoods,
    })
  }

  return (
    <div
      css={item(selected)}
      data-type="account-item"
      onMouseEnter={onMouseEnter}
      onClick={(e) => {
        e.stopPropagation()
        onClick()
      }}
    >
      <span css={nameStyle}>{name}</span>
      <span css={officeStyle}>{formattedPhone(office)}</span>
      <span css={addressStyle}>{metadata?.address}</span>
    </div>
  )
}

export default SerachedAccountsList

const item = (selected: boolean) => css`
  cursor: pointer;
  height: 2.25rem;
  padding-left: 1rem;
  padding-right: 1rem;
  display: flex;
  align-items: center;

  img {
    /* background: white; */
    width: 1.5rem;
    height: 1.5rem;
    border: 0.0625rem solid ${palette.blueGrey[100]};
    border-radius: 0.75rem;
    flex-shrink: 0;
  }

  span {
    margin-left: 0.5rem;
  }

  ${selected &&
  css`
    background: ${palette.cyan[100]};
  `}
`

const nameStyle = css`
  color: ${palette.blueGrey[800]};
  font-weight: bold;
  font-size: 1rem;
`
const officeStyle = css`
  font-size: 0.75rem;
  color: ${palette.blueGrey[500]};
`
const addressStyle = css`
  font-size: 0.75rem;
  color: ${palette.blueGrey[500]};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`
