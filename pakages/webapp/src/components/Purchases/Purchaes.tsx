import React from 'react'
import { useCurrentAccountsState } from '../../atoms/selectedAccountsState'
import SearchedAccountsInput from '../Search/SearchedAccounts/SearchedAccountsInput'

export type PurchaesProps = {}

function Purchaes({}: PurchaesProps) {
  const currentAccounts = useCurrentAccountsState()
  console.log(currentAccounts)
  return (
    <div>
      <h1>Purchaes</h1>
      <SearchedAccountsInput />
      {/* {currentAccounts.map((c) => c.name)} */}
      {currentAccounts.name}
    </div>
  )
}

export default Purchaes
