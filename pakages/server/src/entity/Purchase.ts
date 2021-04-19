import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { PurchaseProduct } from './PurchaseProduct'

@Entity({ name: 'purchases' })
export class Purchase {
  @PrimaryGeneratedColumn()
  id: number

  @Index()
  @ManyToOne(
    (type) => PurchaseProduct,
    (purchaseProduct) => purchaseProduct.history,
    { cascade: true }
  )
  name: PurchaseProduct

  @Column()
  quantity: number

  @Column({ default: false })
  include_vat: boolean

  @Column()
  unit_price: number

  @Column()
  unit_price_vat: number

  @Column()
  purchase_price: number

  @Column()
  purchase_price_vat: number

  @Column()
  purchase_price_total: number

  @Column({ default: 0 })
  purchase_price_discount: number

  @CreateDateColumn()
  created_at: Date
}
