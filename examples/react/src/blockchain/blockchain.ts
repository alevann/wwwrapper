import { Block, createBlock, hash } from "./block";

export class Blockchain {
  chain: Array<Readonly<Block>>
  difficulty: number

  constructor (chain: Blockchain = undefined) {
    if (chain) {
      this.chain = chain.chain
      this.difficulty = chain.difficulty
    } else {
      this.chain = [createBlock('Genesis block')]
      this.difficulty = 4
    }
  }

  head () {
    return this.chain[this.chain.length - 1]
  }

  add (block: Block) {
    this.chain.push(Object.freeze(block))

    if (!this.validate()) {
      this.chain.pop()
    }
  }

  validate () {
    for (let i = 1; i < this.chain.length; i++) {
      const c = this.chain[i]
      const p = this.chain[i - 1]

      if (c.hash !== hash(c) || p.hash !== c.prev) {
        return false
      }
    }
    return true
  }
}
