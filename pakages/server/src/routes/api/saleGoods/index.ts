import { FastifyPluginCallback } from 'fastify'
import { getRepository } from 'typeorm'
import { PurchaseGoods } from './../../../entity/PurchaseGoods'
import { SaleGoods } from './../../../entity/SaleGoods'
import { ConnectGoods } from './../../../entity/ConnectGoods'

const saleGoodsRoute: FastifyPluginCallback = (fastify, apts, done) => {
  const purchasedGoodsRepo = getRepository(PurchaseGoods)
  const saleGoodsRepo = getRepository(SaleGoods)
  const connectGoodsRepo = getRepository(ConnectGoods)

  /**
   * POST /api/saleGoods/create
   * 상품 생성
   */
  fastify.post<{
    Body: {
      name: string
      brand: string
      type: string
      apply_purchased_value: number
      apply_purchased_vat: number
      apply_purchased_price: number
      sale_value: number
      sale_vat: number
      sale_price: number
      margin: number
      margin_card: number
      margin_rate: number
      margin_card_rate: number
      card_fee: number
      purchased_goods: number | null
    }
  }>('/create', async (request, reply) => {
    const {
      name,
      brand,
      type,
      apply_purchased_value,
      apply_purchased_vat,
      apply_purchased_price,
      sale_value,
      sale_vat,
      sale_price,
      margin,
      margin_card,
      margin_rate,
      margin_card_rate,
      card_fee,
      purchased_goods,
    } = request.body

    try {
      // 구매상품 조회(id)
      const purchasedExists = await purchasedGoodsRepo.findOne(
        purchased_goods,
        {
          relations: ['account', 'account.metadata'],
        }
      )
      if (!purchasedExists) {
        reply.status(404)
        reply.send({
          code: 404,
          error: 'Purchased Goods Not Founded',
          message: '구매한 상품이 없습니다.',
        })
        return
      }

      const saleGoods = await saleGoodsRepo.findOne({ name })
      if (saleGoods) {
        reply.send({
          message: '이미 생성한 상품입니다.',
        })
        return
      }

      const createSaleGoods = new SaleGoods()
      createSaleGoods.name = name
      createSaleGoods.brand = brand
      createSaleGoods.type = type
      createSaleGoods.apply_purchased_value = apply_purchased_value
      createSaleGoods.apply_purchased_vat = apply_purchased_vat
      createSaleGoods.apply_purchased_price = apply_purchased_price
      createSaleGoods.sale_value = sale_value
      createSaleGoods.sale_vat = sale_vat
      createSaleGoods.sale_price = sale_price
      createSaleGoods.margin = margin
      createSaleGoods.margin_card = margin_card
      createSaleGoods.margin_rate = margin_rate
      createSaleGoods.margin_card_rate = margin_card_rate
      createSaleGoods.card_fee = card_fee
      createSaleGoods.purchased_goods = purchasedExists

      await saleGoodsRepo.save(createSaleGoods)
      reply.send(createSaleGoods)
    } catch (error) {
      reply.send(error)
    }
  })

  /**
   * GET /api/saleGoods
   * 상품 전체불러오기
   */
  fastify.get('/', async (request, reply) => {
    const saleGoods = await saleGoodsRepo.find({
      relations: ['purchased_goods'],
    })
    reply.send(saleGoods)
  })
  done()
}

export default saleGoodsRoute

// fastify.post<{
//     Body: {
//       purchased_goods: {
//         purchased_id: number
//         use_stock: number
//       }[]
//       name: string
//       memo: string
//     }
//   }>('/create', async (request, reply) => {
//     const { purchased_goods, name, memo } = request.body

//     const purchased_id = purchased_goods.map((id) => id.purchased_id)
//     const use_stock = purchased_goods.map((stock) => stock.use_stock)
//     try {
//       // 구매상품 조회(id)
//       const purchasedExists = await purchasedGoodsRepo.findByIds(purchased_id, {
//         relations: ['account', 'account.metadata'],
//       })
//       if (purchasedExists.length !== purchased_id.length) {
//         // purchased_id에서 받은 아이디 수와 유효성검사를 한 아이디 수가 다를경우
//         reply.status(404)
//         reply.send({
//           code: 404,
//           error: 'Purchased Goods Not Founded',
//           message: '구매한 상품이 없습니다.',
//         })
//         return
//       }

//       const saleGoods = await saleGoodsRepo.findOne({ name })
//       if (saleGoods) {
//         reply.send({
//           message: '이미 생성한 상품입니다.',
//         })
//         return
//       }

//       const createSaleGoods = new SaleGoods()
//       createSaleGoods.name = name
//       createSaleGoods.memo = memo

//       await saleGoodsRepo.save(createSaleGoods)

//       const saleGoodsExist = await saleGoodsRepo.findOne({ name })
//       for (let i = 0; i < purchased_goods.length; i++) {
//         let connectGoods = new ConnectGoods()
//         connectGoods.sale_goods = saleGoodsExist
//         connectGoods.purchased_goods = purchasedExists[i]
//         connectGoods.use_stock = use_stock[i]

//         await connectGoodsRepo.save(connectGoods)
//       }
//       //   await connectGoodsRepo.save(connect)
//       await saleGoodsRepo.save(createSaleGoods)
//       reply.send(createSaleGoods)
//     } catch (error) {
//       reply.send(error)
//     }
//   })
