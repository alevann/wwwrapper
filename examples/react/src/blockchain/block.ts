import { sha256 } from './sha256'

export type Block = {
  timestamp: number
  data: string
  hash: string
  prev: string
  nonce: number
}

export function createBlock (
  data: string = '',
  prev: string = ''
): Block {
  const block = {
    timestamp: Date.now(),
    data,
    prev,
    nonce: 0,
    hash: ''
  }
  block.hash = hash(block)

  return block
}

export function hash (b: Block) {
  return sha256(b.prev + b.timestamp + JSON.stringify(b.data) + b.nonce)
}
