import React, { useEffect, useState } from 'react'
import PrimaryInput from '../PrimaryInput/PrimaryInput'
import { css } from '@emotion/react'
import PurchaseGoodsAppendSearchedAccount from './PurchaseGoodsAppendSearchedAccount'
import { usePurchaseGoodsState } from '../../atoms/purchaseState'
import PurchaseGoodsAppendSearchedPurchaseGoods from './PurchaseGoodsAppendSearchedPurchaseGoods'
import PrimaryInputSelect from '../PrimaryInputSelect/PrimaryInputSelect'
import useAccountByKeyword from '../../hooks/query/useAccountByKeyword'
import { useSelectedGoodsValueState } from './../../atoms/purchaseState'

export type PurchaseGoodsAppendFormGroupProps = {}

function PurchaseGoodsAppendFormGroup({}: PurchaseGoodsAppendFormGroupProps) {
  const [purchaseGoods, setPurchaseGoods] = usePurchaseGoodsState()
  const [accountName, setAccountName] = useState('')
  const [suppliedName, setSuppliedName] = useState('')
  const [totalSuppliedValueDiscount, setTotalSuppliedValueDiscount] = useState(
    '0'
  )
  const selectedGoods = useSelectedGoodsValueState()

  const [inputs, setInputs] = useState({
    include: false,
    suppliedValue: '0',
    suppliedValueDiscount: '0',
    qty: '1',
  })
  const [autoInputs, setAutoInputs] = useState({
    purchaseValue: '0',
    purchaseVat: '0',
    purchasePrice: '0',
    totalPurchaseValue: '0',
    totalPurchaseVat: '0',
    totalPurchasePrice: '0',
  })

  const { include, suppliedValue, suppliedValueDiscount, qty } = inputs
  const {
    purchaseValue,
    purchaseVat,
    purchasePrice,
    totalPurchaseValue,
    totalPurchasePrice,
    totalPurchaseVat,
  } = autoInputs

  useEffect(() => {
    if (!selectedGoods) {
      return
    }
    setAccountName(selectedGoods.account.name)
    setSuppliedName(selectedGoods.supplied_name)
    setInputs({
      ...inputs,
      include: selectedGoods.include,
      suppliedValue: selectedGoods.supplied_value.toLocaleString(),
      suppliedValueDiscount: selectedGoods.supplied_value_discount.toLocaleString(),
    })
  }, [selectedGoods])

  useEffect(() => {
    // 정수형으로 변환
    const qty = parseInt(inputs.qty.replace(/[^\d]+/g, ''))
    const suppliedValue = parseInt(inputs.suppliedValue.replace(/[^\d]+/g, ''))
    const suppliedValueDiscount = parseInt(
      inputs.suppliedValueDiscount.replace(/[^\d]+/g, '')
    )
    const purchaseValue = suppliedValue - suppliedValueDiscount
    const purchaseVat = purchaseValue * 0.1
    const purchasePrice = purchaseValue * 1.1
    const totalSuppliedValueDiscount = suppliedValueDiscount * qty
    const totalPurchaseValue = purchaseValue * qty
    const totalPurchaseVat = totalPurchaseValue * 0.1
    const totalPurchasePrice = totalPurchaseValue * 1.1

    setAutoInputs({
      purchaseValue: purchaseValue.toLocaleString(),
      purchaseVat: purchaseVat.toLocaleString(),
      purchasePrice: purchasePrice.toLocaleString(),
      totalPurchaseValue: totalPurchaseValue.toLocaleString(),
      totalPurchaseVat: totalPurchaseVat.toLocaleString(),
      totalPurchasePrice: totalPurchasePrice.toLocaleString(),
    })
  }, [inputs])

  useEffect(() => {
    const qty = parseInt(inputs.qty.replace(/[^\d]+/g, ''))
    const suppliedValueDiscount = parseInt(
      inputs.suppliedValueDiscount.replace(/[^\d]+/g, '')
    )
    const totalSuppliedValueDiscount = suppliedValueDiscount * qty
    setTotalSuppliedValueDiscount(totalSuppliedValueDiscount.toLocaleString())
  }, [inputs.qty, inputs.suppliedValueDiscount])

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    const number = parseInt(value.replace(/[^\d]+/g, ''))
    if (isNaN(number)) {
      setInputs({
        ...inputs,
        [name]: '0',
      })
      return
    }
    setInputs({
      ...inputs,
      [name]: number.toLocaleString(),
    })
  }

  const onChangeDiscount = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    const number = parseInt(value.replace(/[^\d]+/g, ''))
    if (isNaN(number)) {
      setTotalSuppliedValueDiscount('0')
      setInputs({
        ...inputs,
        suppliedValueDiscount: '0',
      })
      return
    }
    setTotalSuppliedValueDiscount(number.toLocaleString())
    setInputs({
      ...inputs,
      suppliedValueDiscount: (
        number / parseInt(inputs.qty.replace(/[^\d]+/g, ''))
      ).toLocaleString(),
    })
  }
  return (
    <div css={formStyle}>
      <div css={formItem}>
        <div css={label}>작성일</div>
        <PrimaryInput type="date" />
      </div>
      <div css={formItem}>
        <div css={label}>구매일</div>
        <PrimaryInput type="date" />
      </div>
      <div css={formItem}>
        <div css={label}>거래처</div>
        <PurchaseGoodsAppendSearchedAccount
          keyword={accountName}
          setKeyword={setAccountName}
        />
      </div>
      <div css={formItem}>
        <div css={label}>상품명</div>
        <PurchaseGoodsAppendSearchedPurchaseGoods
          keyword={suppliedName}
          setKeyword={setSuppliedName}
        />
      </div>
      <div css={formItem}>
        <div css={label}>Include</div>
        <input type="checkbox" checked={include} />
      </div>
      <div css={formItem}>
        <div css={label}>거래처 공급단가</div>
        <PrimaryInput
          prefix="￦"
          name="suppliedValue"
          value={suppliedValue}
          onChange={onChange}
        />
      </div>
      <div css={formItem}>
        <div css={label}>거래처 공급단가할인</div>
        <PrimaryInput
          prefix="￦"
          name="suppliedValueDiscount"
          value={suppliedValueDiscount}
          onChange={onChange}
        />
      </div>
      <div css={formItem}>
        <div css={label}>구매 단가</div>
        <PrimaryInput prefix="￦" name="purchaseValue" value={purchaseValue} />
      </div>
      <div css={formItem}>
        <div css={label}>구매 세액</div>
        <PrimaryInput prefix="￦" name="purchaseVat" value={purchaseVat} />
      </div>
      <div css={formItem}>
        <div css={label}>구매 가격</div>
        <PrimaryInput prefix="￦" value={purchasePrice} />
      </div>
      <div css={formItem}>
        <div css={label}>수량</div>
        <PrimaryInput prefix="EA" name="qty" value={qty} onChange={onChange} />
      </div>
      <div css={formItem}>
        <div css={label}>총 공급할인</div>
        <PrimaryInput
          prefix="￦"
          name="totalSuppliedValueDiscount"
          value={totalSuppliedValueDiscount}
          onChange={onChangeDiscount}
        />
      </div>
      <div css={formItem}>
        <div css={label}>매입가액</div>
        <PrimaryInput prefix="￦" value={totalPurchaseValue} />
      </div>
      <div css={formItem}>
        <div css={label}>매입세액</div>
        <PrimaryInput prefix="￦" value={totalPurchaseVat} />
      </div>
      <div css={formItem}>
        <div css={label}>합계</div>
        <PrimaryInput prefix="￦" value={totalPurchasePrice} />
      </div>
    </div>
  )
}

export default PurchaseGoodsAppendFormGroup

const formStyle = css``
const formItem = css``
const label = css`
  font-size: 0.75rem;
  font-weight: bold;
`
const inputStyle = css``
