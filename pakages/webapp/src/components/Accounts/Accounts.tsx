import React from 'react'
import { css } from '@emotion/react'
import AccountsTable from './AccountsTable'
import { useAccountsView } from './../../atoms/accountsViewState'
import AccountCreate from './AccountCreate'
import AccountMetadata from './AccountMetadata'
import palette from '../../foundations/palette'
import AccountSection from './AccountSection'
import AccountsSidebar from './AccountsSidebar'

export type AccountProps = {}

function Accounts(props: AccountProps) {
  const { mode } = useAccountsView()

  return (
    <div css={contents}>
      {mode === 'default' && <AccountsTable />}
      {mode === 'create' && <AccountCreate />}
    </div>
  )
}

export default Accounts

const contents = css``
