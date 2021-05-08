import React, { useState } from 'react'

export type PurchaesProps = {}

function PurchaesTest({}: PurchaesProps) {
  const [value, setValue] = useState<number>(0)

  return (
    <div>
      <h1>테스트</h1>
      <div>
        <input
          value={value}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setValue(parseInt(e.target.value) || 0)
          }
        />
        <input value={value * 2} />
      </div>
    </div>
  )
}

export default PurchaesTest

// import { css } from '@emotion/react'
// import React, { useCallback, useEffect, useState } from 'react'
// import { useCurrentAccountsState } from '../../atoms/selectedAccountsState'
// import Input from '../Input/Input'
// import SearchedAccountsInput from '../Search/SearchedAccounts/SearchedAccountsInput'
// import SearchedPurchasesProductsInput from '../Search/SearchedPurchasesProducts/SearchedPurchasesProductsInput'
// import { useCurrentPruchasesProductState } from './../../atoms/purchasesState'
// import useFormattedNumber from './../../hooks/useFormattedNumber'

// type PurchasesProductsInputsProps = {
//   stock: number
//   unitPrice: string
//   unitPriceVat: string
//   unitPriceDiscount: string
//   priceDiscount: string
//   price: string
//   priceVat: string
//   totalPrice: string
// }
// export type PurchasesAddProps = {}

// function PurchasesAdd({}: PurchasesAddProps) {
//   const currentPurchasesProduct = useCurrentPruchasesProductState()
//   const [value, onChangeNumber] = useFormattedNumber(0)
//   const [inputs, setInputs] = useState<PurchasesProductsInputsProps>({
//     stock: '0',
//     unitPrice: '0',
//     unitPriceVat: '0',
//     unitPriceDiscount: '0',
//     priceDiscount: '0',
//     price: '0',
//     priceVat: '0',
//     totalPrice: '0',
//   })

//   useEffect(() => {
//     const getCurrentPurchasesProduct = async () => {
//       const data = currentPurchasesProduct
//       if (data.name === '' || data.name.length === 0) {
//         return
//       }
//       //   setInputs({
//       //     stock: '0',
//       //     unitPrice: data.unit_price.toLocaleString(),
//       //     unitPriceVat: (data.unit_price * 0.1).toLocaleString(),
//       //     unitPriceDiscount: data.unit_price_discount.toLocaleString(),
//       //     priceDiscount: '0',
//       //     price: data.price.toLocaleString(),
//       //     priceVat: data.price_vat.toLocaleString(),
//       //     totalPrice: data.total_price.toLocaleString(),
//       //   })
//     }
//     getCurrentPurchasesProduct()
//   }, [currentPurchasesProduct, setInputs])

//   const onChange = useCallback(
//     (e: React.ChangeEvent<HTMLInputElement>) => {
//       const { value, name } = e.target
//       // const number = parseInt(value.replace(/[^\d]+/g, ''), 10)
//       // if (isNaN(number)) {
//       //   setInputs({ ...inputs, [name]: '0' })
//       //   return
//       // }
//       setInputs({
//         ...inputs,
//         // [name]: number.toLocaleString(),
//         [name]: value,
//       })
//     },
//     [inputs, setInputs]
//   )

//   return (
//     <div css={block}>
//       <div css={formBlock}>
//         <div css={formItem}>
//           <div css={itemName}>거래처 선택</div>
//           <SearchedAccountsInput css={itemInput} />
//         </div>
//         <div css={formItem}>
//           <div css={itemName}>구매 상품</div>
//           <SearchedPurchasesProductsInput />
//         </div>
//         <div css={formItem}>
//           <div css={itemName}>구매 수량</div>
//           <Input
//             css={itemInput}
//             name="stock"
//             value={inputs.stock}
//             onChange={onChange}
//           />
//         </div>
//         <div css={formItem}>
//           <div css={itemName}>구매처 단가</div>
//           <Input
//             css={itemInput}
//             name="unitPrice"
//             value={inputs.unitPrice}
//             onChange={onChange}
//           />
//         </div>
//         <div css={formItem}>
//           <div css={itemName}>구매처 단가 세액</div>
//           <Input
//             css={itemInput}
//             name="unitPriceVat"
//             value={inputs.unitPriceVat}
//             onChange={onChange}
//             disabled
//           />
//         </div>
//         <div css={formItem}>
//           <div css={itemName}>개당 할인 </div>
//           <Input
//             css={itemInput}
//             name="unitPriceDiscount"
//             value={inputs.unitPriceDiscount}
//             disabled
//           />
//         </div>
//         <div css={formItem}>
//           <div css={itemName}>토탈 할인 </div>
//           <Input
//             css={itemInput}
//             name="priceDiscount"
//             value={inputs.priceDiscount}
//             onChange={onChange}
//           />
//         </div>
//         <div css={formItem}>
//           <div css={itemName}>구매 가격</div>
//           <Input
//             css={itemInput}
//             name="price"
//             value={inputs.price}
//             onChange={onChange}
//           />
//         </div>
//         <div css={formItem}>
//           <div css={itemName}>구매 가격 세액</div>
//           <Input
//             css={itemInput}
//             name="priceVat"
//             value={inputs.priceVat}
//             disabled
//           />
//         </div>
//         <div css={formItem}>
//           <div css={itemName}>구매 총 가격</div>
//           <Input
//             css={itemInput}
//             name="totalPrice"
//             value={inputs.totalPrice}
//             disabled
//           />
//         </div>
//       </div>
//     </div>
//   )
// }

// export default PurchasesAdd

// const block = css``
// const formBlock = css``
// const formItem = css`
//   margin-top: 0.75rem;
// `
// const itemName = css``
// const itemInput = css``
