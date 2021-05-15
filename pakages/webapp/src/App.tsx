import React from 'react'
import { Global, css } from '@emotion/react'
import { Route, Switch } from 'react-router-dom'
import AppLayout from './components/AppLayout'
import Footer from './components/Footer'
import Home from './pages/Home'
import Account from './pages/Account'
import Product from './pages/Product'
import Header from './components/Header/Header'
import Workspaces from './pages/Workspaces/Workspaces'
import Purchae from './components/Purchase/Purchae'
import Purchase from './pages/Purchase/Purchase'
import PurchasedGoodsList from './components/Purchase/PurchasedGoodsList'
import PurchaseGoodsAppend from './components/Purchase/PurchaseGoodsAppend'
import PurchaseList from './components/Purchase/Purchased/Purchased'
import Goods from './pages/Goods/Goods'
import SaleGoodsAppend from './components/Goods/SaleGoods/SaleGoodsAppend'
function App() {
  return (
    <>
      <Switch>
        <Route
          path={[
            '/',
            '/workspaces',
            '/workspaces/purchase',
            '/workspaces/purchase/list',
            '/workspaces/purchase/appendgoods',
            '/workspaces/purchase/purchasedgoods',
            '/workspaces/goods',
            '/workspaces/goods/saleGoods/append',
            '/workspaces/goods/purchasedgoods',
            '/reports',
            '/account',
            '/account/:id',
            '/product',
            '/product/purchase',
            '/purchase',
          ]}
          exact
        >
          <AppLayout>
            <AppLayout.Header>
              <Header />
            </AppLayout.Header>
            <AppLayout.Main>
              <Switch>
                <Route exact path={'/'}>
                  <Home />
                </Route>
                <Route
                  exact
                  path={[
                    '/workspaces',
                    '/workspaces/purchase',
                    '/workspaces/purchase/list',
                    '/workspaces/purchase/appendgoods',
                    '/workspaces/purchase/purchasedgoods',
                    '/workspaces/goods',
                    '/workspaces/goods/saleGoods/append',
                    '/workspaces/goods/purchasedgoods',
                  ]}
                >
                  <Workspaces>
                    <Switch>
                      <Route exact path="/workspaces">
                        <div>워크스페이스 홈</div>
                      </Route>
                      <Route
                        exact
                        path={[
                          '/workspaces/purchase',
                          '/workspaces/purchase/list',
                          '/workspaces/purchase/appendgoods',
                          '/workspaces/purchase/purchasedgoods',
                        ]}
                      >
                        <Purchase>
                          <Switch>
                            <Route
                              exact
                              path="/workspaces/purchase/purchasedgoods"
                            >
                              <PurchasedGoodsList />
                            </Route>
                            <Route exact path="/workspaces/purchase/list">
                              <PurchaseList />
                            </Route>
                            <Route
                              exact
                              path="/workspaces/purchase/appendgoods"
                            >
                              <PurchaseGoodsAppend />
                            </Route>
                          </Switch>
                        </Purchase>
                      </Route>
                      <Route
                        exact
                        path={[
                          '/workspaces/goods',
                          '/workspaces/goods/saleGoods/append',
                          '/workspaces/goods/purchasedGoods',
                        ]}
                      >
                        <Goods>
                          <Switch>
                            <Route exact path="/workspaces/goods">
                              ddd
                            </Route>
                            <Route
                              exact
                              path="/workspaces/goods/saleGoods/append"
                            >
                              <SaleGoodsAppend />
                            </Route>
                            <Route
                              exact
                              path="/workspaces/goods/purchasedGoods"
                            >
                              <PurchasedGoodsList />
                            </Route>
                          </Switch>
                        </Goods>
                      </Route>
                    </Switch>
                  </Workspaces>
                </Route>
                <Route path="/reports">
                  <div>ddd</div>
                </Route>
                <Route path={['/account', '/account/:id']}>
                  <Account />
                </Route>
                <Route path={['/product', '/product/purchase']}>
                  <Product />
                </Route>
                <Route path={['/purchase', '/purchases/:id']}>
                  <Purchae />
                </Route>
              </Switch>
            </AppLayout.Main>
          </AppLayout>
        </Route>
      </Switch>

      <Global styles={globalStyle} />
    </>
  )
}

export default App

const globalStyle = css`
  html,
  body,
  #root {
    height: 100%;
  }
  html {
    box-sizing: border-box;

    * {
      box-sizing: inherit;
    }
  }
`
