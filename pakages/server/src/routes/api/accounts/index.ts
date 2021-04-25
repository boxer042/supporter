import { FastifyPluginCallback } from 'fastify'
import { getRepository } from 'typeorm'
import { Account } from './../../../entity/Account'
import { AccountMeta } from './../../../entity/AccountMeta'

const accountsRoute: FastifyPluginCallback = (fastify, apts, done) => {
  /**
   * GET /api/accounts
   * Accounts List
   */
  fastify.get('/', async (request, reply) => {
    const accountsRepo = getRepository(Account)

    const accounts = await accountsRepo.find()
    if (accounts.length === 0) {
      reply.send({
        code: 401,
        error: 'Accounts Empty',
        message: 'Failed to recive Accounts Lists',
      })
      return
    }

    reply.send(accounts)
  })

  /**
   * GET /api/accounts/:id
   * Account
   */
  fastify.get<{ Params: { id: number } }>('/:id', async (request, reply) => {
    const accountId = request.params.id
    try {
      const accountsRepo = getRepository(Account)
      const account = await accountsRepo.findOne(accountId, {
        relations: ['metadata', 'handling_products'],
      })
      if (!account) {
        reply.status(500)
        reply.send({
          code: 500,
          error: 'Not Found Account',
          message: 'Not created account',
        })
        return
      }
      reply.send(account)
    } catch (error) {
      reply.status(401)
      reply.send({
        code: 401,
        error: 'Join Account Error',
        message: 'Failed to join account',
      })
    }
  })

  /**
   * POST /api/accounts/create
   * Create Account
   */
  fastify.post<{
    Body: { name: string; office: string; fax: string; phone: string }
  }>('/create', async (request, reply) => {
    const { name, office, fax, phone } = request.body

    try {
      const accountsRepo = getRepository(Account)
      const exist = await accountsRepo.findOne({ name })
      if (exist) {
        reply.status(401)
        reply.send({
          message: 'account exist',
        })
        return
      }

      const account = new Account()
      account.name = name
      account.office = office
      account.fax = fax
      account.phone = phone
      await accountsRepo.save(account)

      reply.send({
        account: account,
      })
    } catch (error) {
      reply.status(401)
      reply.send({
        code: 401,
        error: 'Create Account Error',
        message: 'Failed to create account',
      })
    }
  })

  /**
   * POST /api/accounts/:id/metadata/add
   * Add metadata to account
   */
  fastify.post<{
    Params: { id: number }
    Body: {
      crn: string
      representatives: string
      address: string
      category: string
      category_type: string
    }
  }>('/:id/metadata/add', async (request, reply) => {
    const accountId = request.params.id
    const {
      crn,
      representatives,
      address,
      category,
      category_type,
    } = request.body

    try {
      const accountsRepo = getRepository(Account)
      const accountsMetaRepo = getRepository(AccountMeta)

      const account = await accountsRepo.findOne(accountId, {
        relations: ['metadata', 'handling_products'],
      })
      if (!account) {
        reply.status(401)
        reply.send({
          code: 401,
          error: 'Not Create Account',
          message: 'Not create account',
        })
        return
      }
      const accountMetaExist = await accountsMetaRepo.findOne({ crn })
      if (accountMetaExist) {
        reply.send({
          error: '이미 있어',
          result: accountMetaExist,
        })
        return
      }

      const accountMeta = new AccountMeta()
      accountMeta.crn = crn
      accountMeta.representatives = representatives
      accountMeta.address = address
      accountMeta.category = category
      accountMeta.category_type = category_type

      account.metadata = accountMeta
      await accountsRepo.save(account)
      reply.send(account)
    } catch (error) {
      console.log(error)
    }
  })
  done()
}

export default accountsRoute