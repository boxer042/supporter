import { FastifyPluginCallback } from 'fastify'
import accountsRoute from './accounts'
import purchaseRoute from './purchase'

const apiRoute: FastifyPluginCallback = (fastify, apts, done) => {
  fastify.register(accountsRoute, { prefix: '/accounts' })
  fastify.register(purchaseRoute, { prefix: '/purchase' })
  done()
}

export default apiRoute
