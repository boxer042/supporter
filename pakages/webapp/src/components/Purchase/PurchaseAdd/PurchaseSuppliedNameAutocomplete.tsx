import * as React from 'react'
import { SearchAccountsHandingGoodsResult } from '../../../lib/api/accounts/searchAccounts'
import { css } from '@emotion/react'
import PuchaseSuppliedNameList from './PurchaseSuppliedNameList'

type PurchaseSuppliedNameAutocompleteProps = {
  results?: SearchAccountsHandingGoodsResult[]
}

export default function PurchaseSuppliedNameAutocomplete({
  results,
}: PurchaseSuppliedNameAutocompleteProps) {
  return (
    <div css={block}>
      <div css={itemBlock}>
        {results?.map((result) => result.supplied_name)}
        <PuchaseSuppliedNameList />
      </div>
    </div>
  )
}

const block = css`
  position: relative;
`
const itemBlock = css`
  position: absolute;
  padding-top: 0.375rem;
  padding-bottom: 0.375rem;
  background: #fff;
  width: 100%;
  max-height: 15rem;
  box-shadow: 0rem 0.25rem 0.5rem rgba(0, 0, 0, 0.07);
  border-radius: 0.32rem;
  overflow-y: auto;
  z-index: 10;
`
