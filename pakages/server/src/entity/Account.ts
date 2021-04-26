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
/**
 * "SELECT 
`purchase_products`.`id` AS `purchase_products_id`,
`purchase_products`.`name` AS `purchase_products_name`,
`purchase_products`.`created_at` AS `purchase_products_created_at`,
`purchase_products`.`updated_at` AS `purchase_products_updated_at`,
`purchase_products`.`accountId` AS `purchase_products_accountId`,
`account`.`id` AS `account_id`,
`account`.`name` AS `account_name`,
`account`.`office` AS `account_office`,
`account`.`fax` AS `account_fax`,
`account`.`phone` AS `account_phone`,
account.metadata AS `account_metadata`
FROM `purchase_products``purchase_products`
LEFT JOIN `accounts` `account`
ON `account`.`id`=`purchase_products`.`accountId`", 
*/
