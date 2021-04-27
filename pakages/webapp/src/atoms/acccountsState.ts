import { useCallback } from 'react'
import {
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
  useSetRecoilState,
} from 'recoil'
import { getAccounts } from '../lib/api/accounts/getAccounts'
import { Account } from '../lib/api/accounts/types'
import { useAccountsViewUpdate } from './accountsViewState'

export const accountsState = atom<Account[]>({
  key: 'accountsState',
  default: [],
})

export const accountsSearchState = atom({
  key: 'accountsSearchState',
  default: '',
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

export const searchedAccountsState = selector({
  key: 'searchedAccountsState',
  get: ({ get }) => {
    const search = get(accountsSearchState)
    const list = get(accountsState)
    if (search.length > 0) {
      return list.filter((item) => item.name.includes(search))
    }
    return list
    // if (search.length > 0) {
    //   return console.log(search)
    // } else {
    //   return list
    // }
  },
})

export function useAccountsSearchState() {
  return useRecoilState(accountsSearchState)
}

export function useSearchedAccountsValue() {
  return useRecoilValue(searchedAccountsState)
}

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
