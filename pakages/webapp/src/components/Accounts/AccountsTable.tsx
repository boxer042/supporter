import React, { useEffect } from 'react'
import { getAccounts } from '../../lib/api/accounts/getAccounts'
import {
  useAccountsState,
  useSearchedAccountsValue,
} from './../../atoms/acccountsState'
import { css } from '@emotion/react'
import palette from '../../foundations/palette'
import { formattedPhone } from './../../lib/api/utils/formattedPhone'
import { GiHamburgerMenu } from 'react-icons/gi'
import { resetButton } from './../../foundations/resetButton'
import { useAccountsViewAcions } from './../../atoms/accountsViewState'
import { useHistory } from 'react-router'

export type AccountsTableProps = {}

function AccountsTable(props: AccountsTableProps) {
  const [accounts, setAccounts] = useAccountsState()
  const accountsList = useSearchedAccountsValue()
  const { openAccount } = useAccountsViewAcions()
  const history = useHistory()

  useEffect(() => {
    const getAccountsData = async () => {
      const data = await getAccounts()
      setAccounts(data)
    }
    getAccountsData()
  }, [setAccounts])

  const onOpen = (id?: number) => {
    history.push(`/account/${id}`)
    // openAccount(id)
  }

  return (
    <div css={block}>
      <table css={table}>
        <thead>
          <tr>
            <th>거래처명</th>
            <th>사무실 번호</th>
            <th>팩스 번호</th>
            <th>휴대폰 번호</th>
          </tr>
        </thead>
        <tbody>
          {accountsList.map((account) => (
            <tr key={account.id} onClick={() => onOpen(account.id)}>
              <td>{account.name}</td>
              <td>{formattedPhone(account.office)}</td>
              <td>{formattedPhone(account.fax)}</td>
              <td>{formattedPhone(account.phone)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default AccountsTable

const block = css``

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
    tr {
      /* background: ${palette.grey[300]}; */
    }
    th {
      font-weight: normal;
    }
  }

  tbody tr {
    border-bottom: 1px solid ${palette.grey[200]};
    cursor: pointer;
    &:hover {
      background: ${palette.grey[100]};
    }
  }
  td:last-of-type {
  }
`
