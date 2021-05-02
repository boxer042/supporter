import Fuse from 'fuse.js'
import { getRepository } from 'typeorm'
import { Account } from '../entity/Account'
import { PurchaseGoods } from '../entity/PurchaseGoods'

class SearchEngine {
  accountsFuse: Fuse<Account> | null
  purchaseGoodsFuse: Fuse<PurchaseGoods> | null

  async account() {
    const repo = getRepository(Account)
    const accounts = await repo.find({
      relations: ['metadata', 'handling_goods'],
    })
    this.accountsFuse = new Fuse(accounts, {
      useExtendedSearch: true,
      includeScore: true,
      findAllMatches: true,
      distance: 4,
      threshold: 0.2,
      keys: [
        {
          name: 'name',
          weight: 1,
        },
      ],
    })
  }

  async purchaseGoods() {
    const repo = getRepository(PurchaseGoods)
    const purchaseGoods = await repo.find({
      relations: ['account'],
    })

    this.purchaseGoodsFuse = new Fuse(purchaseGoods, {
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
  }

  reloadFuse() {}
  constructor() {}

  searchAccounts(keyword: string) {
    if (!this.accountsFuse) {
      throw new Error('Fuse is not initialized')
    }
    return this.accountsFuse.search(keyword)
  }
  searchPurchaseGoods(keyword: string) {
    if (!this.purchaseGoodsFuse) {
      throw new Error('Purchses Products is not initialized')
    }
    return this.purchaseGoodsFuse.search(keyword)
  }
}

export default SearchEngine
