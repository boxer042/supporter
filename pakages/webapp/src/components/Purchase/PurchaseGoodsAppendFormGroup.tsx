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
  const [accountName, setAccountName] = useState({})
  const [suppliedName, setSuppliedName] = useState('')
  const selectedGoods = useSelectedGoodsValueState()
  const [inputs, setInputs] = useState({
    include: false,
    suppliedValue: '0',
    suppliedValueDiscount: '0',
  })
  const [autoInputs, setAutoInputs] = useState({
    purchaseValue: inputs.suppliedValue,
  })

  const { include, suppliedValue, suppliedValueDiscount } = inputs
  const { purchaseValue } = autoInputs

  useEffect(() => {
    if (!selectedGoods) {
      return
    }
    setSuppliedName(selectedGoods.supplied_name)
    setInputs({
      ...inputs,
      include: selectedGoods.include,
      suppliedValue: selectedGoods.supplied_value.toLocaleString(),
      suppliedValueDiscount: selectedGoods.supplied_value_discount.toLocaleString(),
    })
  }, [selectedGoods])

  useEffect(() => {
    setAutoInputs({
      purchaseValue: inputs.suppliedValue,
    })
  }, [inputs])

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
        <PurchaseGoodsAppendSearchedAccount />
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
        <PrimaryInput prefix="￦" value={suppliedValueDiscount} />
      </div>
      <div css={formItem}>
        <div css={label}>구매 단가</div>
        <PrimaryInput prefix="￦" value={purchaseValue} />
      </div>
      <div css={formItem}>
        <div css={label}>구매 세액</div>
        <PrimaryInput prefix="￦" />
      </div>
      <div css={formItem}>
        <div css={label}>구매 가격</div>
        <PrimaryInput prefix="￦" />
      </div>
      <div css={formItem}>
        <div css={label}>수량</div>
        <PrimaryInput prefix="EA" />
      </div>
      <div css={formItem}>
        <div css={label}>매입가액</div>
        <PrimaryInput prefix="￦" />
      </div>
      <div css={formItem}>
        <div css={label}>매입세액</div>
        <PrimaryInput prefix="￦" />
      </div>
      <div css={formItem}>
        <div css={label}>매입할인</div>
        <PrimaryInput prefix="￦" />
      </div>
      <div css={formItem}>
        <div css={label}>합계</div>
        <PrimaryInput prefix="￦" />
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
