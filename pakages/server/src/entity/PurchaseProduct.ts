import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'
import { Account } from './Account'
import { Purchase } from './Purchase'
import { PurchasePriceHistory } from './PurchasePriceHistory'

@Entity({ name: 'purchase_products' })
export class PurchaseProduct {
  @PrimaryGeneratedColumn()
  id: number

  @Index({ unique: true })
  @Column()
  name: string

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date

  @ManyToOne((type) => Account, (account) => account.handling_products, {
    cascade: true,
  })
  account: Account

  @OneToMany((type) => Purchase, (purchase) => purchase.name)
  history: Purchase[]

  @Column({ default: 0 })
  stock: number

  @Column({ default: 0 })
  unit_price: number

  @Column({ default: 0 })
  unit_price_discount: number

  @Column({ default: 0 })
  price: number

  @Column({ default: 0 })
  price_vat: number

  @Column({ default: 0 })
  total_price: number

  @OneToMany(
    (type) => PurchasePriceHistory,
    (purchasePriceHistory) => purchasePriceHistory.name
  )
  price_history: PurchasePriceHistory[]
}
