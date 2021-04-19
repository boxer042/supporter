import { FastifyPluginCallback } from 'fastify'
import accountsRoute from './accounts'
import purchasesRoute from './purchases'

const apiRoute: FastifyPluginCallback = (fastify, apts, done) => {
  fastify.register(accountsRoute, { prefix: '/accounts' })
  fastify.register(purchasesRoute, { prefix: '/purchases' })
  done()
}

export default apiRoute
