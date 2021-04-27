import fastify from 'fastify'
import apiRoute from './routes/api'
import corsPlugin from 'fastify-cors'
import searchPlugin from './plugins/searchPlugin'

const PORT = parseInt(process.env.PORT!, 10)

export default class Server {
  app = fastify({ logger: true })

  constructor() {
    this.setup()
  }

  setup() {
    this.app.register(corsPlugin, {
      origin: (origin, callback) => {
        if (!origin) {
          return callback(null, true)
        }
        const host = origin.split('://')[1]
        const allowedHost = ['localhost:3000']
        const allowed = allowedHost.includes(host)
        callback(null, allowed)
      },
      credentials: true,
    })
    this.app.register(searchPlugin)
    this.app.register(apiRoute, { prefix: '/api' })
  }

  start() {
    this.app.listen(PORT)
  }
  close() {
    return this.app.close()
  }
}
