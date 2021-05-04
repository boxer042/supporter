import { css } from '@emotion/react'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useCurrentAccountsState } from '../../../atoms/selectedAccountsState'
import { addPurchasesProducts } from '../../../lib/api/purchases/addPurchasesProducts'
import Input from '../../Input/Input'
import SearchedAccountsInput from '../../Search/SearchedAccounts/SearchedAccountsInput'

import {
  useSearchedHandlingGoodsValue,
  useSelectedSuppliedNameStateValue,
} from '../../../atoms/purchasesState'
import useFormattedNumber from '../../../hooks/useFormattedNumber'
import PurchaseSuppliedNameInput from './PurchaseSuppliedNameInput'
import moment from 'moment'

type PurchaseGoodsInputProps = {
  purchasedAt: string
  quantity: number
  include: string
  suppliedValue: number
  suppliedVat: number
  suppliedPrice: number
  suppliedValueDiscount: number
  purchaseValue: number
  purchaseVat: number
  purchasePrice: number
  totalPurchaseVat: number
  totalPurchasePrice: number
  totalSuppliedValueDiscount: number
}
export type PurchasesAddProps = {}

function PurchasesAdd({}: PurchasesAddProps) {
  const currentAccount = useCurrentAccountsState()
  const selectedSuppliedName = useSelectedSuppliedNameStateValue()
  const currentPurchaseGoods = useSearchedHandlingGoodsValue()
  const [value, onChangeNumber] = useFormattedNumber(0)

  const [inputs, setInputs] = useState<PurchaseGoodsInputProps>({
    purchasedAt: moment().format('YYYY-MM-DD'),
    quantity: 1,
    include: '',
    suppliedValue: 0,
    suppliedVat: 0,
    suppliedPrice: 0,
    suppliedValueDiscount: 0,
    purchaseValue: 0,
    purchaseVat: 0,
    purchasePrice: 0,
    totalPurchaseVat: 0,
    totalPurchasePrice: 0,
    totalSuppliedValueDiscount: 0,
  })

  const {
    purchasedAt,
    quantity,
    include,
    suppliedValue,
    suppliedValueDiscount,
    totalSuppliedValueDiscount,
  } = inputs

  useEffect(() => {
    if (!selectedSuppliedName) {
      return
    }
    setInputs({
      ...inputs,
      quantity: 1,
      include: selectedSuppliedName.include.toString(),
      suppliedValue: selectedSuppliedName.supplied_value,
      suppliedValueDiscount: selectedSuppliedName.supplied_value_discount,
      totalSuppliedValueDiscount: selectedSuppliedName.supplied_value_discount,
    })
  }, [selectedSuppliedName])

  useEffect(() => {
    setInputs({
      ...inputs,
      totalSuppliedValueDiscount: suppliedValueDiscount * quantity,
    })
  }, [suppliedValueDiscount, quantity])

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

  const onSelected = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value, name } = e.target
    setInputs({
      ...inputs,
      [name]: value,
    })
  }

  const onClick = async () => {} // 테스트 작성

  const purchaseValue = suppliedValue - suppliedValueDiscount
  const purchaseVat = purchaseValue * 0.1
  const purchasePrice = purchaseValue + purchaseVat
  const totalPurchaseValue = purchaseValue * quantity
  const totalPurchaseVat = purchaseVat * quantity
  const totalPurchasePrice = purchaseValue * 1.1 * quantity

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
          <div css={itemName}>구매 날짜</div>
          <Input
            type="date"
            css={itemInput}
            name="purchasedAt"
            value={purchasedAt}
            onChange={(e) =>
              setInputs({ ...inputs, purchasedAt: e.target.value })
            }
          />
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
          <div css={itemName}>Include</div>
          <select name="include" onChange={onSelected} defaultValue={include}>
            <option value="true">True</option>
            <option value="false">False</option>
          </select>
        </div>
        <div css={formItem}>
          <div css={itemName}>단가</div>
          <Input
            css={itemInput}
            name="suppliedValue"
            value={suppliedValue}
            onChange={onChange}
          />
          {suppliedValue}
        </div>

        <div css={formItem}>
          <div css={itemName}>단가 할인</div>
          <Input
            css={itemInput}
            name="suppliedValueDiscount"
            value={suppliedValueDiscount}
            onChange={onChange}
          />
        </div>
        <div css={formItem}>
          <div css={itemName}>구매 단가</div>
          <Input
            css={itemInput}
            name="purchaseValue"
            value={purchaseValue}
            onChange={() => {}}
          />
        </div>
        <div css={formItem}>
          <div css={itemName}>구매 단가 부가세</div>
          <Input
            css={itemInput}
            name="purchaseVat"
            value={purchaseVat}
            onChange={() => {}}
          />
        </div>
        <div css={formItem}>
          <div css={itemName}>구매 단가 가격</div>
          <Input
            css={itemInput}
            name="purchasePrice"
            value={purchasePrice}
            onChange={onChange}
          />
        </div>
        <div css={formItem}>
          <div css={itemName}>총 할인</div>
          <Input
            css={itemInput}
            name="totalSuppliedValueDiscount"
            value={totalSuppliedValueDiscount}
            onChange={(e) => {
              if (isNaN(parseInt(e.target.value))) {
                setInputs({
                  ...inputs,
                  totalSuppliedValueDiscount: 0,
                  suppliedValueDiscount: 0,
                })
                return
              }
              setInputs({
                ...inputs,
                suppliedValueDiscount: parseInt(e.target.value) / quantity,
              })
            }}
          />
        </div>
        <div css={formItem}>
          <div css={itemName}>구매 단가 합</div>
          <Input
            css={itemInput}
            name="totalPurchaseValue"
            value={totalPurchaseValue}
            onChange={() => {}}
          />
        </div>
        <div css={formItem}>
          <div css={itemName}>구매 단가 부가세 합</div>
          <Input
            css={itemInput}
            name="totalPurchaseVat"
            value={totalPurchaseVat}
            onChange={() => {}}
          />
        </div>
        <div css={formItem}>
          <div css={itemName}>구매 총 가격</div>
          <Input
            css={itemInput}
            name="totalPurchasePrice"
            value={totalPurchasePrice}
            onChange={() => {}}
          />
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
