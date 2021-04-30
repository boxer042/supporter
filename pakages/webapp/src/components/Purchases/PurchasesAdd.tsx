import { css } from '@emotion/react'
import React, { useCallback, useEffect, useState } from 'react'
import { useCurrentAccountsState } from '../../atoms/selectedAccountsState'
import Input from '../Input/Input'
import SearchedAccountsInput from '../Search/SearchedAccounts/SearchedAccountsInput'
import SearchedPurchasesProductsInput from '../Search/SearchedPurchasesProducts/SearchedPurchasesProductsInput'
import { useCurrentPruchasesProductState } from './../../atoms/purchasesState'
import useFormattedNumber from './../../hooks/useFormattedNumber'

type PurchasesProductsInputsProps = {
  stock?: string
  unitPrice: string
  unitPriceVat: string
  unitPriceDiscount: string
  priceDiscount?: string
  price: string
  priceVat: string
  totalPrice: string
}
export type PurchasesAddProps = {}

function PurchasesAdd({}: PurchasesAddProps) {
  const currentPurchasesProduct = useCurrentPruchasesProductState()
  const [value, onChangeNumber] = useFormattedNumber(0)
  const [test, setTest] = useState()
  const [test2, setTest2] = useState<any>()
  const [inputs, setInputs] = useState<PurchasesProductsInputsProps>({
    stock: '',
    unitPrice: '',
    unitPriceVat: '',
    unitPriceDiscount: '',
    priceDiscount: '',
    price: '',
    priceVat: '',
    totalPrice: '',
  })

  useEffect(() => {
    const getCurrentPurchasesProduct = async () => {
      const data = currentPurchasesProduct
      if (data.name === '' || data.name.length === 0) {
        return
      }
      //   setInputs({
      //     stock: '0',
      //     unitPrice: data.unit_price.toLocaleString(),
      //     unitPriceVat: (data.unit_price * 0.1).toLocaleString(),
      //     unitPriceDiscount: data.unit_price_discount.toLocaleString(),
      //     priceDiscount: '0',
      //     price: data.price.toLocaleString(),
      //     priceVat: data.price_vat.toLocaleString(),
      //     totalPrice: data.total_price.toLocaleString(),
      //   })
    }
    getCurrentPurchasesProduct()
  }, [currentPurchasesProduct, setInputs])

  const onChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { value, name } = e.target
      //   const number = parseInt(value.replace(/[^\d]+/g, ''), 10)
      //   if (isNaN(number)) {
      //     setInputs({ ...inputs, [name]: 0 })
      //     return
      //   }
      console.log(name)
      console.log(value)
      setInputs({
        ...inputs,
        [name]: value,
      })
    },
    [inputs, setInputs]
  )

  console.log('test : ' + test)
  console.log('test2 : ' + test2)
  return (
    <div css={block}>
      <div css={formBlock}>
        <div css={formItem}>
          <div css={itemName}>거래처 선택</div>
          <SearchedAccountsInput css={itemInput} />
        </div>
        <input
          name="a"
          value={test}
          onChange={(e: any) => {
            setTest(e.target.value)

            setTest2(e.target.value * 0.1)
          }}
        />
        <input name="b" value={test2} />
        <div css={formItem}>
          <div css={itemName}>구매 상품</div>
          <SearchedPurchasesProductsInput />
        </div>
        <div css={formItem}>
          <div css={itemName}>구매 수량</div>
          <Input
            css={itemInput}
            name="stock"
            value={inputs.stock}
            onChange={onChange}
          />
        </div>
        <div css={formItem}>
          <div css={itemName}>구매처 단가</div>
          <Input
            css={itemInput}
            name="unitPrice"
            value={inputs.unitPrice}
            onChange={onChange}
          />
        </div>
        <div css={formItem}>
          <div css={itemName}>구매처 단가 세액</div>
          <Input
            css={itemInput}
            name="unitPriceVat"
            value={parseInt(inputs.unitPrice) * 0.1}
            onChange={onChange}
          />
        </div>
        <div css={formItem}>
          <div css={itemName}>개당 할인 </div>
          <Input
            css={itemInput}
            name="unitPriceDiscount"
            value={inputs.unitPriceDiscount}
            disabled
          />
        </div>
        <div css={formItem}>
          <div css={itemName}>토탈 할인 </div>
          <Input
            css={itemInput}
            name="priceDiscount"
            value={inputs.priceDiscount}
            onChange={onChange}
          />
        </div>
        <div css={formItem}>
          <div css={itemName}>구매 가격</div>
          <Input
            css={itemInput}
            name="price"
            value={inputs.price}
            onChange={onChange}
          />
        </div>
        <div css={formItem}>
          <div css={itemName}>구매 가격 세액</div>
          <Input
            css={itemInput}
            name="priceVat"
            value={inputs.priceVat}
            disabled
          />
        </div>
        <div css={formItem}>
          <div css={itemName}>구매 총 가격</div>
          <Input
            css={itemInput}
            name="totalPrice"
            value={inputs.totalPrice}
            disabled
          />
        </div>
      </div>
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
