import React, { useState } from 'react'
import useSearchPurchasesProductsQuery from '../../../hooks/query/useSearchPurchasesProductsQuery'
import Input from '../../Input/Input'
import { usePurchasesProductActions } from './../../../atoms/purchasesState'

export type SearchedPurchasesProductsInputProps = {}

function SearchedPurchasesProductsInput({}: SearchedPurchasesProductsInputProps) {
  const [keyword, setKeyword] = useState('')
  const { data } = useSearchPurchasesProductsQuery(keyword, {
    enabled: keyword !== '',
  })
  const { append } = usePurchasesProductActions()

  const onSelect = ({
    id,
    name,
    stock,
    unit_price,
    unit_price_discount,
    price,
    price_vat,
    total_price,
  }: {
    accountId?: number
    id?: number
    name: string
    stock?: number
    unit_price?: number
    unit_price_discount?: number
    price?: number
    price_vat?: number
    total_price?: number
  }) => {
    append({
      id,
      name,
      stock,
      unit_price,
      unit_price_discount,
      price,
      price_vat,
      total_price,
    })
    setKeyword(name)
  }

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value)
  }

  return (
    <div>
      <Input
        value={keyword}
        onChange={onChange}
        onClick={() =>
          onSelect({
            name: keyword,
          })
        }
      />
      {data?.map((result, i) => (
        <div key={i}>
          <div
            onClick={() =>
              onSelect({
                id: result.id,
                name: result.name,
                stock: result.stock,
                unit_price: result.unit_price,
                unit_price_discount: result.unit_price_discount,
                price: result.price,
                price_vat: result.price_vat,
                total_price: result.total_price,
              })
            }
          >
            {result.name}
          </div>
        </div>
      ))}
    </div>
  )
}

export default SearchedPurchasesProductsInput
