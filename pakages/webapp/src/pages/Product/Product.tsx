import React from 'react'
import Products from '../../components/Products/Products'
import ProductsSidebar from '../../components/Products/ProductsSidebar'
import { Route, Switch } from 'react-router-dom'
import ProductsPurchase from '../../components/Products/ProductsPurchase'
import { css } from '@emotion/react'

export type ProductProps = {}

function Product({}: ProductProps) {
  return (
    <div css={block}>
      <div css={sidebar}>
        <ProductsSidebar />
      </div>
      <div css={contents}>
        <Switch>
          <Route path="/product" exact>
            <Products />
          </Route>
          <Route path="/product/purchase">
            <ProductsPurchase />
          </Route>
        </Switch>
      </div>
    </div>
  )
}

export default Product

const block = css`
  display: flex;
`

const sidebar = css`
  max-width: 22.5rem;
  min-width: 22.5rem;
  width: 100%;
  position: fixed;
  left: 0;
`

const contents = css`
  width: 100%;
  padding-top: 4rem;
  padding-left: 24.5rem;
  padding-right: 2rem;
  padding-bottom: 5rem;
`
