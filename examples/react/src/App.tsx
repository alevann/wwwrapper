import './App.css';
import React, { useCallback, useState } from "react";
import BlockchainView from "./components/BlockchainView";
import useBlockchain from "./hooks/useBlockchain";
import AddBlock from "./components/AddBlock";
import AppTitle from "./components/AppTitle";
import { Block } from "./blockchain/block";

function App (): JSX.Element {
  const { chain, add } = useBlockchain()
  const [isMining, setIsMining] = useState(false)

  const onAdd = useCallback((data: Block['data']) => {
    (async () => {
      setIsMining(true)
      await add(data)
      setIsMining(false)
    })()
  }, [add])

  return (
    <div className="App">
      <div className='app-container'>
        <AppTitle
          isMining={isMining}
          difficulty={chain.difficulty}
        />
        <AddBlock
          isMining={isMining}
          add={onAdd}
        />
        <BlockchainView
          blockchain={chain}
        />
        <div className={chain.blocks.length > 1 ? 'footer-space' : ''} />
      </div>
    </div>
  )
}

export default App;
