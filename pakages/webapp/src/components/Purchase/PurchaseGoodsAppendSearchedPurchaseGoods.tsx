import { css } from '@emotion/react'
import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from 'react'
import { useDebounce } from 'use-debounce/lib'
import useOnClickOutside from 'use-onclickoutside'
import {
  usePurchaseGoodsSetState,
  useSelectedGoodsSetState,
} from '../../atoms/purchaseState'
import palette from '../../foundations/palette'
import usePurchaseGoodsByKeyword from '../../hooks/query/usePurchaseGoodsByKeyword'
import { PurchaseGoods } from '../../hooks/types/Purchase'
import PrimaryInput from '../PrimaryInput/PrimaryInput'
import { usePurchaseGoodsState } from '../../atoms/purchaseState'

export type PurchaseGoodsAppendSearchedPurchaseGoodsProps = {
  keyword: string
  setKeyword: Dispatch<SetStateAction<string>>
}

function PurchaseGoodsAppendSearchedPurchaseGoods({
  keyword,
  setKeyword,
}: PurchaseGoodsAppendSearchedPurchaseGoodsProps) {
  const [debouncedKeyword] = useDebounce(keyword, 300)

  const ref = useRef<HTMLDivElement>(null)
  const itemRef = useRef<HTMLDivElement>(null)
  const [open, setOpen] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(-1)
  const [prevData, setPrevData] = useState<PurchaseGoods[] | null>(null)
  const { status, data, error, isFetching } = usePurchaseGoodsByKeyword(
    debouncedKeyword
  )

  const setSelectedGoods = useSelectedGoodsSetState()

  useEffect(() => {
    if (!open) {
      setSelectedIndex(-1)
    }
  }, [open, setSelectedIndex])

  useEffect(() => {
    if (data) {
      setPrevData(data)
    }
  }, [data])

  useEffect(() => {
    if (keyword === '') {
      setPrevData(null)
    }
    setSelectedIndex(-1)
  }, [keyword, setSelectedIndex])

  const onSelect = () => {}

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
        // if (selectedIndex === 0 && results[0]) {
        //   return
        // }
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
        setSelectedGoods({
          supplied_name: selectedItem.supplied_name,
          include: selectedItem.include,
          stock: selectedItem.stock,
          supplied_value: selectedItem.supplied_value,
          supplied_value_discount: selectedItem.supplied_value_discount,
          account: {
            id: selectedItem.account.id,
            name: selectedItem.account.name,
          },
        })
        console.log(selectedItem)
        setKeyword(selectedItem.supplied_name)
        setOpen(false)
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
    // if (selectedIndex === -1) return
    const viewport = ref.current.scrollTop + ref.current.offsetHeight - 8
    const selectedOffset = itemRef.current.clientHeight * selectedIndex
    if (viewport - 32 === selectedOffset) {
      ref.current.scrollBy(0, 32)
      return
    } else if (ref.current.scrollTop > selectedOffset + 32) {
      ref.current.scrollBy(0, -32)

      return
    }
  }

  selectOffset(selectedIndex)

  const results = data || prevData

  return (
    <div css={block}>
      <PrimaryInput
        value={keyword}
        setValue={setKeyword}
        onChange={onChange}
        onFocus={onFocus}
        onBlur={(e) => {
          e.persist()
          const relatedTarget = e.relatedTarget as HTMLElement | null
          if (
            relatedTarget &&
            relatedTarget.dataset.type === 'select-purchaseGoods'
          ) {
            return
          }
        }}
        onKeyDown={onKeyDown}
        clearButton
      />
      {!open || !results || results.length === 0 ? null : (
        <div css={selectWrapper} ref={ref}>
          <div css={createSelectItem(-1 === selectedIndex)}>
            Create '{keyword}' 생성하기
          </div>
          {results?.map((result, i) => (
            <div
              key={result.id}
              ref={itemRef}
              css={selectItem(
                i === selectedIndex,
                result.supplied_name === keyword
              )}
              data-type="select-purchaseGoods"
            >
              <div>{result.supplied_name}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default PurchaseGoodsAppendSearchedPurchaseGoods

const createSelectItem = (select: boolean) => css`
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
`
const block = css`
  position: relative;
`

const selectWrapper = css`
  position: absolute;
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
