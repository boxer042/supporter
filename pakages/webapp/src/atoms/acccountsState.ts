import { useCallback } from 'react'
import { atom, useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import { getAccounts } from '../lib/api/accounts/getAccounts'
import { Account } from '../lib/api/accounts/types'
import { useAccountsViewUpdate } from './accountsViewState'

export const accountsState = atom<Account[]>({
  key: 'accountsState',
  default: [],
})

export const accountMetadataState = atom<Account>({
  key: 'accountMetadataState',
  default: {
    id: 0,
    name: '',
    office: null,
    fax: null,
    phone: null,
    metadata: null,
    handling_products: null,
  },
})

export function useAccountsState() {
  return useRecoilState(accountsState)
}

export function useAccountMetadataState() {
  return useRecoilState(accountMetadataState)
}

export function useAccountMetadataUpdate() {
  return useSetRecoilState(accountMetadataState)
}

export async function useAccountsAcions() {
  try {
    const accounts = await getAccounts()
    return accounts
  } catch (error) {
    console.log(error)
  }
}

export function useAccountMetadataActions() {
  const update = useAccountMetadataUpdate()

  const closeAccountMetadata = useCallback(() => {
    update(() => ({
      id: 0,
      name: '',
      office: null,
      fax: null,
      phone: null,
      metadata: null,
      handling_products: null,
    }))
  }, [update])
  return { closeAccountMetadata }
}
