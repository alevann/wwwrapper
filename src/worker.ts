import { ActionHandlers, WWEReq, WWEvent } from "./types";

type ErrorHandler <
  Actions extends string,
  Events extends WWEvent<Actions, unknown, unknown>
> = (err: unknown, data: WWEReq<Actions, Events, unknown>) => void

const defaultErrorHandler: ErrorHandler<string, WWEvent<string, unknown, unknown>> = err => {
  console.warn('ww: uncaught exception', err)
}

/**
 * Registers the passed handlers
 *
 * @param handlers the event handlers
 * @param uncaughtErrorHandler an optional event handler called when another event handler throws and doesn't catch the error
 * @param unknownEventHandler an optional event handler called when an unknown event is received
 */
export function register <
  Actions extends string,
  Events extends WWEvent<Actions, unknown, unknown>
> (
  handlers: ActionHandlers<Actions, Events>,
  uncaughtErrorHandler: ErrorHandler<Actions, Events> = defaultErrorHandler,
  unknownEventHandler?: (data: unknown) => void
) {
  self.onmessage = (e: MessageEvent<string>): void => {
    const data = JSON.parse(e.data) as WWEvent<Actions>

    const finish = (res?: unknown): void => {
      self.postMessage(JSON.stringify({
        res,
        action: data.action,
        id: data.id
      }))
    }

    const handler = handlers[data.action]
    if (!handler) {
      return unknownEventHandler?.(data)
    }

    try {
      const result = handler(data.req)
      if (isPromise(result)) {
        result.then(finish)
      } else {
        finish(result)
      }
    } catch (e) {
      uncaughtErrorHandler(e, data.req)
    }
  }
}

function isPromise <T> (data: Promise<T> | T): data is Promise<T> {
  return !!(data as any).then
}
