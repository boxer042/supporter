import React from 'react'
import { css } from '@emotion/react'
import palette from '../../foundations/palette'
import WorkspacesNav from '../../components/Workspaces/WorkspacesNav'

export interface TWorkspacesProps {
  children: React.ReactNode
}

export default function Workspaces({ children }: TWorkspacesProps) {
  return (
    <div>
      <div css={nav}>
        <WorkspacesNav />
      </div>
      <div css={content}>{children}</div>
    </div>
  )
}

const block = css``

const nav = css`
  display: flex;
  width: 5rem;
  height: 100%;
  position: fixed;
  left: 0;
  border-right: 1px solid ${palette.grey[300]};
  background: ${palette.grey[50]};
  overflow-y: auto;
`

const content = css`
  padding-left: 5rem;
`
