import React, { useState } from 'react'
import PrimaryInput from '../PrimaryInput/PrimaryInput'
import { css } from '@emotion/react'
import InputSelect from '../InputSelect/InputSelect'
import PurchaseGoodsAppendSearchedAccount from './PurchaseGoodsAppendSearchedAccount'

const data = [
  {
    name: '선일농기계',
    office: '023334444',
  },
  {
    name: '홈앤가든',
    office: '023334444',
  },
  {
    name: '(주)범양',
    office: '023334444',
  },
  {
    name: '(주)범양',
    office: '023334444',
  },
  {
    name: '(주)범양',
    office: '023334444',
  },
  {
    name: '(주)범양',
    office: '023334444',
  },
  {
    name: '(주)범양',
    office: '023334444',
  },
  {
    name: '(주)범양',
    office: '023334444',
  },
  {
    name: '(주)범양',
    office: '023334444',
  },
]

export type PurchaseGoodsAppendFormGroupProps = {}

function PurchaseGoodsAppendFormGroup({}: PurchaseGoodsAppendFormGroupProps) {
  const [keyword, setKeyword] = useState('')
  const [test, setTest] = useState('')
  console.log(keyword)
  return (
    <div css={formStyle}>
      <InputSelect results={data} keyword={keyword} />
      <PurchaseGoodsAppendSearchedAccount />
      <br />
      <PrimaryInput
        prefix="￦"
        clearButton
        value={test}
        setValue={setTest}
        placeholder="취급 상품 검색"
        onChange={(e) => setTest(e.target.value)}
      />
    </div>
  )
}

export default PurchaseGoodsAppendFormGroup

const formStyle = css``
