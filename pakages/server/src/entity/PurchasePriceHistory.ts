import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm'

import { PurchaseGoods } from './PurchaseGoods'

@Entity()
export class PurchasePriceHistory {
  @PrimaryGeneratedColumn()
  id: number

  @ManyToOne(
    (type) => PurchaseGoods,
    (PurchaseGoods) => PurchaseGoods.price_history,
    {
      cascade: true,
    }
  )
  supplied_name: PurchaseGoods

  @Column({ default: true })
  prev_include: boolean

  @CreateDateColumn()
  change_price_at: Date

  @Column()
  prev_supplied_value: number
  @Column()
  prev_supplied_vat: number
  @Column()
  prev_supplied_price: number
  @Column()
  prev_supplied_value_discount: number
  @Column()
  prev_purchase_value: number
  @Column()
  prev_purchase_vat: number
  @Column()
  prev_purchase_price: number
}
