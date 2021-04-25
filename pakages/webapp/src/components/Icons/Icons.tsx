import React from 'react'
import * as svg from './svg'

export type IconsType = keyof typeof svg
export type IconsProps = {
  name: IconsType
  className?: string
  style?: React.CSSProperties
}

function Icons({ name, className, style }: IconsProps) {
  return React.createElement(svg[name], {
    className,
    style,
  })
}

export default Icons
