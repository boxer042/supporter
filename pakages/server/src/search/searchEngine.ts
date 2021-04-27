import Fuse from 'fuse.js'
import { getRepository } from 'typeorm'
import { Account } from '../entity/Account'

class SearchEngine {
  fuse: Fuse<Account> | null

  async initialize() {
    const repo = getRepository(Account)
    const accounts = await repo.find({
      relations: ['metadata', 'handling_products'],
    })

    this.fuse = new Fuse(accounts, {
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

  search(keyword: string) {
    if (!this.fuse) {
      throw new Error('Fuse is not initialized')
    }
    return this.fuse.search(keyword)
  }
}

export default SearchEngine
