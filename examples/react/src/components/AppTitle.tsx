import './AppTitle.css'
import { useEffect, useState } from "react";

type Props = {
  isMining: boolean
  difficulty: number
}

function AppTitle({ isMining, difficulty }: Props): JSX.Element {
  const [time, setTime] = useState(0)
  const [intervalId, setIntervalId] = useState(null)

  useEffect(() => {
    if (isMining) { // started mining
      setTime(0)
      clearInterval(intervalId)

      setIntervalId(setInterval(() => {
        setTime(t => ++t)
      }, 1000))
    } else { // mining ended
      clearInterval(intervalId)
      setIntervalId(null)
    }
  }, [isMining])

  return (
    <div className='title-container'>
      <h1>WWWrapper Blockchain Example</h1>
      <div>
        <p className='title-label'>Current difficulty:</p>
        <p>{difficulty}</p>
      </div>
      <div>
        <p className='title-label'>Mining for:</p>
        <p>{time}s</p>
      </div>
    </div>
  )
}

export default AppTitle

