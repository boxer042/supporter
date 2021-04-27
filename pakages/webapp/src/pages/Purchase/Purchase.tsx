import React, { useEffect, useState } from 'react'
import SearchedAccountInput from '../../components/Inputs/SearchedAccountInput'
import Purchaes from '../../components/Purchases/Purchaes'
import { getPurchaseProducts } from '../../lib/api/products/getPurchaseProducts'

export type PurchaseProps = {}

function Purchase({}: PurchaseProps) {
  return (
    <div>
      <Purchaes />
    </div>
  )
}

export default Purchase
