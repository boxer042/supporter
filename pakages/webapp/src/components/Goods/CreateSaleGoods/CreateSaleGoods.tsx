import { css } from '@emotion/react'
import React, { useEffect } from 'react'
import { usePurchasedGoodsRecoilState } from '../../../atoms/createSaleGoodsRecoil'
import PrimaryInput from '../../PrimaryInput/PrimaryInput'
import CreateSaleGoodsPriceForm from './CreateSaleGoodsPriceForm'
import SearchPurchasedGoods from './SearchPurchasedGoods'
import { useSaleGoodsState } from './../../../atoms/createSaleGoodsRecoil'
import palette from '../../../foundations/palette'
import PrimaryButton from '../../PrimaryButton/PrimaryButton'
import createSaleGoods from '../../../lib/api/goods/createSaleGoods'

export type CreateSaleGoodsProps = {}

function CreateSaleGoods({}: CreateSaleGoodsProps) {
  const [searchPurchasedGoods, setSearchPurchasedGoods] =
    usePurchasedGoodsRecoilState()

  const [saleGoods, setSaleGoods] = useSaleGoodsState()

  useEffect(() => {}, [])

  const onChangeType = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target
    setSaleGoods({
      ...saleGoods,
      type: value,
    })
  }
  const onClick = () => {
    if (saleGoods.name.length === 0) {
      return
    }
    createSaleGoods(saleGoods)
    console.log('추가')
  }

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setSaleGoods({
      ...saleGoods,
      [name]: value,
    })
  }

  return (
    <div css={block}>
      <h1>상품 생성</h1>
      <div css={gridBlock}>
        <div css={leftBlock}>
          <div css={inputGroup}>
            <div css={labelStyle}>상품명</div>
            <PrimaryInput
              css={inputStyle}
              name="name"
              value={saleGoods.name}
              onChange={onChange}
            />
          </div>
          <div css={inputGroup}>
            <div css={labelStyle}>브랜드</div>
            <PrimaryInput
              css={inputStyle}
              name="brand"
              value={saleGoods.brand}
              onChange={onChange}
            />
          </div>
          <div css={inputGroup}>
            <div css={labelStyle}>제조사</div>
            <PrimaryInput
              css={inputStyle}
              name="name"
              value={saleGoods.name}
              onChange={onChange}
            />
          </div>
          <PrimaryButton onClick={onClick}>상품 추가하기</PrimaryButton>
        </div>
        <div css={rightBlock}>
          <div css={selectType}>
            <div css={selectTypeGroup}>
              <div css={labelStyle}>상품타입</div>
              <select
                css={selectTypeStyle}
                value={saleGoods.type}
                onChange={onChangeType}
              >
                <option value="단일상품">단일상품</option>
                <option value="세트상품">세트상품</option>
              </select>
            </div>
            {saleGoods.type === '단일상품' ? (
              <div css={selectTypeInputGroup}>
                <div css={labelStyle}>구매상품 연결</div>
                <SearchPurchasedGoods
                  searchPurchasedGoods={searchPurchasedGoods}
                  setSearchPurchasedGoods={setSearchPurchasedGoods}
                />
              </div>
            ) : (
              '조립상품'
            )}
          </div>

          <CreateSaleGoodsPriceForm
            searchPurchasedGoods={searchPurchasedGoods}
            saleGoods={saleGoods}
            setSaleGoods={setSaleGoods}
          />
        </div>
      </div>
    </div>
  )
}

export default CreateSaleGoods

const block = css`
  padding-left: 1rem;
  padding-right: 1rem;
  display: flex;
  flex-direction: column;
`

const gridBlock = css`
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 2rem;
`

const leftBlock = css``
const rightBlock = css``

const inputGroup = css`
  & + & {
    margin-top: 1.125rem;
  }
`
const labelStyle = css`
  margin-bottom: 5px;
`
const inputStyle = css``

const selectType = css`
  display: flex;
`

const selectTypeGroup = css``
const selectTypeStyle = css`
  margin-right: 0.5rem;
  height: 1.875rem;
  background: ${palette.grey[50]};
  border: 1px solid ${palette.base['line']};
  border-radius: 5px;
  padding-left: 0.5rem;
  padding-right: 0.5rem;
  font-size: 0.75rem;
  padding-top: 2px;
`
const selectTypeInputGroup = css`
  width: 100%;
`
