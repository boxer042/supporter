import React from 'react'
import { css } from '@emotion/react'
import palette from '../../foundations/palette'
import { IoPersonAddSharp } from 'react-icons/io5'
import {
  useAccountsView,
  useAccountsViewAcions,
} from './../../atoms/accountsViewState'

export type AccountsSidebarProps = {}

function AccountsSidebar({}: AccountsSidebarProps) {
  const { createAccount } = useAccountsViewAcions()
  const { mode } = useAccountsView()

  const onClick = () => {
    createAccount()
  }

  return (
    <div css={block}>
      <h1>거래처</h1>
      <div css={addAccount(mode)} onClick={onClick}>
        <IoPersonAddSharp />
        <span>거래처 추가하기</span>
      </div>
    </div>
  )
}

export default AccountsSidebar

const block = css``

const addAccount = (mode: string) => css`
  margin-top: 1rem;
  display: flex;
  cursor: pointer;
  align-items: center;
  font-size: 1.125rem;
  color: ${palette.grey[700]};

  span {
    margin-left: 0.5rem;
  }

  &.active {
    color: ${palette.blueGrey[900]};
  }

  ${mode === 'create' &&
  css`
    color: ${palette.blueGrey[900]};
  `}
`
