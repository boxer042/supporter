import React, { useState } from 'react'
import PrimaryInput from '../PrimaryInput/PrimaryInput'
import Select from 'react-select'
import { css } from '@emotion/react'

export type PurchaseGoodsAppendFormGroupProps = {}

function PurchaseGoodsAppendFormGroup({}: PurchaseGoodsAppendFormGroupProps) {
  const [test, setTest] = useState('')

  return (
    <div css={formStyle}>
      <br />
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
