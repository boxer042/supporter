import { css } from '@emotion/react'
import React, { useEffect, useRef, useState } from 'react'
import useOnClickOutside from 'use-onclickoutside'
import palette from '../../foundations/palette'
import PrimaryInput from '../PrimaryInput/PrimaryInput'

export type InputSelectProps = {
  results?: any[] | null
}

function InputSelect({ results }: InputSelectProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [value, setValue] = useState('')
  const [open, setOpen] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(-1)
  const [prevData, setPrevData] = useState<string[] | null>([])

  useEffect(() => {
    // 인덱스 리셋
    if (!open) {
      console.log('인덱스 리셋')
      setSelectedIndex(-1)
    }
  }, [open, setSelectedIndex])

  useEffect(() => {
    if (value === '') {
      setPrevData(null)
    }
    setSelectedIndex(-1)
  }, [value, setSelectedIndex])

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // 다른키 입력시 리턴 한다.
    if (!['ArrowDown', 'ArrowUp', 'Enter'].includes(e.key)) return
    e.preventDefault()
    switch (e.key) {
      case 'ArrowUp':
        if (!results || results.length === 0) return
        if (selectedIndex === -1) {
          setSelectedIndex(results.length - 1)
          return
        }
        setSelectedIndex(selectedIndex - 1)
        return

      case 'ArrowDown':
        if (!results || results.length === 0) return
        if (selectedIndex === results.length - 1) {
          setSelectedIndex(-1)
          return
        }
        const one = ref.current?.scrollTop
        const two = ref.current?.scrollHeight
        if (one || two !== null) {
          const tree = one - two
        }

        setSelectedIndex(selectedIndex + 1)
        return

      case 'Enter':
        return console.log('엔터')
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
    setValue(e.target.value)
  }

  const onFocus = () => setOpen(true)

  useOnClickOutside(ref, onClose)
  // console.log(selectedIndex)
  // console.log(`전 데이터 ${prevData}`)
  const lab = document.getElementsByClassName('selectWrapper')
  const howWidth = ref
  console.log(howWidth)
  return (
    <div css={block}>
      <PrimaryInput
        value={value}
        onChange={onChange}
        onFocus={onFocus}
        onKeyDown={onKeyDown}
      />
      {open && value !== '' && (
        <div css={selectWrapper} ref={ref} className="selectWrapper">
          {results?.length === 0 ||
            (!results && <div css={test(selectedIndex === -1)}>{value}</div>)}
          {results?.map((result, i) => (
            <div css={selectItem(i === selectedIndex, result.name === value)}>
              <div>{i}</div>
              <div>{result.name}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default InputSelect

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
  max-height: 12rem;
  overflow: auto;
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
