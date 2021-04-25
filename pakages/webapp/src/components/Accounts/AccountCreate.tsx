import React from 'react'
import { IoChevronBackSharp } from 'react-icons/io5'
import { useAccountsViewAcions } from './../../atoms/accountsViewState'
import { css } from '@emotion/react'
import palette from '../../foundations/palette'
import { resetButton } from './../../foundations/resetButton'

export type AccountCreateProps = {}

function AccountCreate({}: AccountCreateProps) {
  const { closeAccount } = useAccountsViewAcions()
  const onCancel = () => {
    closeAccount()
  }
  return (
    <div>
      <div css={header}>
        <button css={backButton} onClick={onCancel}>
          <IoChevronBackSharp />
        </button>

        <span>거래처 추가하기</span>
      </div>
      <div css={contents}>AccountCreate</div>
    </div>
  )
}

export default AccountCreate

const header = css`
  display: flex;
  width: 100%;
  position: fixed;
  border-bottom: 1px solid ${palette.grey[300]};
  height: 3rem;
  top: 0;

  align-items: center;
  span {
    font-size: 1.5rem;
    font-weight: bold;
  }
`

const backButton = css`
  ${resetButton}
  cursor: pointer;
  margin-top: 0.4rem;
  font-size: 1.125rem;
  padding: 0 1rem 0 2rem;
`

const contents = css`
  padding-left: 2rem;
  padding-top: 4rem;
`
