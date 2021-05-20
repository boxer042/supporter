import { css } from '@emotion/react'
import React, { useEffect, useState } from 'react'
import {
  useResetSelectedGoodsState,
  useSelectedGoodsValueState,
} from '../../../atoms/purchaseState'
import PurchaseGoodsAppendSearchedPurchaseGoods from '../../Purchase/PurchaseGoodsAppendSearchedPurchaseGoods'
import {
  saleGoodsType,
  SelectedPurchasedGoodsType,
  useSetSaleGoodsState,
} from '../../../atoms/saleGoodsState'
import { SetterOrUpdater } from 'recoil'

export type SelectedPurchasedGoodsProps = {
  goodsResult: saleGoodsType
  purchasedGoodsList: SelectedPurchasedGoodsType[]
  setPurchasedGoodsList: SetterOrUpdater<SelectedPurchasedGoodsType[]>
}

function SelectedPurchasedGoods({
  goodsResult,
  purchasedGoodsList,
  setPurchasedGoodsList,
}: SelectedPurchasedGoodsProps) {
  const [suppliedName, setSuppliedName] = useState('')
  const selectedPurchasedGoods = useSelectedGoodsValueState()
  const setSaleGoods = useSetSaleGoodsState()
  const resetSelectedPurchaseGoods = useResetSelectedGoodsState()

  useEffect(() => {
    if (!selectedPurchasedGoods) {
      return
    }
    const exist = purchasedGoodsList.find(
      (pg) => pg.id === selectedPurchasedGoods.id
    )
    if (exist) {
      return console.log('중복')
    }

    setPurchasedGoodsList((prevList) => [
      ...prevList,
      {
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
        useStock: 1,
      },
    ])

    setSaleGoods({
      ...goodsResult,
      purchased_goods: [
        ...goodsResult.purchased_goods,
        {
          purchased_id: selectedPurchasedGoods.id,

          use_stock: 1,
        },
      ],
    })
    setSuppliedName('')
    resetSelectedPurchaseGoods()
  }, [
    selectedPurchasedGoods,
    setPurchasedGoodsList,
    setSaleGoods,
    resetSelectedPurchaseGoods,
    purchasedGoodsList,
  ])

  return (
    <div css={formStyle}>
      <div css={formItem}>
        <div css={label}>구매상품 연결</div>
        <PurchaseGoodsAppendSearchedPurchaseGoods
          keyword={suppliedName}
          setKeyword={setSuppliedName}
        />
      </div>
    </div>
  )
}

export default SelectedPurchasedGoods

const formStyle = css``
const formItem = css``
const label = css``
