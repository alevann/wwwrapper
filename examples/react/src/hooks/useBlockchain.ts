import { useState } from "react";
import { Blockchain } from "../blockchain/blockchain";
import { Block, createBlock } from "../blockchain/block";
import useWebWorker from "../ww/useWebWorker";

export default function useBlockchain () {
  const [chain, setChain] = useState(new Blockchain())
  const ww = useWebWorker()

  return {
    chain: {
      difficulty: chain.difficulty,
      blocks: chain.chain
    },
    setDifficulty: (n: number): void => {
      chain.difficulty = n
      setChain(new Blockchain(chain))
    },
    add: async (data: Block['data']): Promise<void> => {
      // Dispatch the mining process to the background worker
      const { block } = await ww.do('mine', {
        block: createBlock(data, chain.head().hash),
        difficulty: chain.difficulty
      })
      chain.add(block)

      setChain(new Blockchain(chain))
    }
  }
}
