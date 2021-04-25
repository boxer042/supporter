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
    <div css={blockStyle}>
      <div css={headerStyle}>거래처</div>
      <div css={addAccount(mode)} onClick={onClick}>
        <IoPersonAddSharp />
        <span>거래처 추가하기</span>
      </div>
    </div>
  )
}

export default AccountsSidebar

const blockStyle = css`
  height: calc(100vh - 4rem);
  border-right: 1px solid ${palette.grey[300]};
  padding-top: 3rem;
  padding-left: 2rem;
  padding-right: 2rem;
  display: flex;
  flex-direction: column;
`

const headerStyle = css`
  font-size: 1.5rem;
  font-weight: bold;
`

const addAccount = (mode: string) => css`
  margin-top: 1rem;
  display: flex;
  cursor: pointer;
  align-items: center;
  font-size: 1.125rem;
  color: ${palette.grey[600]};
  font-weight: bold;
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
