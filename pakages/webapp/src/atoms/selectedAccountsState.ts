import { useCallback, useEffect } from 'react'
import {
  atom,
  useRecoilState,
  useRecoilValue,
  useResetRecoilState,
  useSetRecoilState,
} from 'recoil'
import { SearchAccountsResult } from '../lib/api/accounts/searchAccounts'

export const selectedAccountsState = atom<SearchAccountsResult | null>({
  key: 'selectedAccountsState',
  default: null,
})

export function useSelectedAccountsActions() {
  const set = useSetRecoilState(selectedAccountsState)
  const reseted = useResetRecoilState(selectedAccountsState)

  const append = useCallback(
    (selected: SearchAccountsResult) => {
      set((prev) => {
        const exist = prev?.id === selected.id
        // return exist ? prev : prev.concat(selected)
        return exist ? prev : selected
      })
    },
    [set]
  )
  return {
    set,
    reseted,
    append,
  }
}

export function useSelectedAccountsState() {
  return useRecoilState(selectedAccountsState)
}

export function useCurrentAccountsState() {
  return useRecoilValue(selectedAccountsState)
}

export function useResetAccountsUnmountEffect() {
  const reset = useResetRecoilState(selectedAccountsState)
  useEffect(() => {
    return () => {
      reset()
    }
  }, [reset])
}

// import { useCallback, useEffect } from 'react'
// import {
//   atom,
//   useRecoilState,
//   useRecoilValue,
//   useResetRecoilState,
//   useSetRecoilState,
// } from 'recoil'

// export const selectedAccountsState = atom<SelectedAccount[]>({
//   key: 'selectedAccountsState',
//   default: [],
// })

// export type SelectedAccount = {
//   id: number
//   name: string
//   office: string
//   metadata?: {
//     address?: string
//   }
// }

// export function useSelectedAccountsActions() {
//   const set = useSetRecoilState(selectedAccountsState)
//   const reset = useResetRecoilState(selectedAccountsState)

//   const append = useCallback(
//     (selected: SelectedAccount) => {
//       set((prev) => {
//         const exist = prev.find((s) => s.id === selected.id)
//         return exist ? prev : prev.concat(selected)
//       })
//     },
//     [set]
//   )
//   return {
//     set,
//     reset,
//     append,
//   }
// }

// export function useSelectedAccountsState() {
//   return useRecoilState(selectedAccountsState)
// }

// export function useCurrentAccountsState() {
//   return useRecoilValue(selectedAccountsState)
// }

// export function useResetAccountsUnmountEffect() {
//   const reset = useResetRecoilState(selectedAccountsState)
//   useEffect(() => {
//     return () => {
//       reset()
//     }
//   }, [reset])
// }

// data set/
// [
//   {
//     id: null,
//     supplied_name: '',
//     include: true,
//     stock: 0,
//     supplied_value: 0,
//     supplied_vat: 0,
//     supplied_price: 0,
//     supplied_value_discount: 0,
//     purchase_value: 0,
//     purchase_vat: 0,
//     purchase_price: 0,
//   },
// ]
