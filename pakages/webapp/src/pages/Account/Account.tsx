import React from 'react'
import AccountsSidebar from '../../components/Accounts/AccountsSidebar'
import Accounts from '../../components/Accounts/Accounts'
import { Route, Switch, useParams } from 'react-router-dom'
import AccountMetadata from '../../components/Accounts/AccountMetadata'
import { css } from '@emotion/react'

export type Accountprops = {}
type AccountParams = {
  id: string
}

function Account(props: Accountprops) {
  const { id } = useParams<AccountParams>()
  const accountId = parseInt(id)
  return (
    <div css={block}>
      <div css={sidebar}>
        <AccountsSidebar />
      </div>
      <div css={contents}>
        <Switch>
          <Route path="/account" exact>
            <Accounts />
          </Route>
          <Route path="/account/:id">
            <AccountMetadata accountId={accountId} />
          </Route>
        </Switch>
      </div>
    </div>
  )
}

export default Account

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
