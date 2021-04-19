import fastify from 'fastify'
import apiRoute from './routes/api'

const PORT = parseInt(process.env.PORT!, 10)

export default class Server {
  app = fastify({ logger: true })

  constructor() {
    this.setup()
  }

  setup() {
    this.app.register(apiRoute, { prefix: '/api' })
    this.app.get('/', (request, reply) => {
      reply.send({ hello: 'world' })
    })
  }

  start() {
    try {
      this.app.listen(PORT)
    } catch (e) {
      this.app.log.error(e)
    }
  }
}
