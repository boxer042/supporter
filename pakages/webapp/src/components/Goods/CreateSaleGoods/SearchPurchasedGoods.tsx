import React, { useEffect, useState } from 'react'
import { SetterOrUpdater } from 'recoil'
import {
  PurchasedGoodsRecoilType,
  useResetPurchasedGoodsRecoilState,
} from '../../../atoms/createSaleGoodsRecoil'
import {
  useResetSelectedGoodsState,
  useSelectedGoodsValueState,
} from '../../../atoms/purchaseState'
import PurchaseGoodsAppendSearchedPurchaseGoods from '../../Purchase/PurchaseGoodsAppendSearchedPurchaseGoods'

export type SearchPurchasedGoodsProps = {
  searchPurchasedGoods: PurchasedGoodsRecoilType
  setSearchPurchasedGoods: SetterOrUpdater<PurchasedGoodsRecoilType>
}

function SearchPurchasedGoods({
  searchPurchasedGoods,
  setSearchPurchasedGoods,
}: SearchPurchasedGoodsProps) {
  const [suppliedName, setSuppliedName] = useState('')
  const selectedPurchasedGoods = useSelectedGoodsValueState()
  const resetSelectedPurchaseGoods = useResetSelectedGoodsState()
  const resetSearchPurchasedGoods = useResetPurchasedGoodsRecoilState()

  useEffect(() => {
    if (!selectedPurchasedGoods) {
      setSuppliedName(searchPurchasedGoods.supplied_name)
      return
    }
    const exist = searchPurchasedGoods.id === selectedPurchasedGoods.id
    if (exist) {
      return console.log('중복')
    }
    setSearchPurchasedGoods({
      id: selectedPurchasedGoods.id,
      supplied_name: selectedPurchasedGoods.supplied_name,
      include: selectedPurchasedGoods.include,
      stock: selectedPurchasedGoods.stock,
      purchase_value: selectedPurchasedGoods.purchase_value,
      purchase_vat: selectedPurchasedGoods.purchase_vat,
      purchase_price: selectedPurchasedGoods.purchase_price,
      account: {
        id: selectedPurchasedGoods.account.id,
        name: selectedPurchasedGoods.account.name,
      },
    })
    setSuppliedName(selectedPurchasedGoods.supplied_name)
    resetSelectedPurchaseGoods()
  }, [selectedPurchasedGoods, searchPurchasedGoods])

  return (
    <div>
      <PurchaseGoodsAppendSearchedPurchaseGoods
        keyword={suppliedName}
        setKeyword={setSuppliedName}
      />
      {searchPurchasedGoods.id && (
        <div>재고 : {searchPurchasedGoods.stock}</div>
      )}
    </div>
  )
}

export default SearchPurchasedGoods
