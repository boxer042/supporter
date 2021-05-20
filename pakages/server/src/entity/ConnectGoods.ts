import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { SaleGoods } from './SaleGoods'
import { PurchaseGoods } from './PurchaseGoods'

@Entity()
export class ConnectGoods {
  @PrimaryGeneratedColumn()
  id: number

  @ManyToOne((type) => SaleGoods, (saleGoods) => saleGoods.connect_goods)
  sale_goods: SaleGoods

  @ManyToOne(
    (type) => PurchaseGoods,
    (purchaseGoods) => purchaseGoods.connect_goods
  )
  purchased_goods: PurchaseGoods

  @Column({ default: 0 })
  use_stock: number
}
