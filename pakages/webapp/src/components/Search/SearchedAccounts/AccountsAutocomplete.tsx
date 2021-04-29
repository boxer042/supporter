import { css } from '@emotion/react'
import { useRef } from 'react'
import useOnClickOutside from 'use-onclickoutside'
import { SearchAccountsResult } from '../../../lib/api/accounts/searchAccounts'
import SerachedAccountsList from './SerachedAccountsList'

export type AccountsAutocompleteProps = {
  visible: boolean
  results: SearchAccountsResult[] | null
  onClose: Parameters<typeof useOnClickOutside>[1]
  onSelect: (params: {
    id: number
    name: string
    office: string
    metadata?: {
      address?: string
    }
  }) => void
  selectedIndex: number
}

function AccountsAutocomplete({
  visible,
  results,
  onClose,
  onSelect,
  selectedIndex,
}: AccountsAutocompleteProps) {
  const ref = useRef<HTMLDivElement>(null)

  useOnClickOutside(ref, onClose)

  if (!visible || !results || results.length === 0) return null
  return (
    <div css={block} ref={ref}>
      <div css={itemBlock}>
        {results.map((result, i) => (
          <SerachedAccountsList
            id={result.id}
            key={result.id}
            thumbnail={result.thumbnail}
            name={result.name}
            office={result.office}
            metadata={result.metadata}
            index={i}
            selected={i === selectedIndex}
            onSelect={onSelect}
          />
        ))}
      </div>
    </div>
  )
}

export default AccountsAutocomplete

const block = css`
  position: relative;
`
const itemBlock = css`
  position: absolute;
  padding-top: 0.375rem;
  padding-bottom: 0.375rem;
  background: #fff;
  width: 100%;
  max-height: 15rem;
  box-shadow: 0rem 0.25rem 0.5rem rgba(0, 0, 0, 0.07);
  border-radius: 0.32rem;
  overflow-y: auto;
  z-index: 10;
`
// #ff8bb8
// #625dff
//#514ef7

//#FF758C#FF7EB3
