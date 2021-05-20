import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { ConnectGoods } from './ConnectGoods'
import { PurchaseGoods } from './PurchaseGoods'

@Entity()
export class SaleGoods {
  @PrimaryGeneratedColumn()
  id: number

  @Index({ unique: true })
  @Column()
  name: string

  @Column()
  memo: string

  @Column({ default: 0 })
  apply_purchased_value: number

  @Column({ default: 0 })
  apply_purchased_vat: number

  @Column({ default: 0 })
  apply_purchased_price: number

  @Column({ default: 0 })
  sale_value: number

  @Column({ default: 0 })
  sale_vat: number

  @Column({ default: 0 })
  sale_price: number

  @Column({ default: 0 })
  margin: number

  @Column({ default: 0 })
  margin_card: number

  @Column({ default: 0 })
  margin_rate: number

  @Column({ default: 0 })
  margin_card_rate: number

  @Column({ default: 0 })
  card_fee: number

  //   @OneToMany(
  //     (type) => PurchaseGoods,
  //     (purchaseGoods) => purchaseGoods.sale_goods
  //   )
  //   purchased_goods: {
  //     goods: PurchaseGoods
  //     use_stock: number
  //   }[]

  @OneToMany((type) => ConnectGoods, (connectGoods) => connectGoods.sale_goods)
  purchased_goods: ConnectGoods[]
}
