import fastify, { FastifyPluginCallback } from 'fastify'
import { getRepository } from 'typeorm'
import { Account } from '../../../entity/Account'
import { Purchase } from '../../../entity/Purchase'
import { PurchasePriceHistory } from '../../../entity/PurchasePriceHistory'
import { PurchaseGoods } from './../../../entity/PurchaseGoods'

const purchaseRoute: FastifyPluginCallback = (fastify, apts, done) => {
  const purchaseGoodsRepo = getRepository(PurchaseGoods)
  const accountsRepo = getRepository(Account)
  const purchaseRepo = getRepository(Purchase)
  const purchasePriceHistoryRepo = getRepository(PurchasePriceHistory)

  fastify.get<{ Querystring: { keyword: string } }>(
    '/search',
    async (request, reply) => {
      const search = request.query.keyword
      const results = fastify.searchEngine
        .searchPurchaseGoods(search)
        .slice(0, 10)
        .map((result) => ({
          id: result.item.id,
          supplied_name: result.item.supplied_name,
          include: result.item.include,
          stock: result.item.stock,
          supplied_value: result.item.supplied_value,
          supplied_vat: result.item.supplied_vat,
          supplied_price: result.item.supplied_price,
          supplied_value_price: result.item.supplied_value_discount,
          purchase_value: result.item.purchase_value,
          purchase_vat: result.item.purchase_vat,
          purchase_price: result.item.purchase_vat,
          account: result.item.account,
        }))
      reply.send(results)
    }
  )

  fastify.get('/products', async (request, reply) => {
    const purchaseProducts = await purchaseGoodsRepo.find({
      relations: ['account'],
    })

    reply.send(purchaseProducts)
  })

  fastify.get<{ Params: { id: number } }>('/:id', async (request, reply) => {
    const purchaseProductId = request.params.id
    const purchaseProduct = await purchaseGoodsRepo.findOne(purchaseProductId, {
      relations: ['account', 'account.metadata', 'purchase', 'price_history'],
    })

    reply.send(purchaseProduct)
  })

  // fastify.post<{ Body: { name: string; account: number } }>(
  //   '/create/product',
  //   async (request, reply) => {
  //     const { name, account } = request.body
  //     const accountExist = await accountsRepo.findOne(account)

  //     if (!accountExist) {
  //       reply.send({
  //         message: 'Not created account',
  //       })
  //       return
  //     }

  //     const purchaseProduct = new PurchaseProduct()

  //     purchaseProduct.name = name
  //     purchaseProduct.account = accountExist

  //     await purchaseGoodsRepo.save(purchaseProduct)

  //     const purchaseProducts = await purchaseGoodsRepo.find({
  //       relations: ['account'],
  //     })
  //     reply.send(purchaseProducts)
  //   }
  // )

  // Purchase
  fastify.post<{
    Body: {
      purchased_at: Date
      account_id: number
      supplied_name: string
      include: boolean
      include_vat: boolean
      quantity: number
      supplied_value: number
      supplied_price: number
      supplied_value_discount: number
      total_supplied_value_discount: number
    }
  }>('/add', async (request, reply) => {
    const {
      purchased_at,
      account_id,
      supplied_name,
      include,
      include_vat,
      quantity,
      supplied_value,
      supplied_price,
      supplied_value_discount,
      total_supplied_value_discount,
    } = request.body

    try {
      const accountExist = await accountsRepo.findOne(account_id)

      if (!accountExist) {
        reply.status(500)
        reply.send({
          code: 500,
          error: 'AccountNotFoundError',
          message: 'Account Not Founded',
        })
        return
      }

      let purchaseGoods = await purchaseGoodsRepo.findOne({ supplied_name })

      if (!purchaseGoods) {
        const createPurchaseProduct = new PurchaseGoods()
        createPurchaseProduct.supplied_name = supplied_name
        createPurchaseProduct.account = accountExist
        await purchaseGoodsRepo.save(createPurchaseProduct)
        console.log('새 품목 생성')
      }

      purchaseGoods = await purchaseGoodsRepo.findOne({ supplied_name })

      let suppliedValue: number
      let suppliedVat: number
      let suppliedPrice: number

      if (include_vat) {
        suppliedValue = supplied_price / 1.1
        suppliedVat = suppliedValue * 0.1
        suppliedPrice = supplied_price
      } else {
        suppliedValue = supplied_value
        suppliedVat = suppliedValue * 0.1
        suppliedPrice = suppliedValue * 1.1
      }

      let suppliedValueDiscount: number
      let totalSuppliedValueDiscount: number

      if (total_supplied_value_discount && !supplied_value_discount) {
        suppliedValueDiscount = total_supplied_value_discount / quantity
      } else {
        totalSuppliedValueDiscount = supplied_value_discount * quantity
      }

      const purchaseValue = suppliedValue - suppliedValueDiscount
      const purchaseVat = purchaseValue * 0.1
      const purchasePrice = purchaseValue * 1.1

      const totalPurchaseValue = purchaseValue * quantity
      const totalPurchaseVat = purchaseVat * quantity
      const totalPurchasePrice = purchasePrice * quantity

      const testPurchase = {
        include: false,
        supplied_name: supplied_name,
        quantity: quantity,
        supplied_value: suppliedValue,
        supplied_vat: suppliedVat,
        supplied_price: suppliedPrice,
        total_supplied_value_discount: totalSuppliedValueDiscount,
        purchase_value: purchaseValue,
        purchase_vat: purchaseVat,
        purchase_price: purchasePrice,
        total_purchase_value: totalPurchaseValue,
        total_purchase_vat: totalPurchaseVat,
        total_purchase_price: totalPurchasePrice,
      }

      const writePurchase = new Purchase()
      writePurchase.supplied_name = purchaseGoods
      writePurchase.include = include
      writePurchase.quantity = quantity
      writePurchase.supplied_value = suppliedValue
      writePurchase.supplied_vat = suppliedVat
      writePurchase.supplied_price = suppliedPrice
      writePurchase.supplied_value_discount = suppliedValueDiscount
      writePurchase.total_supplied_value_discount = totalSuppliedValueDiscount
      writePurchase.purchase_value = purchaseValue
      writePurchase.purchase_vat = purchaseVat
      writePurchase.purchase_price = purchasePrice
      writePurchase.total_purchase_value = totalPurchaseValue
      writePurchase.total_purchase_vat = totalPurchaseVat
      writePurchase.total_purchase_price = totalPurchasePrice

      if (
        writePurchase.supplied_value !== purchaseGoods.supplied_value ||
        writePurchase.include !== purchaseGoods.include ||
        writePurchase.supplied_value_discount !==
          purchaseGoods.supplied_value_discount ||
        writePurchase.purchase_value !== purchaseGoods.purchase_value
      ) {
        reply.send({ 달라: '달라' })
        return
      }

      purchaseGoods.stock = purchaseGoods.stock + quantity
      purchaseGoods.include = include
      purchaseGoods.supplied_value = suppliedValue
      purchaseGoods.supplied_vat = suppliedVat
      purchaseGoods.supplied_price = suppliedPrice
      purchaseGoods.supplied_value_discount = suppliedValueDiscount
      purchaseGoods.purchase_value = purchaseValue
      purchaseGoods.purchase_vat = purchaseVat
      purchaseGoods.purchase_price = purchasePrice
      // if (
      //   purchaseProduct.total_price !==
      //   unit_price - purchase_price_discount / quantity
      // ) {
      //   if (purchaseProduct.unit_price && purchaseProduct.total_price !== 0) {
      //     const addPurchasePriceHistory = new PurchasePriceHistory()
      //     addPurchasePriceHistory.name = purchaseProduct
      //     addPurchasePriceHistory.unit_price = purchaseProduct.unit_price
      //     addPurchasePriceHistory.unit_price_discount =
      //       purchaseProduct.unit_price_discount
      //     addPurchasePriceHistory.price = purchaseProduct.price
      //     addPurchasePriceHistory.price_vat = purchaseProduct.price_vat
      //     addPurchasePriceHistory.total_price = purchaseProduct.total_price

      //     await purchasePriceHistoryRepo.save(addPurchasePriceHistory)
      //   }
      //   purchaseProduct.unit_price = unit_price
      //   purchaseProduct.unit_price_discount = purchase_price_discount / quantity
      //   purchaseProduct.price = unit_price - purchase_price_discount / quantity
      //   purchaseProduct.price_vat =
      //     (unit_price - purchase_price_discount / quantity) * 0.1
      //   purchaseProduct.total_price =
      //     purchaseProduct.price + purchaseProduct.price_vat
      // }
      await purchaseGoodsRepo.save(purchaseGoods)
      await purchaseRepo.save(writePurchase)

      reply.send(writePurchase)
    } catch (error) {
      console.log(error)
    }
  })

  done()
}

export default purchaseRoute
