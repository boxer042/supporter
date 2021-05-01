import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { PurchaseGoods } from './PurchaseGoods'

@Entity()
export class Purchase {
  @PrimaryGeneratedColumn()
  id: number

  @Index()
  @ManyToOne(
    (type) => PurchaseGoods,
    (PurchaseGoods) => PurchaseGoods.supplied_name,
    { cascade: true }
  )
  supplied_name: PurchaseGoods

  @Column({ default: true })
  include: boolean

  @Column({ default: 0 })
  quantity: number

  @Column({ default: 0 })
  supplied_value: number
  @Column()
  supplied_vat: number
  @Column()
  supplied_price: number

  @Column({ default: 0 })
  supplied_value_discount: number

  @Column({ default: 0 })
  total_supplied_value_discount: number

  @Column()
  purchase_value: number
  @Column()
  purchase_vat: number
  @Column()
  purchase_price: number

  @Column()
  total_purchase_value: number
  @Column()
  total_purchase_vat: number
  @Column()
  total_purchase_price: number

  @CreateDateColumn()
  created_at: Date

  @CreateDateColumn()
  purchased_at: Date
}

/**
 * Surtax = 부가가치세
 * Supply = 공급하는 (Supplies)
 * Receive = 공급받는
 * sale = 판매
 * purchase = 구매
 * period = 기간
 *
 * supplied price = 제공되는 가격(공급처 실제 단가)
 * supplied value = 공급가액
 * supplied vat = 공급세액
 *
 * purchases
 */
