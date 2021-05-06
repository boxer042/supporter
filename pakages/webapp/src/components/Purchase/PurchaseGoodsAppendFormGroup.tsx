import React from 'react'
import { BiXCircle } from 'react-icons/bi'
import PrimaryInput from '../PrimaryInput/PrimaryInput'

export type PurchaseGoodsAppendFormGroupProps = {}

function PurchaseGoodsAppendFormGroup({}: PurchaseGoodsAppendFormGroupProps) {
  return (
    <div>
      <PrimaryInput prefix="￦" clearButton />
    </div>
  )
}

export default PurchaseGoodsAppendFormGroup
