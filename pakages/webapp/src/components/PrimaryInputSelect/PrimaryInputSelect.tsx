import React, { useEffect, useRef, useState } from 'react'
import PrimaryInput from '../PrimaryInput/PrimaryInput'
import useOnClickOutside from 'use-onclickoutside'

export type PrimaryInputSelectProps = {
  children: React.ReactNode
}

function PrimaryInputSelect({ children }: PrimaryInputSelectProps) {
  const [open, setOpen] = useState(false)
  const [keyword, setKeyword] = useState('')
  const [prevData, setPrevData] = useState(null)
  const [selectedIndex, setSelectedIndex] = useState(-1)

  const ref = useRef<HTMLDivElement>(null)
  const itemRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
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

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value !== '' && !open) {
      setOpen(true)
    }
    setKeyword(e.target.value)
  }
  return (
    <div>
      <PrimaryInput value={keyword} setValue={setKeyword} onChange={onChange} />
      {!open || keyword === '' ? null : <div>{children}</div>}
    </div>
  )
}

export default PrimaryInputSelect
