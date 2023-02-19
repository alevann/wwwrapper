import { Blockchain } from "../blockchain/blockchain";
import BlockView from "./BlockView";
import './BlockchainView.css'

type Props = {
  blockchain: {
    blocks: Blockchain['chain']
    difficulty: Blockchain['difficulty']
  }
}

function BlockchainView({ blockchain }: Props): JSX.Element {
  return (
    <div className='blockchain-container'>
      {
        blockchain.blocks.map(block =>
          <BlockView block={block} key={block.hash} />
        )
      }
    </div>
  )
}

export default BlockchainView

