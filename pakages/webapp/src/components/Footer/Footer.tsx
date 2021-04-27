import React from 'react'
import { css } from '@emotion/react'
import FooterItem from '../FooterItem/FooterItem'
import {
  IoBusinessSharp,
  IoCalculatorSharp,
  IoHomeSharp,
  IoPeopleSharp,
  IoSettingsSharp,
  IoStorefrontSharp,
} from 'react-icons/io5'
import { ImLab } from 'react-icons/im'

export type Footerprops = {}

function Footer(props: Footerprops) {
  return (
    <div css={footerStyle}>
      <div css={menuStyle}>
        <FooterItem reactIcon={<IoHomeSharp />} text="홈" to="/" />
        <FooterItem reactIcon={<IoStorefrontSharp />} text="판매" to="/1" />
        <FooterItem reactIcon={<ImLab />} text="상품" to="/product" />
        <FooterItem
          reactIcon={<IoCalculatorSharp />}
          text="매입"
          to="/purchase"
        />

        <FooterItem
          reactIcon={<IoBusinessSharp />}
          text="거래처"
          to="/account"
        />
        <FooterItem reactIcon={<IoPeopleSharp />} text="고객" to="/account/3" />
        <FooterItem reactIcon={<IoSettingsSharp />} text="세팅" to="/5" />
      </div>
    </div>
  )
}

export default Footer

const footerStyle = css`
  display: flex;
  width: 100%;
`

const menuStyle = css`
  display: flex;
  margin: 0 1.75rem;
  width: 100%;
  justify-content: space-between;
`
