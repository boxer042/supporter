import Fuse from 'fuse.js'
import { getRepository } from 'typeorm'
import { Account } from '../entity/Account'
import { PurchaseProduct } from './../entity/PurchaseProduct'

class SearchEngine {
  accountsFuse: Fuse<Account> | null
  purchaseProductsFuse: Fuse<PurchaseProduct> | null

  async account() {
    const repo = getRepository(Account)
    const accounts = await repo.find({
      relations: ['metadata', 'handling_products'],
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
          weight: 2,
        },
      ],
    })
  }

  async purchasesProducts() {
    const repo = getRepository(PurchaseProduct)
    const purchaseProducts = await repo.find({
      relations: ['account'],
    })

    this.purchaseProductsFuse = new Fuse(purchaseProducts, {
      useExtendedSearch: true,
      includeScore: true,
      findAllMatches: true,
      distance: 4,
      threshold: 0.2,
      keys: [
        {
          name: 'name',
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
  searchPurchaseProduts(keyword: string) {
    if (!this.purchaseProductsFuse) {
      throw new Error('Purchses Products is not initialized')
    }
    return this.purchaseProductsFuse.search(keyword)
  }
}

export default SearchEngine
