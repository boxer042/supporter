import { css } from '@emotion/react'
import React from 'react'
import { useCurrentAccountsState } from '../../atoms/selectedAccountsState'
import SearchedAccountsInput from '../Search/SearchedAccounts/SearchedAccountsInput'
import PurchasesAdd from './PurchaseAdd/PurchaseAdd'
import PurchaesTest from './PurchasesTest'

export type PurchaesProps = {}

function Purchaes({}: PurchaesProps) {
  const currentAccounts = useCurrentAccountsState()
  console.log(currentAccounts)
  return (
    <div css={block}>
      <h1>Purchaes</h1>
      <PurchasesAdd />
      {/* <PurchaesTest /> */}
    </div>
  )
}

export default Purchaes

const block = css`
  padding-bottom: 6rem;
`
