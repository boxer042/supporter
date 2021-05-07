import { css } from '@emotion/react'
import React from 'react'
import { useRef } from 'react'
import useOnClickOutside from 'use-onclickoutside'
import palette from '../../../foundations/palette'
import SearchedAccountsData from './SearchedAccountsData'

export type SearchedAccountsDataListProps = {
  visible: boolean
  onClose: Parameters<typeof useOnClickOutside>[1]
  keyword: string
}

function SearchedAccountsDataList({
  visible,
  onClose,
  keyword,
}: SearchedAccountsDataListProps) {
  const ref = useRef<HTMLDivElement>(null)

  useOnClickOutside(ref, onClose)

  if (!visible) return null
  return (
    <div css={block} ref={ref}>
      <div css={dataList}>
        <SearchedAccountsData />
        <SearchedAccountsData />
        <SearchedAccountsData />
        <SearchedAccountsData />
      </div>
    </div>
  )
}

export default SearchedAccountsDataList

const block = css`
  position: relative;
`

const dataList = css`
  position: absolute;
  background: ${palette.grey[50]};
  box-shadow: 0 2px 8px 0px rgba(0, 0, 0, 0.2);
  width: 100%;

  overflow: auto;
  z-index: 10;
  border-radius: 4px;
  margin-top: 0.25rem;
  border: 1px solid ${palette.grey[100]};
`
