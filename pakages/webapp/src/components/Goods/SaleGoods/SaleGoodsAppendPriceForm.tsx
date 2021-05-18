import { css } from '@emotion/react'
import React, { useEffect, useState } from 'react'
import PrimaryInput from '../../PrimaryInput/PrimaryInput'
import { replaceStringNumInt } from '../../../lib/api/utils/replaceStringNumInt'
import { SetterOrUpdater } from 'recoil'
import {
  saleGoodsType,
  SelectedPurchasedGoodsType,
} from '../../../atoms/saleGoodsState'

export type SaleGoodsAppendPriceFormProps = {
  costValueSum: number
  costVatSum: number
  costPriceSum: number
  goodsResult: saleGoodsType
  setSaleGoods: SetterOrUpdater<saleGoodsType>
}

function SaleGoodsAppendPriceForm({
  costValueSum,
  costVatSum,
  costPriceSum,
  goodsResult,
  setSaleGoods,
}: SaleGoodsAppendPriceFormProps) {
  const [applyInputs, setapplyInputs] = useState({
    applyValue: '0',
    applyVat: '0',
    applyPrice: '0',
  })

  const [marginRate, setMarginRate] = useState('0')
  const [marginCardRate, setMarginCardRate] = useState('0')
  const [saleValue, setSaleValue] = useState('0')
  const [salePrice, setSalePrice] = useState('0')
  const [cardFeeRate, setCardFeeRate] = useState('0.008')

  const { applyValue, applyVat, applyPrice } = applyInputs

  const marginCal = (replaceStringNumInt(saleValue) - costValueSum)
    .toFixed()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  const marginCardCal = (
    replaceStringNumInt(saleValue) -
    replaceStringNumInt(saleValue) * 0.008 -
    costValueSum
  )
    .toFixed()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  const saleVatCal = (replaceStringNumInt(saleValue) * 0.1)
    .toFixed()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ',')

  const marginVatCal = ((replaceStringNumInt(saleValue) - costValueSum) * 0.1)
    .toFixed()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  const marginCardVatCal = (
    (replaceStringNumInt(saleValue) -
      replaceStringNumInt(saleValue) * 0.008 -
      costValueSum) *
    0.1
  )
    .toFixed()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  const cardFeeCal = (replaceStringNumInt(salePrice) * 0.008)
    .toFixed()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ',')

  useEffect(() => {
    setapplyInputs({
      applyValue: costValueSum.toLocaleString(),
      applyVat: costVatSum.toLocaleString(),
      applyPrice: costPriceSum.toLocaleString(),
    })
  }, [costValueSum, costVatSum, costPriceSum])

  useEffect(() => {
    setSaleGoods({
      ...goodsResult,
      apply_purchased_value: replaceStringNumInt(applyValue),
      apply_purchased_vat: replaceStringNumInt(applyVat),
      apply_purchased_price: replaceStringNumInt(applyPrice),
      sale_value: replaceStringNumInt(saleValue),
      sale_vat: replaceStringNumInt(saleVatCal),
      sale_price: replaceStringNumInt(salePrice),
      margin: replaceStringNumInt(marginCal),
      margin_card: replaceStringNumInt(marginCardCal),
      margin_rate: parseFloat(marginRate.replace(/\$\s?|(,*)/g, '')),
      margin_card_rate: parseFloat(marginCardRate.replace(/\$\s?|(,*)/g, '')),
      card_fee: replaceStringNumInt(cardFeeCal),
    })
  }, [
    applyValue,
    applyVat,
    applyPrice,
    saleValue,
    saleVatCal,
    salePrice,
    marginCal,
    marginCardCal,
    marginRate,
    marginCardRate,
    cardFeeCal,
  ])

  const onChangeMarginRate = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    const number = parseInt(value.replace(/\$\s?|(,*)/g, ''))
    if (isNaN(number)) {
      setMarginRate('0')
      return
    }
    setMarginRate(number.toLocaleString())
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
      setSalePrice('0')
      return
    }
    const marginRate = ((1 - costValueSum / number) * 100).toFixed(2)
    const marginCardRate = (
      (1 - costValueSum / (number - number * 0.008)) *
      100
    ).toFixed(2)

    setSaleValue(number.toLocaleString())
    setMarginRate(marginRate.toLocaleString())
    setMarginCardRate(marginCardRate.toLocaleString())
    setSalePrice((number * 1.1).toLocaleString())
  }

  const onChangeSalePrice = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    const number = parseInt(value.replace(/\$\s?|(,*)/g, ''))
    if (isNaN(number)) {
      setSalePrice('0')
      setSaleValue('0')
      return
    }
    setSalePrice(number.toLocaleString())
    setSaleValue((number / 1.1).toFixed().replace(/\B(?=(\d{3})+(?!\d))/g, ','))
    const marginRate = ((1 - costPriceSum / number) * 100).toFixed(2)
    const marginCardRate = (
      (1 - costPriceSum / (number - number * 0.008)) *
      100
    ).toFixed(2)
    setMarginRate(marginRate.toLocaleString())
    setMarginCardRate(marginCardRate.toLocaleString())
  }

  return (
    <div css={block}>
      <div css={applyForm}>
        <div css={item}>
          <div>구매가액</div>
          <PrimaryInput
            prefix="￦"
            name="applyValue"
            value={applyValue}
            readOnly
          />
        </div>
        <div css={item}>
          <div>구매세액</div>
          <PrimaryInput prefix="￦" name="applyVat" value={applyVat} readOnly />
        </div>
        <div css={item}>
          <div>구매가격</div>
          <PrimaryInput
            prefix="￦"
            name="applyPrice"
            value={applyPrice}
            readOnly
          />
        </div>
      </div>
      <div css={saleForm}>
        <div css={item}>
          <div>판매가액</div>
          <PrimaryInput
            prefix="￦"
            value={saleValue}
            onChange={onChangeSaleValue}
          />
        </div>
        <div css={item}>
          <div>판매세액</div>
          <PrimaryInput prefix="￦" value={saleVatCal} readOnly />
        </div>
        <div css={item}>
          <div>판매가격</div>
          <PrimaryInput
            prefix="￦"
            value={salePrice}
            onChange={onChangeSalePrice}
          />
        </div>
      </div>

      <div>
        <div css={marginStyle}>
          <div css={item}>
            <div>마진(현금)</div>
            <PrimaryInput prefix="￦" value={marginCal} readOnly />
          </div>
          <div css={item}>
            <div>납부 세액</div>
            <PrimaryInput prefix="￦" value={marginVatCal} readOnly />
          </div>
          <div css={item}>
            <div>마진율</div>
            <PrimaryInput
              prefix="%"
              value={marginRate}
              onChange={onChangeMarginRate}
            />
          </div>
        </div>
        <div css={marginCardStyle}>
          <div css={item}>
            <div>마진(카드수수료 0.8)</div>
            <PrimaryInput prefix="￦" value={marginCardCal} readOnly />
          </div>
          <div css={item}>
            <div>납부 세액(카드)</div>
            <PrimaryInput prefix="￦" value={marginCardVatCal} readOnly />
          </div>
          <div css={item}>
            <div>마진율(카드)</div>
            <PrimaryInput
              prefix="%"
              value={marginCardRate}
              onChange={onChangeMarginRate}
            />
          </div>
        </div>
        <div css={item}>
          <div>카드 수수료</div>
          <PrimaryInput prefix="￦" value={cardFeeCal} readOnly />
        </div>
      </div>
    </div>
  )
}

export default SaleGoodsAppendPriceForm

const block = css`
  margin-top: 2rem;
`
const applyForm = css`
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
const item = css`
  & + & {
    margin-left: 0.5rem;
  }
`
