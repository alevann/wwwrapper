import './AddBlock.css'
import { useState } from "react";
import { Block } from "../blockchain/block";

type Props = {
  isMining: boolean
  add: (data: Block['data']) => void
}

function AddBlock({ isMining, add }: Props): JSX.Element {
  const [data, setData] = useState<string>('')
  const doAdd = () => {
    add(data)
    setData('')
  }

  return (
    <div id='data-container'>
      <h2>Add block</h2>
      <textarea
        id='data'
        value={data}
        onChange={e => setData(e.target.value)}
        placeholder="Add the next block's data here..."
      />
      <button id='add-block' onClick={doAdd} disabled={isMining}>
        Add block
      </button>
    </div>
  )
}

export default AddBlock

