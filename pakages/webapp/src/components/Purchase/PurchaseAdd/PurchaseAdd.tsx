import { css } from '@emotion/react'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useCurrentAccountsState } from '../../../atoms/selectedAccountsState'
import { addPurchasesProducts } from '../../../lib/api/purchases/addPurchasesProducts'
import Input from '../../Input/Input'
import SearchedAccountsInput from '../../Search/SearchedAccounts/SearchedAccountsInput'

import {
  useCurrentPruchasesProductState,
  useSearchedHandlingGoodsValue,
  useSearchedPurchaseGoodsState,
} from '../../../atoms/purchasesState'
import useFormattedNumber from '../../../hooks/useFormattedNumber'
import PurchaseSuppliedNameAutocomplete from './PurchaseSuppliedNameAutocomplete'
import PurchaseSuppliedNameInput from './PurchaseSuppliedNameInput'

type PurchasesProductsInputsProps = {
  accountId?: number
  name?: string
  quantity: number
  unitPrice: number
  totalDiscount: number
}
export type PurchasesAddProps = {}

function PurchasesAdd({}: PurchasesAddProps) {
  const currentPurchasesProduct = useCurrentPruchasesProductState()
  const currentAccount = useCurrentAccountsState()
  const currentPurchaseGoods = useSearchedHandlingGoodsValue()
  const [value, onChangeNumber] = useFormattedNumber(0)

  const [inputs, setInputs] = useState<PurchasesProductsInputsProps>({
    quantity: 0,
    unitPrice: 0,
    totalDiscount: 0,
  })

  const { quantity, unitPrice, totalDiscount } = inputs

  const price = quantity * unitPrice
  const unitPriceDiscount = totalDiscount / quantity

  useEffect(() => {
    const getCurrentPurchasesProduct = async () => {
      const data = currentPurchasesProduct
      if (data.name === '' || data.name.length === 0) {
        return
      }
      //   setInputs({
      //     stock: '0',
      //     unitPrice: data.unit_price.toLocaleString(),
      //     unitPriceVat: (data.unit_price * 0.1).toLocaleString(),
      //     unitPriceDiscount: data.unit_price_discount.toLocaleString(),
      //     priceDiscount: '0',
      //     price: data.price.toLocaleString(),
      //     priceVat: data.price_vat.toLocaleString(),
      //     totalPrice: data.total_price.toLocaleString(),
      //   })
    }
    getCurrentPurchasesProduct()
  }, [currentPurchasesProduct, setInputs])

  const onChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { value, name } = e.target

      if (isNaN(parseInt(value))) {
        setInputs({
          ...inputs,
          [name]: 0,
        })
        return
      }

      // const number = parseInt(value.replace(/[^\d]+/g, ''), 10)
      // if (isNaN(number)) {
      //   setInputs({ ...inputs, [name]: '0' })
      //   return
      // }
      setInputs({
        ...inputs,
        // [name]: number.toLocaleString(),
        [name]: parseInt(value),
      })
    },
    [inputs, setInputs]
  )

  const onClick = async () => {
    const purchasesProducts = {
      accountId: currentAccount?.id,
      name: currentPurchasesProduct.name,
      quantity: quantity,
      unit_price: unitPrice,
      purchase_price_discount: totalDiscount,
    }
    // await addPurchasesProducts(purchasesProducts)
    console.log(purchasesProducts)
  } // 테스트 작성

  return (
    <div css={block}>
      <div css={formBlock}>
        <div css={formItem}>
          <div css={itemName}>구매처</div>
          <SearchedAccountsInput css={itemInput} />
        </div>
        <div css={formItem}>
          <div css={itemName}>
            상품명 - {currentAccount?.handling_goods?.length}개
          </div>
          <PurchaseSuppliedNameInput />
        </div>
        <div css={formItem}>
          <div css={itemName}>구매 수량</div>
          <Input
            css={itemInput}
            name="quantity"
            value={quantity}
            onChange={onChange}
          />
        </div>
        <div css={formItem}>
          <div css={itemName}>단가</div>
          <Input
            css={itemInput}
            name="unitPrice"
            value={unitPrice}
            onChange={onChange}
          />
        </div>
        <div css={formItem}>
          <div css={itemName}>개당 할인</div>
          <Input
            css={itemInput}
            name="unitPriceDiscount"
            value={unitPriceDiscount || 0}
            onChange={onChange}
            disabled
          />
        </div>
        <div css={formItem}>
          <div css={itemName}>구매 가격</div>
          <Input
            css={itemInput}
            name="price"
            value={price}
            onChange={onChange}
            disabled
          />
        </div>
        <div css={formItem}>
          <div css={itemName}>총 할인</div>
          <Input
            css={itemInput}
            name="totalDiscount"
            value={totalDiscount}
            onChange={onChange}
          />
        </div>
        <div css={formItem}>
          <div css={itemName}>구매 가격 세액</div>
          <Input css={itemInput} name="" disabled />
        </div>
        <div css={formItem}>
          <div css={itemName}>구매 총 가격</div>
          <Input css={itemInput} name="" disabled />
        </div>
      </div>
      <button onClick={onClick}>Add</button>
    </div>
  )
}

export default PurchasesAdd

const block = css``
const formBlock = css``
const formItem = css`
  margin-top: 0.75rem;
`
const itemName = css``
const itemInput = css``

/**
 * TODO
 * 거래처 선택 후 거래처가 가지고 있는 취급상품 중에서만 검색되도록 구현
 * 1. 리코일을 사용해서 필터링하는 방법
 * 2. 서버단에서 퓨즈를 사용해서 서치하는 방법
 */
