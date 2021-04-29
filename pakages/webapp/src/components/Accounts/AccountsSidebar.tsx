import React, { useCallback } from 'react'
import { css } from '@emotion/react'
import palette from '../../foundations/palette'
import { IoPersonAddSharp } from 'react-icons/io5'
import {
  useAccountsView,
  useAccountsViewAcions,
} from './../../atoms/accountsViewState'
import { NavLink } from 'react-router-dom'
import { useAccountsSearchState } from './../../atoms/acccountsState'
import Input from '../Input/Input'

export type AccountsSidebarProps = {}

function AccountsSidebar({}: AccountsSidebarProps) {
  const { createAccount } = useAccountsViewAcions()
  const [search, setSearch] = useAccountsSearchState()
  const { mode } = useAccountsView()

  const onClick = () => {
    createAccount()
  }

  const onChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearch(e.target.value)
    },
    [setSearch]
  )

  return (
    <div css={block}>
      <h1>거래처</h1>
      {/* <div css={addAccount(mode)} onClick={onClick}>
        <IoPersonAddSharp />
        <span>거래처 추가하기</span>
      </div> */}
      <NavLink css={link} to="/account/create">
        <IoPersonAddSharp />
        <span>거래처 추가하기</span>
      </NavLink>
      <Input value={search} placeholder="거래처 검색" onChange={onChange} />
    </div>
  )
}

export default AccountsSidebar

const block = css``
const link = css`
  text-decoration: none;
  color: ${palette.blueGrey[400]};
  &.active {
    color: ${palette.blueGrey[900]};
  }
`
// const addAccount = (mode: string) => css`
//   margin-top: 1rem;
//   display: flex;
//   cursor: pointer;
//   align-items: center;
//   font-size: 1.125rem;
//   color: ${palette.grey[700]};

//   span {
//     margin-left: 0.5rem;
//   }

//   &.active {
//     color: ${palette.blueGrey[900]};
//   }

//   ${mode === 'create' &&
//   css`
//     color: ${palette.blueGrey[900]};
//   `}
// `
