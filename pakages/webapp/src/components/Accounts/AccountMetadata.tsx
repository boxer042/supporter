import React, { useEffect } from 'react'
import {
  IoBarChartSharp,
  IoBook,
  IoBusinessSharp,
  IoCalculator,
  IoChevronBackSharp,
  IoFolderOpen,
  IoPersonCircleSharp,
} from 'react-icons/io5'
import { getAccount } from '../../lib/api/accounts/getAccount'
import {
  useAccountsView,
  useAccountsViewAcions,
} from './../../atoms/accountsViewState'
import { css } from '@emotion/react'
import { resetButton } from '../../foundations/resetButton'
import palette from '../../foundations/palette'
import {
  useAccountMetadataActions,
  useAccountMetadataState,
} from '../../atoms/acccountsState'
import { MdArrowBack } from 'react-icons/md'
import { formattedPhone } from './../../lib/api/utils/formattedPhone'
import { useHistory } from 'react-router'

export type AccountMetadataProps = {
  accountId: number | null
}

function AccountMetadata({ accountId }: AccountMetadataProps) {
  const [account, setAccount] = useAccountMetadataState()
  const { selectedAccountId } = useAccountsView()
  const { closeAccount } = useAccountsViewAcions()
  const { closeAccountMetadata } = useAccountMetadataActions()
  const history = useHistory()

  const onCancel = () => {
    closeAccountMetadata()
    history.goBack()
    // closeAccount()
  }

  useEffect(() => {
    const getAccountData = async () => {
      const data = await getAccount(accountId)
      setAccount(data)
    }
    getAccountData()
  }, [setAccount, accountId])

  return (
    <div css={block}>
      <div css={header}>
        <button css={backButton} onClick={onCancel}>
          <MdArrowBack />
        </button>
        <div>거래처 메타데이터</div>
      </div>
      <div css={leftBlock}>
        <div css={accountSection}>
          <div css={thumbnail}>
            <img
              src="https://www.shareicon.net/data/512x512/2016/05/24/770117_people_512x512.png"
              alt="test"
            />
          </div>
          <div css={title}>{account.name}</div>
          <div css={address}>{account.metadata?.address}</div>
          <div css={accountDetail}>
            <div>연락번호</div>
            <div css={accountField}>
              <div css={label}>사무실 번호</div>
              <div css={text}>{formattedPhone(account.office)}</div>
            </div>
            <div css={accountField}>
              <div css={label}>팩스 번호</div>
              <div css={text}>{formattedPhone(account.fax)}</div>
            </div>
            <div css={accountField}>
              <div css={label}>휴대폰 번호</div>
              <div css={text}>{formattedPhone(account.phone)}</div>
            </div>
            <div>상세정보</div>
            <div css={accountField}>
              <div css={label}>사업자등록번호</div>
              <div css={text}>{account.metadata?.crn}</div>
            </div>
            <div css={accountField}>
              <div css={label}>대표자</div>
              <div css={text}>{account.metadata?.representatives}</div>
            </div>
            <div css={accountField}>
              <div css={label}>업태</div>
              <div css={text}>{account.metadata?.category}</div>
            </div>
            <div css={accountField}>
              <div css={label}>종목</div>
              <div css={text}>{account.metadata?.category_type}</div>
            </div>
          </div>
          <div css={subMenu}>
            <div css={subMenuBlock}>
              <IoFolderOpen />
              <div>취급상품</div>
            </div>
            <div css={subMenuBlock}>
              <IoCalculator />
              <div>매입현황</div>
            </div>
            <div css={subMenuBlock}>
              <IoBarChartSharp />
              <div>리포트</div>
            </div>
          </div>
        </div>
      </div>
      <div css={rightBlock}>
        <h2>취급상품</h2>
        <table css={table}>
          <thead>
            <tr>
              <th>상품명</th>
              <th>단가</th>
              <th>할인</th>
              <th>매입단가</th>
              <th>매입세액</th>
              <th>가격</th>
            </tr>
          </thead>
          <tbody>
            {account.handling_products?.map((product) => (
              <tr key={product.id}>
                <td>{product.name}</td>
                <td>{product.unit_price}</td>
                <td>{product.unit_price_discount}</td>
                <td>{product.price}</td>
                <td>{product.price_vat}</td>
                <td>{product.total_price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default AccountMetadata

const block = css`
  display: flex;
  height: 100vh;
  padding-bottom: 4rem;
  padding-right: 2rem;
`
const header = css`
  height: 3rem;
  width: 100%;
  border-bottom: 1px solid ${palette.grey[300]};
  position: fixed;
  top: 0;
  background: #fff;
  display: flex;
  align-items: center;
  padding-left: 2rem;
  font-size: 1.125rem;
  font-weight: bold;
`
const backButton = css`
  ${resetButton}
  display: flex;
  align-items: center;
  cursor: pointer;
  font-size: 1.125rem;
  margin-top: 5px;
  margin-right: 7px;
`

const leftBlock = css`
  padding-top: 5rem;
  padding-left: 2rem;
  padding-right: 2rem;
  max-width: 22.5rem;
  min-width: 22.5rem;
  width: 100%;
  height: 100%;
  border-right: 1px solid ${palette.grey[300]};
`
const accountSection = css``

const accountDetail = css`
  margin-top: 2rem;
`

const thumbnail = css`
  display: flex;
  width: 120px;
  height: 120px;
  border-radius: 50%;
  margin: auto;
  margin-bottom: 1rem;
`

const title = css`
  font-size: 2rem;
  font-weight: bold;
  text-align: center;
`

const address = css`
  margin-top: 12px;
  text-align: center;
`

const accountField = css`
  display: flex;
  justify-content: space-between;
`
const label = css`
  color: ${palette.grey[600]};
`
const text = css``

const subMenu = css`
  margin-top: 2rem;
  display: flex;
  justify-content: space-between;
`
const subMenuBlock = css`
  display: flex;
  flex-direction: column;
  width: 80px;
  height: 80px;
  border: 1px solid ${palette.grey[300]};
  border-radius: 5px;
  align-items: center;
  justify-content: center;
  font-size: 0.875rem;
  color: ${palette.grey[600]};
  svg {
    font-size: 1.5rem;
  }
`
const rightBlock = css`
  width: 100%;
  padding-top: 5rem;
  padding-left: 2rem;
  padding-right: 2rem;
`
const table = css`
  min-width: 30rem;
  width: 100%;
  border-collapse: collapse;
  text-align: left;

  td,
  th {
    padding: 0.75rem;
  }

  thead {
    border-bottom: 1px solid ${palette.grey[200]};
  }

  tbody tr {
    cursor: pointer;
    border-bottom: 1px solid ${palette.grey[200]};
    &:hover {
      background: ${palette.grey[100]};
    }
  }
`
/**
 * TODO:
 * 1. 사업자등록번호 포맷팅
 * 2. 가격 포맷팅
 */
