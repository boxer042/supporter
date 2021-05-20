import {
  Column,
  Entity,
  Index,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm'

import { Account } from './Account'
import { ConnectGoods } from './ConnectGoods'
import { Purchase } from './Purchase'
import { PurchasePriceHistory } from './PurchasePriceHistory'
import { SaleGoods } from './SaleGoods'

@Entity()
export class PurchaseGoods {
  @PrimaryGeneratedColumn()
  id: number

  @Index({ unique: true })
  @Column()
  supplied_name: string

  @Column({ default: true })
  include: boolean

  @Column({ default: false })
  include_vat: boolean

  @Column({ default: 0 })
  stock: number

  @Column({ default: 0 })
  supplied_value: number
  @Column({ default: 0 })
  supplied_vat: number
  @Column({ default: 0 })
  supplied_price: number

  @Column({ default: 0 })
  supplied_value_discount: number

  @Column({ default: 0 })
  purchase_value: number
  @Column({ default: 0 })
  purchase_vat: number
  @Column({ default: 0 })
  purchase_price: number

  @ManyToOne((type) => Account, (account) => account.handling_goods, {
    cascade: true,
  })
  account: Account

  @OneToMany(
    (type) => PurchasePriceHistory,
    (purchasePriceHistory) => purchasePriceHistory.supplied_name
  )
  price_history: PurchasePriceHistory[]

  @OneToMany((type) => Purchase, (purchase) => purchase.supplied_name)
  purchase: Purchase[]

  // @ManyToOne((type) => SaleGoods, (saleGoods) => saleGoods.purchased_goods)
  // sale_goods: SaleGoods

  @OneToMany(
    (type) => ConnectGoods,
    (connectGoods) => connectGoods.purchased_goods
  )
  connect_goods: ConnectGoods[]
}
