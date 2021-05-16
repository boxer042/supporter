import { css } from '@emotion/react'
import React, { useEffect, useState } from 'react'
import PrimaryInput from '../../PrimaryInput/PrimaryInput'

export type SaleGoodsAppendPriceFormProps = {
  costValueSum: number
  costVatSum: number
  costPriceSum: number
}

function SaleGoodsAppendPriceForm({
  costValueSum,
  costVatSum,
  costPriceSum,
}: SaleGoodsAppendPriceFormProps) {
  const [recentInputs, setRecentInputs] = useState({
    recentValue: '0',
    recentVat: '0',
    recentPrice: '0',
  })

  const [margin, setMargin] = useState('0')
  const [marginCard, setMarginCard] = useState('0')
  const [marginRate, setMarginRate] = useState('0')
  const [marginCardRate, setMarginCardRate] = useState('0')
  const [saleValue, setSaleValue] = useState('0')
  const [salePrice, setSalePrice] = useState('0')

  const { recentValue, recentVat, recentPrice } = recentInputs

  useEffect(() => {
    if (!costValueSum && !costVatSum && !costPriceSum) {
      return
    }
    setRecentInputs({
      recentValue: costValueSum.toLocaleString(),
      recentVat: costVatSum.toLocaleString(),
      recentPrice: costPriceSum.toLocaleString(),
    })
  }, [costValueSum, costVatSum, costPriceSum])

  useEffect(() => {
    const number = parseInt(salePrice.replace(/\$\s?|(,*)/g, ''))
    setMargin(((number - costPriceSum) / 1.1).toLocaleString())
    setMarginCard(
      ((number - number * 0.008 - costPriceSum) / 1.1).toLocaleString()
    )
  }, [salePrice])

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    const number = parseInt(value.replace(/\$\s?|(,*)/g, ''))
  }

  const onChangeMarginRate = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    setMarginRate(value)
    setSaleValue(
      (costValueSum / (1 - parseFloat(value) / 100)).toLocaleString()
    )
    setSalePrice(
      (costPriceSum / (1 - parseFloat(value) / 100)).toLocaleString()
    )
  }

  const onChangeSaleValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    const number = parseInt(value.replace(/\$\s?|(,*)/g, ''))
    if (isNaN(number)) {
      setSaleValue('0')
      return
    }
    const marginRate = (1 - costValueSum / number) * 100
    const marginCardRate = (1 - costValueSum / (number - number * 0.008)) * 100

    setSaleValue(number.toLocaleString())
    setMarginRate(marginRate.toLocaleString())
    setMarginCardRate(marginCardRate.toLocaleString())
    setSalePrice((number * 1.1).toLocaleString())
  }

  const onChangeSalePrice = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    const marginRate = (1 - costPriceSum / parseInt(value)) * 100
    setSalePrice(value)
    setMarginRate(marginRate.toLocaleString())
  }

  return (
    <div css={block}>
      <div css={recentForm}>
        <div>
          <div>현재 매입가액</div>
          <PrimaryInput name="recentValue" value={recentValue} />
        </div>
        <div>
          <div>현재 매입세액</div>
          <PrimaryInput name="recentVat" value={recentVat} />
        </div>
        <div>
          <div>현재 매입가격</div>
          <PrimaryInput name="recentPrice" value={recentPrice} />
        </div>
      </div>
      <div css={saleForm}>
        <div>
          <div>공급가액</div>
          <PrimaryInput value={saleValue} onChange={onChangeSaleValue} />
        </div>
        <div>
          <div>공급세액</div>
          <PrimaryInput />
        </div>
        <div>
          <div>공급대가</div>
          <PrimaryInput value={salePrice} onChange={onChangeSalePrice} />
        </div>
      </div>

      <div>
        <div css={marginStyle}>
          <div>
            <div>마진(현금)</div>
            <PrimaryInput value={margin} />
          </div>
          <div>
            <div>납부 세액</div>
            <PrimaryInput value={5000} />
          </div>
          <div>
            <div>마진율</div>
            <PrimaryInput value={marginRate} onChange={onChangeMarginRate} />
          </div>
        </div>
        <div css={marginCardStyle}>
          <div>
            <div>마진(카드수수료 0.8)</div>
            <PrimaryInput value={marginCard} />
          </div>
          <div>
            <div>납부 세액(카드)</div>
            <PrimaryInput value={4856} />
          </div>
          <div>
            <div>마진율(카드)</div>
            <PrimaryInput
              value={marginCardRate}
              onChange={onChangeMarginRate}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default SaleGoodsAppendPriceForm

const block = css`
  margin-top: 2rem;
`
const recentForm = css`
  display: flex;
`
const marginStyle = css`
  display: flex;
`
const marginCardStyle = css`
  display: flex;
`

const saleForm = css`
  display: flex;
`
