import {
  Column,
  Entity,
  Index,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { Account } from './Account'

@Entity({ name: 'accounts_metadata' })
export class AccountMeta {
  @PrimaryGeneratedColumn()
  id: number

  @Index({ unique: true })
  @Column({ type: 'varchar' })
  crn: string

  @Column()
  representatives: string

  @Column()
  address: string

  @Column()
  category: string // 업태

  @Column()
  category_type: string // 종목

  @OneToOne((type) => Account, (account) => account.metadata)
  @JoinColumn()
  account: Account
}
