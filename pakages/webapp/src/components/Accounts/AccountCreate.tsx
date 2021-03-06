import React, { useCallback, useState } from 'react'

import { useAccountsViewAcions } from './../../atoms/accountsViewState'
import { css } from '@emotion/react'
import palette from '../../foundations/palette'
import { resetButton } from './../../foundations/resetButton'
import { useAccountsState } from '../../atoms/acccountsState'
import { MdArrowBack } from 'react-icons/md'
import { createAccount } from '../../lib/api/accounts/createAccount'
import { Metadata } from '../../lib/api/accounts/types'
import { addMetadata } from '../../lib/api/accounts/addMetadata'
import { useHistory } from 'react-router'
import Input from '../Input/Input'

export type AccountCreateProps = {}

function AccountCreate(props: AccountCreateProps) {
  const [inputs, setInputs] = useState({
    name: '',
    office: '',
    fax: '',
    phone: '',
  })
  const [detailInputs, setDetailInputs] = useState<Metadata>({
    account_id: null,
    crn: '',
    representatives: '',
    address: '',
    category: '',
    category_type: '',
  })
  const [accounts, setAccounts] = useAccountsState()
  const { closeAccount } = useAccountsViewAcions()
  const history = useHistory()

  const onChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { value, name } = e.target
      setInputs({
        ...inputs,
        [name]: value,
      })
      setDetailInputs({
        ...detailInputs,
        [name]: value,
      })
    },
    [inputs, detailInputs]
  )

  const onCreate = useCallback(async () => {
    const account = {
      name: inputs.name,
      office: inputs.office,
      fax: inputs.fax,
      phone: inputs.phone,
    }
    const detail = {
      accountId: '',
      crn: detailInputs.crn,
      representatives: detailInputs.representatives,
      address: detailInputs.address,
      category: detailInputs.category,
      category_type: detailInputs.category_type,
    }
    try {
      const createdAccount = await createAccount(account)
      if (detail.crn.length || detail.address.length > 0) {
        await addMetadata({
          account_id: createdAccount.id,
          crn: detail.crn,
          representatives: detail.representatives,
          address: detail.address,
          category: detail.category,
          category_type: detail.category_type,
        })
      }
      setAccounts((prevAccounts) => [...prevAccounts, createdAccount])
      history.replace('/account')
    } catch (error) {
      console.log(error)
    }
  }, [
    inputs.name,
    inputs.office,
    inputs.fax,
    inputs.phone,
    detailInputs.crn,
    detailInputs.address,
    detailInputs.representatives,
    detailInputs.category,
    detailInputs.category_type,
    setAccounts,
    history,
  ])

  const onCancel = () => {
    // closeAccount()
    history.goBack()
  }

  return (
    <div>
      <button onClick={onCancel}>
        <MdArrowBack />
      </button>
      <h1>????????? ????????????</h1>
      <h2>????????????</h2>
      <div>
        <div>
          <div>????????????</div>
          <Input name="name" value={inputs.name} onChange={onChange} />
        </div>
        <div>
          <div>????????? ??????</div>
          <Input name="office" value={inputs.office} onChange={onChange} />
        </div>
        <div>
          <div>?????? ??????</div>
          <Input name="fax" value={inputs.fax} onChange={onChange} />
        </div>
        <div>
          <div>????????? ??????</div>
          <Input name="phone" value={inputs.phone} onChange={onChange} />
        </div>
      </div>
      <h2>????????????</h2>
      <div>
        <div>
          <div>?????????????????????</div>
          <Input name="crn" value={detailInputs.crn} onChange={onChange} />
        </div>
        <div>
          <div>?????????</div>
          <Input
            name="representatives"
            value={detailInputs.representatives}
            onChange={onChange}
          />
        </div>
        <div>
          <div>????????? ?????????</div>
          <Input
            name="address"
            value={detailInputs.address}
            onChange={onChange}
          />
        </div>
        <div>
          <div>??????</div>
          <Input
            name="category"
            value={detailInputs.category}
            onChange={onChange}
          />
        </div>
        <div>
          <div>??????</div>
          <Input
            name="category_type"
            value={detailInputs.category_type}
            onChange={onChange}
          />
        </div>
      </div>
      <button onClick={onCreate}>????????????</button>
    </div>
  )
}

export default AccountCreate

/**
 * TODO
 * ????????? ????????? ???????????? ??????????????? ???????????? ?????? ????????????
 */
