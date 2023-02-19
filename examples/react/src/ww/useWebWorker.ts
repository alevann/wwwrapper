import { WebWorkerClient, WWClient } from 'wwwrapper'
import { Actions, Events } from "./events";

const worker = new Worker(new URL('./worker', import.meta.url), {
  name: 'sample',
  type: 'module',
  credentials: 'same-origin'
})
const ww = WebWorkerClient<Actions, Events>(worker)

export default function useWebWorker (): WWClient<Actions, Events> {
  return ww
}
