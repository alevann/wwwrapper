import { Action, WWEReq, WWERes, WWEvent } from "./types";

/**
 * The function which resolves the promise, this is really just to keep type safety
 */
type WWCReceiver <
  Actions extends string,
  Events extends WWEvent<Actions, unknown, unknown>
> = <Key extends Actions> (data: WWERes<Actions, Events, Key>) => void

export type WWClient <
  Actions extends string,
  Events extends WWEvent<Actions, unknown, unknown>
> = {
  do: <Key extends Actions> (
    key: Key,
    data: WWEReq<Actions, Events, Key>
  ) => Promise<WWERes<Actions, Events, Key>>
}

/**
 * The client web worker wrapper
 *
 * @param worker the worker to wrap
 * @param globalEventHandler an optional event handler called when a received event has no matching receiver
 */
export function WebWorkerClient <
  Actions extends string,
  Events extends WWEvent<Actions, unknown, unknown>
> (
  worker: Worker,
  globalEventHandler?: (data: unknown) => void
): WWClient<Actions, Events> {
  const receivers: Record<string, WWCReceiver<Actions, Events>> = {}

  worker.onmessage = (e: MessageEvent<string>) => {
    const data = JSON.parse(e.data) as WWEvent<Actions>
    const recv = receivers[data.id]

    if (delete receivers[data.id]) {
      recv(data.res)
    } else {
      recv(data)
    }
  }

  const register = (accept: WWCReceiver<Actions, Events>): string => {
    const id = window.crypto.randomUUID()
    receivers[id] = accept
    return id
  }

  const dispatch = async <Key extends Actions> (
    action: Key, data: Action<Actions, Events, Key>['req']
  ) => await new Promise(resolve => {
    const id = register(data => resolve(data))
    worker.postMessage(JSON.stringify({ action, id, req: data }))
  })

  return {
    do: dispatch
  }
}
