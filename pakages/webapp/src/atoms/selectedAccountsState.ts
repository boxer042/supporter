import { useCallback, useEffect } from 'react'
import {
  atom,
  useRecoilState,
  useRecoilValue,
  useResetRecoilState,
  useSetRecoilState,
} from 'recoil'

export const selectedAccountsState = atom<SelectedAccount>({
  key: 'selectedAccountsState',
  default: {
    id: 0,
    name: '',
    office: '',
    metadata: {
      address: '',
    },
  },
})

export type SelectedAccount = {
  id: number
  name: string
  office: string
  metadata?: {
    address?: string
  }
}

export function useSelectedAccountsActions() {
  const set = useSetRecoilState(selectedAccountsState)
  const reset = useResetRecoilState(selectedAccountsState)

  const append = useCallback(
    (selected: SelectedAccount) => {
      set((prev) => {
        const exist = prev.id === selected.id
        // return exist ? prev : prev.concat(selected)
        return exist ? prev : selected
      })
    },
    [set]
  )
  return {
    set,
    reset,
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
