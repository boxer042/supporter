import React from 'react'
import { css } from '@emotion/react'
import palette from '../../foundations/palette'

export type AppLayoutProps = {
  children: React.ReactNode
}

export default function AppLayout({ children }: AppLayoutProps) {
  return <div>{children}</div>
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

AppLayout.Main = Main
AppLayout.Footer = Footer

const mainStyle = css``

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
