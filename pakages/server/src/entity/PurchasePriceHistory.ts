import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { Account } from './Account'
import { PurchaseProduct } from './PurchaseProduct'

@Entity({ name: 'purchase_price_history' })
export class PurchasePriceHistory {
  @PrimaryGeneratedColumn()
  id: number

  @ManyToOne(
    (type) => PurchaseProduct,
    (purchaseProduct) => purchaseProduct.price_history,
    {
      cascade: true,
    }
  )
  name: PurchaseProduct

  @CreateDateColumn()
  created_at: Date

  @Column()
  unit_price: number

  @Column({ default: 0 })
  unit_price_discount: number

  @Column()
  price: number

  @Column()
  price_vat: number

  @Column()
  total_price: number
}
