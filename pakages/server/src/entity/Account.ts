import {
  Column,
  Entity,
  Index,
  OneToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { AccountMeta } from './AccountMeta'
import { PurchaseGoods } from './PurchaseGoods'

@Entity()
export class Account {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ nullable: true })
  thumbnail: string

  @Index({ unique: true })
  @Column()
  name: string

  @Column({ nullable: true })
  office: string

  @Column({ nullable: true })
  fax: string

  @Column({ nullable: true })
  phone: string

  @OneToOne((type) => AccountMeta, (accountMeta) => accountMeta.account, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  metadata: AccountMeta

  @OneToMany((type) => PurchaseGoods, (PurchaseGoods) => PurchaseGoods.account)
  handling_goods: PurchaseGoods[]
}
