import fastify, { FastifyPluginCallback } from 'fastify'
import { getRepository } from 'typeorm'
import { PurchaseProduct } from './../../../entity/PurchaseProduct'
import { Account } from './../../../entity/Account'
import { Purchase } from './../../../entity/Purchase'
import { PurchasePriceHistory } from './../../../entity/PurchasePriceHistory'

const purchasesRoute: FastifyPluginCallback = (fastify, apts, done) => {
  const purchaseProductRepo = getRepository(PurchaseProduct)
  const accountsRepo = getRepository(Account)
  const purchaseRepo = getRepository(Purchase)
  const purchasePriceHistoryRepo = getRepository(PurchasePriceHistory)

  fastify.get('/products', async (request, reply) => {
    const purchaseProducts = await purchaseProductRepo.find({
      relations: ['account'],
    })

    reply.send(purchaseProducts)
  })

  fastify.get<{ Params: { id: number } }>('/:id', async (request, reply) => {
    const purchaseProductId = request.params.id
    const purchaseProduct = await purchaseProductRepo.findOne(
      purchaseProductId,
      {
        relations: ['account', 'account.metadata', 'history', 'price_history'],
      }
    )

    reply.send(purchaseProduct)
  })

  fastify.post<{ Body: { name: string; account: number } }>(
    '/create/product',
    async (request, reply) => {
      const { name, account } = request.body
      const accountExist = await accountsRepo.findOne(account)

      if (!accountExist) {
        reply.send({
          message: 'Not created account',
        })
        return
      }

      const purchaseProduct = new PurchaseProduct()

      purchaseProduct.name = name
      purchaseProduct.account = accountExist

      await purchaseProductRepo.save(purchaseProduct)

      const purchaseProducts = await purchaseProductRepo.find({
        relations: ['account'],
      })
      reply.send(purchaseProducts)
    }
  )

  // Purchase
  fastify.post<{
    Params: { accountid: number }
    Body: {
      name: string
      quantity: number
      include_vat: boolean
      unit_price: number
      purchase_price_discount: number
    }
  }>('/:accountid/add/purchase', async (request, reply) => {
    const accountId = request.params.accountid
    const {
      name,
      quantity,
      include_vat,
      unit_price,
      purchase_price_discount,
    } = request.body
    try {
      const accountExist = await accountsRepo.findOne(accountId)
      if (!accountExist) {
        reply.status(500)
        reply.send({
          code: 500,
          error: 'AccountNotFoundError',
          message: 'Account Not Founded',
        })
        return
      }

      let purchaseProduct = await purchaseProductRepo.findOne({ name })

      if (!purchaseProduct) {
        const createPurchaseProduct = new PurchaseProduct()
        createPurchaseProduct.name = name
        createPurchaseProduct.account = accountExist
        await purchaseProductRepo.save(createPurchaseProduct)
      }

      purchaseProduct = await purchaseProductRepo.findOne({ name })

      const addPurchase = new Purchase()
      addPurchase.name = purchaseProduct
      addPurchase.quantity = quantity
      addPurchase.include_vat = include_vat
      addPurchase.unit_price = unit_price
      addPurchase.unit_price_vat = unit_price * 0.1
      addPurchase.purchase_price = unit_price * quantity
      addPurchase.purchase_price_vat = unit_price * quantity * 0.1
      addPurchase.purchase_price_discount = purchase_price_discount
      addPurchase.purchase_price_total =
        unit_price * quantity -
        purchase_price_discount +
        (unit_price * quantity - purchase_price_discount) * 0.1

      purchaseProduct.stock = purchaseProduct.stock + quantity
      if (
        purchaseProduct.total_price !=
        unit_price - purchase_price_discount / quantity
      ) {
        if (purchaseProduct.unit_price && purchaseProduct.total_price != 0) {
          const addPurchasePriceHistory = new PurchasePriceHistory()
          addPurchasePriceHistory.name = purchaseProduct
          addPurchasePriceHistory.unit_price = purchaseProduct.unit_price
          addPurchasePriceHistory.unit_price_discount =
            purchaseProduct.unit_price_discount
          addPurchasePriceHistory.price = purchaseProduct.price
          addPurchasePriceHistory.price_vat = purchaseProduct.price_vat
          addPurchasePriceHistory.total_price = purchaseProduct.total_price

          await purchasePriceHistoryRepo.save(addPurchasePriceHistory)
        }
        purchaseProduct.unit_price = unit_price
        purchaseProduct.unit_price_discount = purchase_price_discount / quantity
        purchaseProduct.price = unit_price - purchase_price_discount / quantity
        purchaseProduct.price_vat =
          (unit_price - purchase_price_discount / quantity) * 0.1
        purchaseProduct.total_price =
          purchaseProduct.price + purchaseProduct.price_vat
      }
      await purchaseProductRepo.save(purchaseProduct)
      await purchaseRepo.save(addPurchase)

      reply.send(addPurchase)
    } catch (error) {
      console.log(error)
    }
  })

  done()
}

export default purchasesRoute
