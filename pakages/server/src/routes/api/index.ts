import { FastifyPluginCallback } from 'fastify'
import accountsRoute from './accounts'
import purchaseRoute from './purchase'
import saleGoodsRoute from './saleGoods'

const apiRoute: FastifyPluginCallback = (fastify, apts, done) => {
  fastify.register(accountsRoute, { prefix: '/accounts' })
  fastify.register(purchaseRoute, { prefix: '/purchase' })
  fastify.register(saleGoodsRoute, { prefix: '/saleGoods' })
  done()
}

export default apiRoute
