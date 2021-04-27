import useSearchAccountsQuery from './../../../hooks/query/useSearchAccountsQuery'

export type AccountsAutocompleteProps = {
  keyword: string
}

function AccountsAutocomplete({ keyword }: AccountsAutocompleteProps) {
  const { data } = useSearchAccountsQuery(keyword, { enabled: keyword !== '' })
  if (!data) return null
  return (
    <div>
      {data.map((result) => (
        <div>{result.name}</div>
      ))}
    </div>
  )
}

export default AccountsAutocomplete

// #ff8bb8
// #625dff
//#514ef7

//#FF758C#FF7EB3
