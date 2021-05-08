import { css } from '@emotion/react'
import React, { useEffect, useRef, useState } from 'react'
import useOnClickOutside from 'use-onclickoutside'
import palette from '../../foundations/palette'
import useSearchAccountsQuery from '../../hooks/query/useSearchAccountsQuery'
import { SearchAccountsResult } from '../../lib/api/accounts/searchAccounts'
import PrimaryInput from '../PrimaryInput/PrimaryInput'

export type PurchaseGoodsAppendSearchedAccountProps = {}

function PurchaseGoodsAppendSearchedAccount({}: PurchaseGoodsAppendSearchedAccountProps) {
  const ref = useRef<HTMLDivElement>(null)
  const itemRef = useRef<HTMLDivElement>(null)
  const [keyword, setKeyword] = useState('')
  const [open, setOpen] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(-1)
  const [prevData, setPrevData] = useState<SearchAccountsResult[] | null>([])

  const { data } = useSearchAccountsQuery(keyword, {
    enabled: keyword !== "'",
  })
  const results = data

  useEffect(() => {
    // 인덱스 리셋
    if (!open) {
      setSelectedIndex(-1)
    }
  }, [open, setSelectedIndex])

  useEffect(() => {
    if (keyword === '') {
      setPrevData(null)
    }
    setSelectedIndex(-1)
  }, [keyword, setSelectedIndex])

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // 다른키 입력시 리턴 한다.
    if (!['ArrowDown', 'ArrowUp', 'Enter'].includes(e.key)) return
    e.preventDefault()
    switch (e.key) {
      case 'ArrowUp':
        if (!results || results.length === 0) return
        if (selectedIndex === -1) {
          setSelectedIndex(-1)
          return
        }
        if (selectedIndex === 0 && results[0]) {
          return
        }
        setSelectedIndex(selectedIndex - 1)
        return

      case 'ArrowDown':
        if (!results || results.length === 0) return
        if (selectedIndex === results.length - 1) {
          return
        }
        setSelectedIndex(selectedIndex + 1)
        return

      case 'Enter':
        const selectedItem = results?.[selectedIndex]
        if (selectedIndex === -1) {
          return
        }
        if (!selectedItem) return
        console.log(selectedItem)
        return
    }
  }

  const onClose: Parameters<typeof useOnClickOutside>[1] = (e) => {
    if (ref.current === e.target || ref.current?.contains(e.target as Node)) {
      return
    }
    setOpen(false)
  }

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value !== '' && !open) {
      setOpen(true)
    }
    setKeyword(e.target.value)
  }

  const onFocus = () => setOpen(true)

  useOnClickOutside(ref, onClose)

  const selectOffset = (selectedIndex: number) => {
    if (!itemRef.current || !ref.current) {
      return
    }
    if (selectedIndex === -1) return
    const viewport = ref.current.scrollTop + ref.current.offsetHeight
    const selectedOffset = itemRef.current.clientHeight * selectedIndex

    if (viewport - 8 === selectedOffset) {
      ref.current.scrollBy(0, 32)
      return
    } else if (ref.current.scrollTop > selectedOffset) {
      ref.current.scrollBy(0, -32)
      return
    }
  }
  selectOffset(selectedIndex)
  // console.log(`전 데이터 ${prevData}`)
  return (
    <div css={block}>
      <PrimaryInput
        value={keyword}
        onChange={onChange}
        onFocus={onFocus}
        onBlur={(e) => {
          e.persist()
          const relatedTarget = e.relatedTarget as HTMLElement | null
          if (relatedTarget && relatedTarget.dataset.type === 'select-item') {
            return
          }
        }}
        onKeyDown={onKeyDown}
      />
      {open && keyword !== '' && (
        <div css={selectWrapper} ref={ref} className="selectWrapper">
          {results?.length === 0 ||
            (!results && <div css={test(selectedIndex === -1)}>{keyword}</div>)}
          {results?.map((result, i) => (
            <div
              key={result.id}
              ref={itemRef}
              css={selectItem(i === selectedIndex, result.name === keyword)}
              data-type="select-item"
            >
              <div>{i}</div>
              <div>{result.name}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default PurchaseGoodsAppendSearchedAccount

const test = (select: boolean) => css`
  cursor: pointer;
  ${select &&
  css`
    background: ${palette.grey[200]};
  `}
`
const block = css``

const selectWrapper = css`
  background: ${palette.grey[50]};
  width: 100%;
  box-shadow: 0 2px 8px 0px rgba(0, 0, 0, 0.2);
  border-radius: 4px;
  border: 1px solid ${palette.grey[100]};
  margin-top: 2px;
  padding-top: 0.25rem;
  padding-bottom: 0.25rem;
  max-height: 168px;
  overflow: auto;
  &::-webkit-scrollbar {
  }
  &::-webkit-scrollbar-thumb {
  }
  &::-webkit-scrollbar-track {
  }
`
const selectItem = (select: boolean, selected: boolean) => css`
  padding-left: 0.5rem;
  padding-right: 0.5rem;
  display: flex;
  align-items: center;
  font-size: 0.75rem;
  height: 2rem;
  cursor: pointer;

  ${select &&
  css`
    background: ${palette.grey[200]};
  `}
  ${selected &&
  css`
    background: ${palette.grey[300]};
  `}
  &:hover {
    background: ${palette.grey[200]};
  }
`
