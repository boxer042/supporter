import React, { useCallback, useState } from 'react'

import { useAccountsViewAcions } from './../../atoms/accountsViewState'
import { css } from '@emotion/react'
import palette from '../../foundations/palette'
import { resetButton } from './../../foundations/resetButton'
import { useAccountsState } from '../../atoms/acccountsState'
import { MdArrowBack } from 'react-icons/md'
import { createAccount } from '../../lib/api/accounts/createAccount'

export type AccountCreateProps = {}

function AccountCreate(props: AccountCreateProps) {
  const [inputs, setInputs] = useState({
    name: '',
    office: '',
    fax: '',
    phone: '',
  })
  const [accounts, setAccounts] = useAccountsState()
  const { closeAccount } = useAccountsViewAcions()

  const onChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { value, name } = e.target
      setInputs({
        ...inputs,
        [name]: value,
      })
    },
    [inputs]
  )

  const onCreate = useCallback(async () => {
    const account = {
      name: inputs.name,
      office: inputs.office,
      fax: inputs.fax,
      phone: inputs.phone,
    }
    const createdAccount = await createAccount(account)

    setAccounts((prevAccounts) => [...prevAccounts, createdAccount])
  }, [inputs.name, inputs.office, inputs.fax, inputs.phone, setAccounts])

  const onCancel = () => {
    closeAccount()
  }

  return (
    <div>
      <button onClick={onCancel}>
        <MdArrowBack />
      </button>
      <h1>거래처 추가하기</h1>
      <div>
        <div>
          <div>거래처명</div>
          <input name="name" value={inputs.name} onChange={onChange} />
        </div>
        <div>
          <div>사무실 번호</div>
          <input name="office" value={inputs.office} onChange={onChange} />
        </div>
        <div>
          <div>팩스 번호</div>
          <input name="fax" value={inputs.fax} onChange={onChange} />
        </div>
        <div>
          <div>휴대폰 번호</div>
          <input name="phone" value={inputs.phone} onChange={onChange} />
        </div>
      </div>
      <button onClick={onCreate}>추가하기</button>
    </div>
  )
}

export default AccountCreate

/**
 * TODO
 * 차후에 인풋에 입력하면 포맷팅해서 전화번호 바로 나타나기
 */
