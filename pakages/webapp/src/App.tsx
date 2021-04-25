import React from 'react'
import { Global, css } from '@emotion/react'
import { Route, Switch } from 'react-router-dom'
import AppLayout from './components/AppLayout'
import Footer from './components/Footer'
import Home from './pages/Home'
import Account from './pages/Account'
import Purchase from './pages/Purchase'
import Product from './pages/Product'

function App() {
  return (
    <>
      <Switch>
        <Route
          path={[
            '/',
            '/account',
            '/account/:id',
            '/product',
            '/product/purchase',
          ]}
          exact
        >
          <AppLayout>
            <AppLayout.Main>
              <Switch>
                <Route path="/" exact>
                  <Home />
                </Route>
                <Route path={['/account', '/account/:id']} exact>
                  <Account />
                </Route>
                <Route path={['/product', '/product/purchase']} exact>
                  <Product />
                </Route>
                <Route path={['/purchases', '/purchases/:id']} exact>
                  <Purchase />
                </Route>
              </Switch>
            </AppLayout.Main>
            <AppLayout.Footer>
              <Footer />
            </AppLayout.Footer>
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
