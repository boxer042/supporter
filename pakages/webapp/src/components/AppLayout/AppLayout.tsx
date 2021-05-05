import React from 'react'
import { css } from '@emotion/react'
import palette from '../../foundations/palette'

export type AppLayoutProps = {
  children: React.ReactNode
}

export default function AppLayout({ children }: AppLayoutProps) {
  return <div>{children}</div>
}

type HeaderProps = {
  children: React.ReactNode
}
function Header({ children }: HeaderProps) {
  return <header css={header}>{children}</header>
}

export type MainProps = {
  children: React.ReactNode
}

function Main({ children }: MainProps) {
  return <main css={mainStyle}>{children}</main>
}

export type FooterProps = {
  children: React.ReactNode
}

function Footer({ children }: FooterProps) {
  return <footer css={footerStyle}>{children}</footer>
}

AppLayout.Header = Header
AppLayout.Main = Main
AppLayout.Footer = Footer

const header = css`
  display: flex;
  position: fixed;
  width: 100%;
  height: 3rem;
  top: 0;
  left: 0;
  background: #fff;
  border-bottom: 1px solid ${palette.grey[300]};
`

const mainStyle = css`
  padding-top: 3rem;
`

const footerStyle = css`
  display: flex;
  position: fixed;
  width: 100%;
  height: 4rem;
  bottom: 0;
  left: 0;
  background: #fff;
  border-top: 1px solid ${palette.grey[300]};
`
