import React, { useEffect, useState } from 'react'
import PrimaryInput from '../PrimaryInput/PrimaryInput'
import { css } from '@emotion/react'
import PurchaseGoodsAppendSearchedAccount from './PurchaseGoodsAppendSearchedAccount'
import {
  usePurchaseGoodsSetState,
  usePurchaseGoodsState,
  usePurchaseGoodsValueState,
} from '../../atoms/purchaseState'
import PurchaseGoodsAppendSearchedPurchaseGoods from './PurchaseGoodsAppendSearchedPurchaseGoods'
import PrimaryInputSelect from '../PrimaryInputSelect/PrimaryInputSelect'
import useAccountByKeyword from '../../hooks/query/useAccountByKeyword'
import { useSelectedGoodsValueState } from './../../atoms/purchaseState'
import moment from 'moment'
import useAppendPurchaseGoods from './../../hooks/query/useAppendPurchaseGoods'
import appendPurchaseGoods from '../../lib/api/purchases/appendPurchaseGoods'
import PrimaryButton from '../PrimaryButton/PrimaryButton'

export type PurchaseGoodsAppendFormGroupProps = {}

function PurchaseGoodsAppendFormGroup({}: PurchaseGoodsAppendFormGroupProps) {
  const [accountName, setAccountName] = useState('')
  const [accountId, setAccountId] = useState<number | null>(null)
  const [suppliedName, setSuppliedName] = useState('')
  const [totalSuppliedValueDiscount, setTotalSuppliedValueDiscount] = useState(
    '0'
  )
  const selectedGoods = useSelectedGoodsValueState()

  // console.log(moment('2021-05-11T10:00:49.350Z').format('LLLLL'))
  const [inputs, setInputs] = useState({
    createdAt: moment().format('YYYY-MM-DD'),
    purchasedAt: moment().format('YYYY-MM-DD'),
    include: true,
    includeVat: false,
    suppliedValue: '0',
    suppliedVat: '0',
    suppliedPrice: '0',
    suppliedValueDiscount: '0',
    qty: '0',
  })
  const [autoInputs, setAutoInputs] = useState({
    purchaseValue: '0',
    purchaseVat: '0',
    purchasePrice: '0',
    totalPurchaseValue: '0',
    totalPurchaseVat: '0',
    totalPurchasePrice: '0',
  })

  const {
    createdAt,
    purchasedAt,
    include,
    includeVat,
    suppliedValue,
    suppliedValueDiscount,
    qty,
    suppliedVat,
    suppliedPrice,
  } = inputs
  const {
    purchaseValue,
    purchaseVat,
    purchasePrice,
    totalPurchaseValue,
    totalPurchasePrice,
    totalPurchaseVat,
  } = autoInputs

  const setPurchaseGoods = usePurchaseGoodsSetState()
  const purchaseGoods = usePurchaseGoodsValueState()

  useEffect(() => {
    if (!selectedGoods) {
      return
    }
    setAccountId(selectedGoods.account.id)
    setAccountName(selectedGoods.account.name)
    setSuppliedName(selectedGoods.supplied_name)
    setInputs({
      ...inputs,
      include: selectedGoods.include,
      includeVat: selectedGoods.include_vat,
      suppliedValue: selectedGoods.supplied_value.toLocaleString(),
      suppliedVat: selectedGoods.supplied_vat.toLocaleString(),
      suppliedPrice: selectedGoods.supplied_price.toLocaleString(),
      suppliedValueDiscount: selectedGoods.supplied_value_discount.toLocaleString(),
    })
  }, [selectedGoods])

  useEffect(() => {
    // 정수형으로 변환
    const qty = parseInt(inputs.qty.replace(/\$\s?|(,*)/g, ''))
    const suppliedValue = parseInt(
      inputs.suppliedValue.replace(/\$\s?|(,*)/g, '')
    )
    const suppliedValueDiscount = parseInt(
      inputs.suppliedValueDiscount.replace(/\$\s?|(,*)/g, '')
    )
    const purchaseValue = suppliedValue - suppliedValueDiscount
    const purchaseVat = purchaseValue * 0.1
    const purchasePrice = purchaseValue * 1.1
    const totalSuppliedValueDiscount = suppliedValueDiscount * qty
    const totalPurchaseValue = purchaseValue * qty
    const totalPurchaseVat = totalPurchaseValue * 0.1
    const totalPurchasePrice = totalPurchaseValue * 1.1

    setAutoInputs({
      purchaseValue: purchaseValue
        .toFixed()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ','),
      purchaseVat: purchaseVat.toFixed().replace(/\B(?=(\d{3})+(?!\d))/g, ','),
      purchasePrice: purchasePrice
        .toFixed()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ','),
      totalPurchaseValue: totalPurchaseValue
        .toFixed()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ','),
      totalPurchaseVat: totalPurchaseVat
        .toFixed()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ','),
      totalPurchasePrice: totalPurchasePrice
        .toFixed()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ','),
    })
  }, [inputs])

  useEffect(() => {
    const qty = parseInt(inputs.qty.replace(/\$\s?|(,*)/g, ''))
    const suppliedValueDiscount = parseInt(
      inputs.suppliedValueDiscount.replace(/\$\s?|(,*)/g, '')
    )
    const totalSuppliedValueDiscount = suppliedValueDiscount * qty
    setTotalSuppliedValueDiscount(totalSuppliedValueDiscount.toLocaleString())
  }, [inputs.qty])

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    const number = parseInt(value.replace(/\$\s?|(,*)/g, ''))

    if (name === 'suppliedValue') {
      if (isNaN(number)) {
        setInputs({
          ...inputs,
          suppliedValue: '0',
          suppliedVat: '0',
          suppliedPrice: '0',
        })
        return
      }
      setInputs({
        ...inputs,
        suppliedValue: number.toLocaleString(),
        suppliedVat: (number * 0.1).toLocaleString(),
        suppliedPrice: (number * 1.1).toLocaleString(),
      })
      return
    }

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
    if (inputs.qty === '0') {
      return
    }
    const number = parseInt(value.replace(/\$\s?|(,*)/g, ''))
    const qty = parseInt(inputs.qty.replace(/\$\s?|(,*)/g, ''))
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
      suppliedValueDiscount: (number / qty).toLocaleString(),
    })
  }

  const onChangeIncludeVat = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    if (!includeVat) return
    const number = parseInt(value.replace(/\$\s?|(,*)/g, ''))
    if (isNaN(number)) {
      setInputs({
        ...inputs,
        suppliedValue: '0',
        suppliedVat: '0',
        suppliedPrice: '0',
      })
      return
    }
    setInputs({
      ...inputs,
      suppliedValue: (number / 1.1)
        .toFixed()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ','),
      suppliedVat: ((number / 1.1) * 0.1)
        .toFixed()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ','),
      suppliedPrice: number.toLocaleString(),
    })
  }

  const onClick = () => {
    if (!accountId) {
      return
    }
    // if (qty === '0') {
    //   console.log('수량 0')
    //   return
    // }

    const purchaseGoods = {
      purchased_at: purchasedAt,
      account_id: accountId,
      supplied_name: suppliedName,
      include: include,
      include_vat: includeVat,
      supplied_value: parseInt(suppliedValue.replace(/\$\s?|(,*)/g, '')),
      supplied_vat: parseInt(suppliedVat.replace(/\$\s?|(,*)/g, '')),
      supplied_price: parseInt(suppliedPrice.replace(/\$\s?|(,*)/g, '')),
      supplied_value_discount: parseInt(
        suppliedValueDiscount.replace(/\$\s?|(,*)/g, '')
      ),
      quantity: parseInt(qty.replace(/\$\s?|(,*)/g, '')),
      total_supplied_value_discount: parseInt(
        totalSuppliedValueDiscount.replace(/\$\s?|(,*)/g, '')
      ),
      purchase_value: parseInt(purchaseValue.replace(/\$\s?|(,*)/g, '')),
      purchase_vat: parseInt(purchaseVat.replace(/\$\s?|(,*)/g, '')),
      purchase_price: parseInt(purchasePrice.replace(/\$\s?|(,*)/g, '')),
      total_purchase_value: parseInt(
        totalPurchaseValue.replace(/\$\s?|(,*)/g, '')
      ),
      total_purchase_vat: parseInt(totalPurchaseVat.replace(/\$\s?|(,*)/g, '')),
      total_purchase_price: parseInt(
        totalPurchaseVat.replace(/\$\s?|(,*)/g, '')
      ),
    }

    setPurchaseGoods(purchaseGoods)
    appendPurchaseGoods(purchaseGoods)
    // reset
    // TODO: recoil selectedGoods 초기화 시켜주기
    // setAccountId(null)
    // setAccountName('')
    setSuppliedName('')
    setTotalSuppliedValueDiscount('0')
    setInputs({
      createdAt: moment().format('YYYY-MM-DD'),
      purchasedAt: purchasedAt,
      include: include,
      includeVat: includeVat,
      suppliedValue: '0',
      suppliedVat: '0',
      suppliedPrice: '0',
      suppliedValueDiscount: '0',
      qty: '0',
    })
    setAutoInputs({
      purchaseValue: '0',
      purchaseVat: '0',
      purchasePrice: '0',
      totalPurchaseValue: '0',
      totalPurchaseVat: '0',
      totalPurchasePrice: '0',
    })
  }

  const onReset = () => {
    setAccountId(null)
    setAccountName('')
    setSuppliedName('')
    setTotalSuppliedValueDiscount('0')
    setInputs({
      createdAt: moment().format('YYYY-MM-DD'),
      purchasedAt: moment().format('YYYY-MM-DD'),
      include: true,
      includeVat: false,
      suppliedValue: '0',
      suppliedVat: '0',
      suppliedPrice: '0',
      suppliedValueDiscount: '0',
      qty: '0',
    })
    setAutoInputs({
      purchaseValue: '0',
      purchaseVat: '0',
      purchasePrice: '0',
      totalPurchaseValue: '0',
      totalPurchaseVat: '0',
      totalPurchasePrice: '0',
    })
  }
  return (
    <div css={formStyle}>
      <div css={formItem}>
        <div css={label}>작성일</div>
        <PrimaryInput type="date" name={createdAt} value={createdAt} readOnly />
      </div>
      <div css={formItem}>
        <div css={label}>구매일</div>
        <PrimaryInput
          type="date"
          name={purchasedAt}
          value={purchasedAt}
          onChange={(e) => {
            setInputs({ ...inputs, purchasedAt: e.target.value })
          }}
        />
      </div>
      <div css={formItem}>
        <div css={label}>거래처</div>
        <PurchaseGoodsAppendSearchedAccount
          keyword={accountName}
          setKeyword={setAccountName}
          setAccountId={setAccountId}
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
        <input
          type="checkbox"
          checked={include}
          onChange={() =>
            setInputs({
              ...inputs,
              include: !include,
            })
          }
        />
      </div>

      <div css={formItem}>
        <div css={label}>부가세 포함가격</div>
        <input
          type="checkbox"
          checked={includeVat}
          onChange={() =>
            setInputs({
              ...inputs,
              includeVat: !includeVat,
            })
          }
        />
      </div>

      <div css={supplied}>
        <div css={suppliedFormItem}>
          <div css={label}>공급가</div>
          <PrimaryInput
            prefix="￦"
            name="suppliedValue"
            value={suppliedValue}
            onChange={onChange}
          />
        </div>
        <div css={suppliedFormItem}>
          <div css={label}>공급세액</div>
          <PrimaryInput
            prefix="￦"
            name="suppliedVat"
            value={suppliedVat}
            readOnly
          />
        </div>
        <div css={suppliedFormItem}>
          <div css={label}>공급가격</div>
          <PrimaryInput
            prefix="￦"
            name="suppliedPrice"
            value={suppliedPrice}
            onChange={onChangeIncludeVat}
          />
        </div>
        <div css={suppliedFormItem}>
          <div css={label}>공급가할인</div>
          <PrimaryInput
            prefix="￦"
            name="suppliedValueDiscount"
            value={suppliedValueDiscount}
            onChange={onChange}
          />
        </div>
      </div>

      <div css={purchased}>
        <div css={purchasedFormItem}>
          <div css={label}>구매가</div>
          <PrimaryInput
            prefix="￦"
            name="purchaseValue"
            value={purchaseValue}
            readOnly
          />
        </div>
        <div css={purchasedFormItem}>
          <div css={label}>구매세액</div>
          <PrimaryInput
            prefix="￦"
            name="purchaseVat"
            value={purchaseVat}
            readOnly
          />
        </div>
        <div css={purchasedFormItem}>
          <div css={label}>구매가격</div>
          <PrimaryInput prefix="￦" value={purchasePrice} readOnly />
        </div>
      </div>

      <div css={purchaseInput}>
        <div css={purchaseInputFormItem}>
          <div css={label}>수량</div>
          <PrimaryInput
            prefix="EA"
            name="qty"
            value={qty}
            onChange={onChange}
          />
        </div>
        <div css={purchaseInputFormItem}>
          <div css={label}>총 공급가할인</div>
          <PrimaryInput
            prefix="￦"
            name="totalSuppliedValueDiscount"
            value={totalSuppliedValueDiscount}
            onChange={onChangeDiscount}
          />
        </div>
      </div>

      <div css={formItem}>
        <div css={label}>매입가액</div>
        <PrimaryInput prefix="￦" value={totalPurchaseValue} readOnly />
      </div>
      <div css={formItem}>
        <div css={label}>매입세액</div>
        <PrimaryInput prefix="￦" value={totalPurchaseVat} readOnly />
      </div>
      <div css={formItem}>
        <div css={label}>합계</div>
        <PrimaryInput prefix="￦" value={totalPurchasePrice} readOnly />
      </div>
      <div css={buttonBlock}>
        <PrimaryButton onClick={onReset}>초기화</PrimaryButton>
        <PrimaryButton onClick={onClick}>추가하기</PrimaryButton>
      </div>
    </div>
  )
}

export default PurchaseGoodsAppendFormGroup

const formStyle = css``

const label = css`
  font-size: 0.75rem;
  font-weight: bold;
`
const supplied = css`
  display: flex;
`

const suppliedFormItem = css`
  & + & {
    margin-left: 0.5rem;
  }
`

const purchased = css`
  display: flex;
`

const purchasedFormItem = css`
  & + & {
    margin-left: 0.5rem;
  }
`

const purchaseInput = css`
  display: flex;
`

const purchaseInputFormItem = css`
  width: 100%;
  & + & {
    margin-left: 0.5rem;
  }
`

const formItem = css``
const inputStyle = css``

const buttonBlock = css`
  margin-top: 0.5rem;
`
