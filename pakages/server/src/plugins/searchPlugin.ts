import fp from 'fastify-plugin'
import { FastifyPluginAsync, FastifyPluginCallback } from 'fastify'
import SearchEngine from '../search/SearchEngine'

const callback: FastifyPluginCallback = async (fastify, opts, done) => {
  fastify.decorate('something', () => {})
  const searchEngine = new SearchEngine()
  await searchEngine.account()
  await searchEngine.purchaseGoods()

  fastify.decorate('searchEngine', searchEngine)
  done()
}

const searchPlugin = fp(callback, {
  name: 'search',
})

export default searchPlugin

declare module 'fastify' {
  interface FastifyInstance {
    searchEngine: SearchEngine
  }
}
