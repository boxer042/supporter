import React from 'react'
import { Global, css } from '@emotion/react'
import { Route, Switch } from 'react-router-dom'
import AppLayout from './components/AppLayout'
import Home from './pages/Home'
import Header from './components/Header/Header'
import Workspaces from './pages/Workspaces/Workspaces'
import Purchase from './pages/Purchase/Purchase'
import PurchasedGoodsList from './components/Purchase/PurchasedGoodsList'
import PurchaseGoodsAppend from './components/Purchase/PurchaseGoodsAppend'
import PurchaseList from './components/Purchase/Purchased/Purchased'
import Goods from './pages/Goods/Goods'
import SaleGoodsAppend from './components/Goods/SaleGoods/SaleGoodsAppend'
import CreateSaleGoods from './components/Goods/CreateSaleGoods/CreateSaleGoods'
import SaleGoodsList from './components/Goods/SaleGoodsList'
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
            '/workspaces/goods/salegoods/create',
            '/workspaces/goods/purchasedgoods',
            '/reports',
            '/account',
            '/account/:id',
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
                    '/workspaces/goods/salegoods/append',
                    '/workspaces/goods/salegoods/create',
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
                          '/workspaces/goods/salegoods/append',
                          '/workspaces/goods/purchasedgoods',
                          '/workspaces/goods/salegoods/create',
                        ]}
                      >
                        <Goods>
                          <Switch>
                            <Route exact path="/workspaces/goods">
                              <SaleGoodsList />
                            </Route>
                            <Route
                              exact
                              path="/workspaces/goods/salegoods/append"
                            >
                              <SaleGoodsAppend />
                            </Route>
                            <Route
                              exact
                              path="/workspaces/goods/salegoods/create"
                            >
                              <CreateSaleGoods />
                            </Route>
                            <Route
                              exact
                              path="/workspaces/goods/purchasedgoods"
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
