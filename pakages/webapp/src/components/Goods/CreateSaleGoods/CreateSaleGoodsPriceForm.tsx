import { css } from '@emotion/react'
import React, { useEffect, useState } from 'react'
import PrimaryInput from '../../PrimaryInput/PrimaryInput'
import {
  PurchasedGoodsRecoilType,
  SaleGoodsRecoilType,
} from '../../../atoms/createSaleGoodsRecoil'
import { replaceStringNumInt } from '../../../lib/api/utils/replaceStringNumInt'
import { replaceFixedNum } from './../../../lib/api/utils/replaceFixedNum'
import { SetterOrUpdater } from 'recoil'

export type CreateSaleGoodsPriceFormProps = {
  searchPurchasedGoods: PurchasedGoodsRecoilType
  saleGoods: SaleGoodsRecoilType
  setSaleGoods: SetterOrUpdater<SaleGoodsRecoilType>
}

function CreateSaleGoodsPriceForm({
  searchPurchasedGoods,
  saleGoods,
  setSaleGoods,
}: CreateSaleGoodsPriceFormProps) {
  const [applyInputs, setApplyInputs] = useState({
    applyValue: '',
    applyVat: '',
    applyPrice: '',
  })

  const [margin, setMargin] = useState('0')
  const [marginCard, setMarginCard] = useState('0')
  const [marginRate, setMarginRate] = useState('0')
  const [marginCardRate, setMarginCardRate] = useState('0')
  const [saleValue, setSaleValue] = useState('0')
  const [salePrice, setSalePrice] = useState('0')
  const [cardFeeRate, setCardFeeRate] = useState('0.8')

  const { applyValue, applyVat, applyPrice } = applyInputs

  const saleVatCal = replaceFixedNum(replaceStringNumInt(saleValue) * 0.1, 0)
  const marginVatCal = replaceFixedNum(replaceStringNumInt(margin) * 0.1)
  const marginCardVatCal = replaceFixedNum(
    replaceStringNumInt(marginCard) * 0.1
  )
  const cardFeeCal = replaceFixedNum(
    replaceStringNumInt(saleValue) * (parseFloat(cardFeeRate) / 100)
  )

  useEffect(() => {
    // 선택한 구매상품 가격 적용
    setApplyInputs({
      applyValue: searchPurchasedGoods.purchase_value
        .toFixed()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ','),
      applyVat: searchPurchasedGoods.purchase_vat
        .toFixed()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ','),
      applyPrice: searchPurchasedGoods.purchase_price
        .toFixed()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ','),
    })
  }, [searchPurchasedGoods])

  useEffect(() => {
    if (!searchPurchasedGoods) {
      return
    }
    setSaleGoods({
      ...saleGoods,
      purchased_goods: searchPurchasedGoods.id,
      apply_purchased_value: replaceStringNumInt(applyValue),
      apply_purchased_vat: replaceStringNumInt(applyVat),
      apply_purchased_price: replaceStringNumInt(applyPrice),
      sale_value: replaceStringNumInt(saleValue),
      sale_vat: replaceStringNumInt(saleVatCal),
      sale_price: replaceStringNumInt(salePrice),
      margin: replaceStringNumInt(margin),
      margin_card: replaceStringNumInt(marginCard),
      margin_rate: parseFloat(marginRate.replace(/\$\s?|(,*)/g, '')),
      margin_card_rate: parseFloat(marginCardRate.replace(/\$\s?|(,*)/g, '')),
      card_fee: replaceStringNumInt(cardFeeCal),
    })
  }, [searchPurchasedGoods, applyPrice, salePrice])

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target

    switch (name) {
      case 'cardFeeRate':
        if (isNaN(parseFloat(value))) {
          setCardFeeRate('')
          return
        }
        setCardFeeRate(value)
        return

      case 'saleValue':
        if (applyInputs.applyValue === '0') {
          return
        }

        const number = replaceStringNumInt(value)
        const applyValueNum = replaceStringNumInt(applyValue)

        if (isNaN(number)) {
          setSaleValue('0')
          setSalePrice('0')
          return
        }
        const marginCal = number - applyValueNum
        const marginCardCal =
          number - number * (parseFloat(cardFeeRate) / 100) - applyValueNum
        const marginRate = (1 - applyValueNum / number) * 100
        const marginCardRate =
          (1 -
            applyValueNum /
              (number - number * (parseFloat(cardFeeRate) / 100))) *
          100

        setSaleValue(number.toLocaleString())
        setSalePrice(replaceFixedNum(number * 1.1))
        setMargin(replaceFixedNum(marginCal))
        setMarginCard(replaceFixedNum(marginCardCal))
        setMarginRate(replaceFixedNum(marginRate, 2))
        setMarginCardRate(replaceFixedNum(marginCardRate, 2))
        return

      default:
        break
    }
  }

  return (
    <div css={block}>
      <div css={applyInput}>
        <div css={title}>구매 가격</div>
        <div css={inputGroup}>
          <div css={labelStyle}>구매가액</div>
          <PrimaryInput
            prefix="￦"
            css={inputStyle}
            value={applyValue}
            readOnly
          />
        </div>
        <div css={inputGroup}>
          <div css={labelStyle}>구매세액</div>
          <PrimaryInput
            prefix="￦"
            css={inputStyle}
            value={applyVat}
            readOnly
          />
        </div>
        <div css={inputGroup}>
          <div css={labelStyle}>구매가격</div>
          <PrimaryInput
            prefix="￦"
            css={inputStyle}
            value={applyPrice}
            readOnly
          />
        </div>
      </div>
      <div css={saleInput}>
        <div css={title}>판매 가격</div>
        <div css={inputGroup}>
          <div css={labelStyle}>판매가액</div>
          <PrimaryInput
            prefix="￦"
            css={inputStyle}
            name="saleValue"
            value={saleValue}
            onChange={onChange}
          />
        </div>
        <div css={inputGroup}>
          <div css={labelStyle}>판매세액</div>
          <PrimaryInput
            prefix="￦"
            css={inputStyle}
            value={saleVatCal}
            readOnly
          />
        </div>
        <div css={inputGroup}>
          <div css={labelStyle}>판매가격</div>
          <PrimaryInput
            prefix="￦"
            css={inputStyle}
            name="salePrice"
            value={salePrice}
            readOnly
          />
        </div>
      </div>
      <div css={saleInput}>
        <div css={title}>현금 마진</div>
        <div css={inputGroup}>
          <div css={labelStyle}>마진</div>
          <PrimaryInput
            prefix="￦"
            css={inputStyle}
            name="margin"
            value={margin}
            readOnly
          />
        </div>
        <div css={inputGroup}>
          <div css={labelStyle}>납부 세액</div>
          <PrimaryInput
            prefix="￦"
            css={inputStyle}
            value={marginVatCal}
            readOnly
          />
        </div>
        <div css={inputGroup}>
          <div css={labelStyle}>마진율</div>
          <PrimaryInput
            prefix="%"
            css={inputStyle}
            value={marginRate}
            readOnly
          />
        </div>
      </div>
      <div css={saleInput}>
        <div css={title}>카드 마진</div>
        <div css={inputGroup}>
          <div css={labelStyle}>마진</div>
          <PrimaryInput
            prefix="￦"
            css={inputStyle}
            name="marginCardRate"
            value={marginCard}
            readOnly
          />
        </div>
        <div css={inputGroup}>
          <div css={labelStyle}>납부 세액</div>
          <PrimaryInput
            prefix="￦"
            css={inputStyle}
            value={marginCardVatCal}
            readOnly
          />
        </div>
        <div css={inputGroup}>
          <div css={labelStyle}>마진율</div>
          <PrimaryInput
            prefix="%"
            css={inputStyle}
            value={marginCardRate}
            readOnly
          />
        </div>
      </div>
      <div css={saleInput}>
        <div css={title}>카드 옵션</div>
        <div css={inputGroup}>
          <div css={labelStyle}>카드 수수료율</div>
          <PrimaryInput
            prefix="%"
            css={inputStyle}
            name="cardFeeRate"
            value={cardFeeRate}
            onChange={onChange}
          />
        </div>
      </div>
      <div css={saleInput}>
        <div css={title}>카드 옵션</div>
        <div css={inputGroup}>
          <div css={labelStyle}>카드 수수료</div>
          <PrimaryInput
            prefix="￦"
            css={inputStyle}
            value={cardFeeCal}
            readOnly
          />
        </div>
      </div>
    </div>
  )
}

export default CreateSaleGoodsPriceForm

const block = css`
  margin-top: 1rem;
  display: flex;
  flex-direction: column;
  width: 100%;
`
const title = css`
  display: flex;
  align-items: center;
  margin-top: 17px;
  margin-right: 10px;
  width: 5.35rem;
`
const inputGroup = css`
  & + & {
    margin-left: 1.125rem;
  }
`
const labelStyle = css`
  margin-bottom: 5px;
`
const inputStyle = css``

const applyInput = css`
  display: flex;
`
const saleInput = css`
  display: flex;
  margin-top: 0.5rem;
`
