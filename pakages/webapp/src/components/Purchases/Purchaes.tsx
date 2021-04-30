import React from 'react'
import { useCurrentAccountsState } from '../../atoms/selectedAccountsState'
import SearchedAccountsInput from '../Search/SearchedAccounts/SearchedAccountsInput'
import PurchasesAdd from './PurchasesAdd'

export type PurchaesProps = {}

function Purchaes({}: PurchaesProps) {
  const currentAccounts = useCurrentAccountsState()
  console.log(currentAccounts)
  return (
    <div>
      <h1>Purchaes</h1>
      <PurchasesAdd />
    </div>
  )
}

export default Purchaes
