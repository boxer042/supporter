import React from 'react'

export type SearchedAccountsDataProps = {
  created?: boolean
  keyword?: string
}

function SearchedAccountsData({ created, keyword }: SearchedAccountsDataProps) {
  if (created) return <div>새로 만들기 "{keyword}" </div>
  return <div>SearchedAccountsData</div>
}

export default SearchedAccountsData
