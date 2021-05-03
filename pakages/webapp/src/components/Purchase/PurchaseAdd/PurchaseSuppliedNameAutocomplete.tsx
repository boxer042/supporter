import React, { useRef } from 'react'
import useOnClickOutside from 'use-onclickoutside'
import { SearchAccountsHandingGoodsResult } from '../../../lib/api/accounts/searchAccounts'
import { css } from '@emotion/react'
import PuchaseSuppliedNameList from './PurchaseSuppliedNameList'

type PurchaseSuppliedNameAutocompleteProps = {
  keyword: string
  results?: SearchAccountsHandingGoodsResult[] | null
  visible: boolean
  onClose: Parameters<typeof useOnClickOutside>[1]
}

export default function PurchaseSuppliedNameAutocomplete({
  keyword,
  results,
  visible,
  onClose,
}: PurchaseSuppliedNameAutocompleteProps) {
  const ref = useRef<HTMLDivElement>(null)

  useOnClickOutside(ref, onClose)

  if (!visible || !results || results.length === 0)
    return (
      <div css={itemBlock}>{keyword.length > 0 && `+ ${keyword} 추가하기`}</div>
    )

  return (
    <div css={block}>
      <div css={itemBlock}>
        {keyword && <div> + {keyword} 추가하기</div>}
        {results.map((result, i) => (
          <PuchaseSuppliedNameList
            index={i}
            goodsId={result.id}
            include={result.include}
            stock={result.stock}
            suppliedName={result.supplied_name}
            suppliedValue={result.supplied_value}
            suppliedVat={result.supplied_vat}
            suppliedPrice={result.supplied_price}
            suppliedVauleDiscount={result.supplied_value_discount}
            purchaseValue={result.purchase_price}
            purchaseVat={result.purchase_vat}
            purchasePrice={result.purchase_price}
          />
        ))}
      </div>
    </div>
  )
}

const block = css`
  position: relative;
`
const itemBlock = css`
  position: absolute;
  padding-top: 0.375rem;
  padding-bottom: 0.375rem;
  background: #fff;
  width: 100%;
  max-height: 15rem;
  box-shadow: 0rem 0.25rem 0.5rem rgba(0, 0, 0, 0.07);
  border-radius: 0.32rem;
  overflow-y: auto;
  z-index: 10;
`
