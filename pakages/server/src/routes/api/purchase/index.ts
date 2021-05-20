import fastify, { FastifyPluginCallback } from 'fastify'
import { getRepository } from 'typeorm'
import { Account } from '../../../entity/Account'
import { Purchase } from '../../../entity/Purchase'
import { PurchasePriceHistory } from '../../../entity/PurchasePriceHistory'
import { PurchaseGoods } from './../../../entity/PurchaseGoods'
import Fuse from 'fuse.js'

const purchaseRoute: FastifyPluginCallback = (fastify, apts, done) => {
  const purchaseGoodsRepo = getRepository(PurchaseGoods)
  const accountsRepo = getRepository(Account)
  const purchaseRepo = getRepository(Purchase)
  const purchasePriceHistoryRepo = getRepository(PurchasePriceHistory)

  fastify.get<{ Querystring: { keyword: string } }>(
    '/search',
    async (request, reply) => {
      const search = `'${request.query.keyword}`
      // const results = fastify.searchEngine
      //   .searchPurchaseGoods(search)
      //   .slice(0, 10)
      //   .map((result) => ({
      //     id: result.item.id,
      //     supplied_name: result.item.supplied_name,
      //     include: result.item.include,
      //     include_vat: result.item.include_vat,
      //     stock: result.item.stock,
      //     supplied_value: result.item.supplied_value,
      //     supplied_vat: result.item.supplied_vat,
      //     supplied_price: result.item.supplied_price,
      //     supplied_value_discount: result.item.supplied_value_discount,
      //     purchase_value: result.item.purchase_value,
      //     purchase_vat: result.item.purchase_vat,
      //     purchase_price: result.item.purchase_vat,
      //     account: result.item.account,
      //   }))
      const purchasedGoods = await purchaseGoodsRepo.find({
        relations: ['account', 'price_history', 'purchase'],
      })
      const purchasedGoodsFuse = new Fuse(purchasedGoods, {
        useExtendedSearch: true,
        includeScore: true,
        findAllMatches: true,
        distance: 4,
        threshold: 0.2,
        keys: [
          {
            name: 'supplied_name',
            weight: 2,
          },
        ],
      })
      // console.log(search)
      // if (search === "'") {
      //   return reply.send(purchasedGoods)
      // }
      const results = purchasedGoodsFuse.search(search).map((result) => ({
        id: result.item.id,
        supplied_name: result.item.supplied_name,
        include: result.item.include,
        include_vat: result.item.include_vat,
        stock: result.item.stock,
        supplied_value: result.item.supplied_value,
        supplied_vat: result.item.supplied_vat,
        supplied_price: result.item.supplied_price,
        supplied_value_discount: result.item.supplied_value_discount,
        purchase_value: result.item.purchase_value,
        purchase_vat: result.item.purchase_vat,
        purchase_price: result.item.purchase_price,
        account: result.item.account,
        price_history: result.item.price_history,
        purchase: result.item.purchase,
      }))
      reply.send(results)
    }
  )

  //구매 상품 현황
  fastify.get('/purchasedGoods', async (request, reply) => {
    const purchaseGoods = await purchaseGoodsRepo
      .createQueryBuilder('purchaseGoods')
      .leftJoinAndSelect('purchaseGoods.account', 'account')
      .orderBy('purchaseGoods.supplied_name', 'ASC')
      .getMany()
    //   connection.createQueryBuilder(Song, 'songs')
    //  .leftJoinAndSelect('songs.singer', 'singer')
    //  .orderBy('singer.name', 'ASC')
    //  .getMany();
    reply.send(purchaseGoods)
  })

  // 상품 구매 현황(전제보기)
  fastify.get('/purchased', async (request, reply) => {
    const purchased = await purchaseRepo.find({
      relations: ['supplied_name', 'supplied_name.account'],
    })
    reply.send(purchased)
  })

  fastify.get<{ Params: { id: number } }>('/:id', async (request, reply) => {
    const purchaseProductId = request.params.id
    const purchaseProduct = await purchaseGoodsRepo.findOne(purchaseProductId, {
      relations: [
        'account',
        'account.metadata',
        'purchase',
        'price_history',
        'sale_goods',
      ],
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

  // New Purchase Goods
  fastify.post<{
    Body: {
      purchased_at: Date
      account_id: number
      supplied_name: string
      include: boolean
      include_vat: boolean
      supplied_value: number
      supplied_vat: number
      supplied_price: number
      supplied_value_discount: number
      quantity: number
      total_supplied_value_discount: number
      purchase_value: number
      purchase_vat: number
      purchase_price: number
      total_purchase_value: number
      total_purchase_vat: number
      total_purchase_price: number
    }
  }>('/goods/append', async (request, reply) => {
    const {
      purchased_at,
      account_id,
      supplied_name,
      include,
      include_vat,
      supplied_value,
      supplied_vat,
      supplied_price,
      supplied_value_discount,
      quantity,
      total_supplied_value_discount,
      purchase_value,
      purchase_vat,
      purchase_price,
      total_purchase_value,
      total_purchase_vat,
      total_purchase_price,
    } = request.body

    try {
      // 거래처 조회
      const accountExist = await accountsRepo.findOne(account_id)

      if (!accountExist) {
        reply.status(500)
        reply.send({
          code: 500,
          error: 'Not Found Account Error',
          message: '거래처를 찾을 수 없습니다.',
        })
        return
      }

      // 구매 상품 조회
      let purchasedGoods = await purchaseGoodsRepo.findOne({ supplied_name })

      if (!purchasedGoods) {
        // 구매 상품 생성
        const createPurchaseGoods = new PurchaseGoods()
        createPurchaseGoods.supplied_name = supplied_name
        createPurchaseGoods.account = accountExist
        await purchaseGoodsRepo.save(createPurchaseGoods)
        // 구매 상품 재조회
        purchasedGoods = await purchaseGoodsRepo.findOne({ supplied_name })
      }

      // const appendPurchase = new Purchase()
      // appendPurchase.purchased_at = purchased_at
      // appendPurchase.supplied_name = purchasedGoods
      // appendPurchase.include = include
      // appendPurchase.include_vat = include_vat
      // appendPurchase.quantity = quantity
      // appendPurchase.supplied_value = supplied_value
      // appendPurchase.supplied_vat = supplied_vat
      // appendPurchase.supplied_price = supplied_price
      // appendPurchase.supplied_value_discount = supplied_value_discount
      // appendPurchase.total_supplied_value_discount = total_supplied_value_discount
      // appendPurchase.purchase_value = purchase_value
      // appendPurchase.purchase_vat = purchase_vat
      // appendPurchase.purchase_price = purchase_price
      // appendPurchase.total_purchase_value = total_purchase_value
      // appendPurchase.total_purchase_vat = total_purchase_vat
      // appendPurchase.total_purchase_price = total_purchase_price
      // purchasedGoods.stock = purchasedGoods.stock + quantity

      // // 가격 변경시 히스토리에 저장
      // if (
      //   appendPurchase.include !== purchasedGoods.include ||
      //   appendPurchase.include_vat !== purchasedGoods.include_vat ||
      //   appendPurchase.supplied_value !== purchasedGoods.supplied_value ||
      //   appendPurchase.supplied_value_discount !==
      //     purchasedGoods.supplied_value_discount ||
      //   appendPurchase.purchase_value !== purchasedGoods.purchase_value
      // ) {
      //   // 만약 첫 등록상품으로 가격이 0이면 가격히스토리에 저장하지 않는다.
      //   // 가격 변경 전 이전 가격을 가격히스토리에 기록한다.
      //   if (purchasedGoods.supplied_value !== 0) {
      //     const appendPurchasePriceHistory = new PurchasePriceHistory()
      //     appendPurchasePriceHistory.supplied_name = purchasedGoods
      //     appendPurchasePriceHistory.prev_include = purchasedGoods.include
      //     appendPurchasePriceHistory.prev_include_vat =
      //       purchasedGoods.include_vat
      //     appendPurchasePriceHistory.prev_supplied_value =
      //       purchasedGoods.supplied_value
      //     appendPurchasePriceHistory.prev_supplied_vat =
      //       purchasedGoods.supplied_vat
      //     appendPurchasePriceHistory.prev_supplied_price =
      //       purchasedGoods.supplied_price
      //     appendPurchasePriceHistory.prev_supplied_value_discount =
      //       purchasedGoods.supplied_value_discount
      //     appendPurchasePriceHistory.prev_purchase_value =
      //       purchasedGoods.purchase_value
      //     appendPurchasePriceHistory.prev_purchase_vat =
      //       purchasedGoods.purchase_vat
      //     appendPurchasePriceHistory.prev_purchase_price =
      //       purchasedGoods.purchase_price
      //     await purchasePriceHistoryRepo.save(appendPurchasePriceHistory)
      //     console.log('가격변동으로 히스토리 기록')
      //   }

      //   // 기존 구매상품에 새로운 가격 업데이트
      //   purchasedGoods.include = include
      //   purchasedGoods.include_vat = include_vat
      //   purchasedGoods.supplied_value = supplied_value
      //   purchasedGoods.supplied_vat = supplied_vat
      //   purchasedGoods.supplied_price = supplied_price
      //   purchasedGoods.supplied_value_discount = supplied_value_discount
      //   purchasedGoods.purchase_value = purchase_value
      //   purchasedGoods.purchase_vat = purchase_vat
      //   purchasedGoods.purchase_price = purchase_price
      // }

      purchasedGoods.include = include
      purchasedGoods.include_vat = include_vat
      purchasedGoods.supplied_value = supplied_value
      purchasedGoods.supplied_vat = supplied_vat
      purchasedGoods.supplied_price = supplied_price
      purchasedGoods.supplied_value_discount = supplied_value_discount
      purchasedGoods.purchase_value = purchase_value
      purchasedGoods.purchase_vat = purchase_vat
      purchasedGoods.purchase_price = purchase_price

      // 메모 일단 물품만 등록대도록 만들어놓왔음
      await purchaseGoodsRepo.save(purchasedGoods)
      // await purchaseRepo.save(appendPurchase)
      reply.send(purchasedGoods)
    } catch (error) {
      console.log(error)
    }
  })
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
  }>('/append', async (request, reply) => {
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
        reply.status(404)
        reply.send({
          code: 404,
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

      let suppliedValueDiscount: number = 0
      let totalSuppliedValueDiscount: number = 0

      if (total_supplied_value_discount > 0 && supplied_value_discount === 0) {
        suppliedValueDiscount = total_supplied_value_discount / quantity
        totalSuppliedValueDiscount = total_supplied_value_discount
      } else {
        totalSuppliedValueDiscount = supplied_value_discount * quantity
        suppliedValueDiscount = supplied_value_discount
      }

      const purchaseValue = suppliedValue - suppliedValueDiscount
      const purchaseVat = purchaseValue * 0.1
      const purchasePrice = purchaseValue * 1.1

      const totalPurchaseValue = purchaseValue * quantity
      const totalPurchaseVat = purchaseVat * quantity
      const totalPurchasePrice = purchasePrice * quantity

      // const testPurchase = {
      //   include: false,
      //   supplied_name: supplied_name,
      //   quantity: quantity,
      //   supplied_value: suppliedValue,
      //   supplied_vat: suppliedVat,
      //   supplied_price: suppliedPrice,
      //   total_supplied_value_discount: totalSuppliedValueDiscount,
      //   purchase_value: purchaseValue,
      //   purchase_vat: purchaseVat,
      //   purchase_price: purchasePrice,
      //   total_purchase_value: totalPurchaseValue,
      //   total_purchase_vat: totalPurchaseVat,
      //   total_purchase_price: totalPurchasePrice,
      // }

      const writePurchase = new Purchase()
      writePurchase.purchased_at = purchased_at
      writePurchase.supplied_name = purchaseGoods
      writePurchase.include = include
      writePurchase.include_vat = include_vat
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
      purchaseGoods.stock = purchaseGoods.stock + quantity

      if (
        writePurchase.supplied_value !== purchaseGoods.supplied_value ||
        writePurchase.include !== purchaseGoods.include ||
        writePurchase.supplied_value_discount !==
          purchaseGoods.supplied_value_discount ||
        writePurchase.purchase_value !== purchaseGoods.purchase_value ||
        writePurchase.include !== purchaseGoods.include ||
        writePurchase.include_vat !== purchaseGoods.include_vat
      ) {
        // 첫 등록 상품은 가격 히스토리에 저장 시키지 않도록 한다.

        purchaseGoods.include = include
        purchaseGoods.include_vat = include_vat
        purchaseGoods.supplied_value = suppliedValue
        purchaseGoods.supplied_vat = suppliedVat
        purchaseGoods.supplied_price = suppliedPrice
        purchaseGoods.supplied_value_discount = suppliedValueDiscount
        purchaseGoods.purchase_value = purchaseValue
        purchaseGoods.purchase_vat = purchaseVat
        purchaseGoods.purchase_price = purchasePrice

        if (
          purchaseGoods.supplied_value &&
          purchaseGoods.purchase_value &&
          purchaseGoods.purchase_price !== 0
        ) {
          const addPurchasePriceHistory = new PurchasePriceHistory()
          addPurchasePriceHistory.supplied_name = purchaseGoods
          addPurchasePriceHistory.prev_include = include
          addPurchasePriceHistory.prev_include_vat = include_vat
          addPurchasePriceHistory.prev_supplied_value = suppliedValue
          addPurchasePriceHistory.prev_supplied_vat = suppliedVat
          addPurchasePriceHistory.prev_supplied_price = suppliedPrice
          addPurchasePriceHistory.prev_supplied_value_discount =
            suppliedValueDiscount
          addPurchasePriceHistory.prev_purchase_value = purchaseValue
          addPurchasePriceHistory.prev_purchase_vat = purchaseVat
          addPurchasePriceHistory.prev_purchase_price = purchasePrice
          await purchasePriceHistoryRepo.save(addPurchasePriceHistory)
          console.log(addPurchasePriceHistory)
        }
      }

      await purchaseGoodsRepo.save(purchaseGoods)
      await purchaseRepo.save(writePurchase)

      // Output
      reply.send(writePurchase)
    } catch (error) {
      console.log(error)
    }
  })

  done()
}

export default purchaseRoute
