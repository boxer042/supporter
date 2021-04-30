import {
  Column,
  Entity,
  Index,
  JoinColumn,
  OneToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { AccountMeta } from './AccountMeta'
import { PurchaseProduct } from './PurchaseProduct'

@Entity({ name: 'accounts' })
export class Account {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ nullable: true })
  thumbnail: string

  @Index({ unique: true })
  @Column()
  name: string

  @Column({ type: 'varchar', nullable: true })
  office: string

  @Column({ type: 'varchar', nullable: true })
  fax: string

  @Column({ type: 'varchar', nullable: true })
  phone: string

  @OneToOne((type) => AccountMeta, (accountMeta) => accountMeta.account, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  metadata: AccountMeta

  @OneToMany(
    (type) => PurchaseProduct,
    (purchaseProduct) => purchaseProduct.account
  )
  handling_products: PurchaseProduct[]
}
