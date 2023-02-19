import { Block } from "../blockchain/block";
import './BlockView.css'

type Props = {
  block: Block
}

function BlockView({ block }: Props): JSX.Element {
  return (
    <div className='block-container'>
      {!block.prev && <h2 className='genesis'>Genesis block</h2>}
      <p className='block-label'>Timestamp:</p>
      <p>{block.timestamp} ({new Date(block.timestamp).toLocaleDateString()})</p>
      <p className='block-label'>Previous:</p>
      <p>{block.prev || 'None'}</p>
      <p className='block-label'>Hash:</p><p>{block.hash}</p>
      <p className='block-label'>Nonce:</p><p>{block.nonce}</p>
      <pre className='block-data'>{block.data}</pre>
    </div>
  )
}

export default BlockView

