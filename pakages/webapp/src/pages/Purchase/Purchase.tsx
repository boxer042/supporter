import { css } from '@emotion/react'
import React from 'react'
import { BiChevronRight } from 'react-icons/bi'
import palette from '../../foundations/palette'

export type PurchaseProps = {}

function Purchase({}: PurchaseProps) {
  return (
    <div css={block}>
      <div css={leftSide}>
        <div css={navSection}>
          <div css={navTitle}>Append Purchase</div>
          <div css={navSectionItem}>
            <div>상품 구매</div>
            <BiChevronRight />
          </div>
          <div css={navSectionItem}>
            <div>경비</div>
            <BiChevronRight />
          </div>
        </div>
        <hr />
        <div>dd</div>
      </div>
      <div css={contents}>Contents</div>
    </div>
  )
}

export default Purchase

const block = css``

const leftSide = css`
  position: fixed;
  width: 18.75rem;
  left: 5rem;
  height: 100%;
  background: ${palette.grey[50]};
  border-right: 1px solid ${palette.grey[300]};
  overflow-y: auto;
  padding-top: 0.5rem;
  padding-left: 0.5rem;
  padding-right: 0.5rem;
  font-size: 0.75rem;
  hr {
    margin: 0;
    border: unset;
    border-top: 1px solid ${palette.grey[300]};
    margin-block-start: 0.5em;
    margin-block-end: 0.5em;
    margin-inline-start: auto;
    margin-inline-end: auto;
    overflow: hidden;
  }
`

const navSection = css`
  display: flex;
  flex-direction: column;
  width: 100%;
`

const navTitle = css`
  padding-left: 0.5rem;
  padding-right: 0.5rem;
  font-size: 0.875rem;
  font-weight: bold;
`

const navSectionItem = css`
  height: 1.75rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding-left: 0.5rem;
  padding-right: 0.5rem;
  svg {
    font-size: 1rem;
  }
`

const contents = css`
  padding-left: 18.75rem;
`
