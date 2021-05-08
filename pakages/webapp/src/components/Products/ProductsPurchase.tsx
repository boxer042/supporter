import { css } from '@emotion/react'
import React, { useEffect } from 'react'
import { useRecoilValue } from 'recoil'
import {
  testLength,
  useProductsPurchaseState,
} from '../../atoms/productsPurchaseState'
import palette from '../../foundations/palette'
import { getPurchaseProducts } from '../../lib/api/products/getPurchaseProducts'

export type ProductsPurchaseProps = {}

function ProductsPurchase(props: ProductsPurchaseProps) {
  const [productsPurchase, setProductsPurchase] = useProductsPurchaseState()
  const count = useRecoilValue(testLength)

  useEffect(() => {
    const getProductsPurchaseData = async () => {
      const data = await getPurchaseProducts()
      setProductsPurchase(data)
    }
    getProductsPurchaseData()
  }, [setProductsPurchase])

  return (
    <div>
      <div>공급받는 상품 총 수: {count}</div>
      <div>
        <table css={table}>
          <thead>
            <tr>
              <th>상품ID</th>
              <th>공급업체 상품명</th>
              <th>공급업체</th>
              <th>보유 재고</th>
              <th>단가</th>
              <th>할인</th>
              <th>구매 가액</th>
              <th>구매 세액</th>
              <th>구매 가격</th>
              <th>상태</th>
            </tr>
          </thead>
          <tbody>
            {productsPurchase.map((product) => (
              <tr key={product.id}>
                <td>{product.id}</td>
                <td>{product.name}</td>
                <td>{product.account.name}</td>
                <td>{product.stock}</td>
                <td>{product.unit_price}</td>
                <td>{product.unit_price_discount}</td>
                <td>{product.price}</td>
                <td>{product.price_vat}</td>
                <td>{product.total_price}</td>
                <td>5</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ProductsPurchase

const table = css`
  border-collapse: collapse;
  text-align: left;
  width: 100%;
  td,
  th {
    padding: 0.625rem;
  }

  thead {
    border-bottom: 1px solid ${palette.grey[200]};
    color: ${palette.grey[600]};
    th {
      font-weight: normal;
    }
  }

  tbody tr {
    border-bottom: 1px solid ${palette.grey[200]};
  }
`
