import { atom, useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import { useCallback } from 'react'

export type AccountsViewType = {
  mode: 'default' | 'create' | 'metadata'
  selectedAccountId: number | null
}

export const accountsViewState = atom<AccountsViewType>({
  key: 'accountsViewState',
  default: {
    mode: 'default',
    selectedAccountId: null,
  },
})

export function useAccountsView() {
  return useRecoilValue(accountsViewState)
}

export function useAccountsViewUpdate() {
  return useSetRecoilState(accountsViewState)
}

export function useAccountsViewAcions() {
  const update = useAccountsViewUpdate()
  const createAccount = useCallback(() => {
    update(() => ({
      mode: 'create',
      selectedAccountId: null,
    }))
  }, [update])

  const closeAccount = useCallback(() => {
    update(() => ({
      mode: 'default',
      selectedAccountId: null,
    }))
  }, [update])

  const openAccount = useCallback(
    (accountId: number) => {
      update(() => ({
        mode: 'metadata',
        selectedAccountId: accountId,
      }))
    },
    [update]
  )
  return { createAccount, openAccount, closeAccount }
}
