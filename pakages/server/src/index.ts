import 'dotenv/config'
import 'reflect-metadata'
import { createConnection } from 'typeorm'
import Server from './Server'
import { PurchaseProduct } from './entity/PurchaseProduct'
import { Account } from './entity/Account'
import { AccountMeta } from './entity/AccountMeta'

createConnection()
  .then(async (connection) => {
    const server = new Server()
    server.start()

    const account = new Account()
    const accountMeta = new AccountMeta()
    const purchaseProduct = new PurchaseProduct()
    const accountRepository = connection.getRepository(Account)
    const accountMetaRepository = connection.getRepository(AccountMeta)
    const purchaseProductRepository = connection.getRepository(PurchaseProduct)

    // const purchaseProduct1 = new PurchaseProduct()
    // const purchaseProduct2 = new PurchaseProduct()

    // account.name = '주식회사 홈앤가든'
    // account.office = '028443200'
    // account.fax = '028440141'

    // purchaseProduct1.name = '관리기'
    // purchaseProduct1.account = account
    // purchaseProduct2.name = '쟁기'
    // purchaseProduct2.account = account

    // await purchaseProductRepository.save(purchaseProduct1)
    // await purchaseProductRepository.save(purchaseProduct2)
    // await accountRepository.save(account)

    // const accountToUpdate = await accountRepository.findOne(1)
    // accountMeta.crn = '1088175731'
    // accountMeta.representation = '주상열'
    // accountMeta.address = '서울 영등포구 신길동 107-4'
    // accountMeta.category = '제조,도매'
    // accountMeta.category_type = '농원예기계공구'
    // accountToUpdate.metadata = accountMeta

    // await accountRepository.save(accountToUpdate)

    // purchaseProduct.name = '관리기 A50M 7HP 212CC'
    // // purchaseProduct.name = 'A50M 쟁기셋-관리기용'
    // purchaseProduct.account = accountToUpdate

    // accountToUpdate.handling_products = [purchaseProduct]

    // await accountRepository.save(accountToUpdate)
    // await purchaseProductRepository.save(purchaseProduct)

    // const accounts = await accountRepository.findOne(1, {
    //   relations: ['metadata', 'handling_products'],
    // })
    // console.log(accounts)
  })
  .catch((error) => console.log(error))
