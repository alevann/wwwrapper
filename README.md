# wwwrapper

wwwrapper is a type-safe, promise based wrapper around the Web Worker API.
It's based around a simple event structure which is made of three components:

* an action (the name of the event) which defines what the worker should do
* an input payload
* an output payload

## Usage

Define your events in a `events.ts` file as follows:

```ts
import { WWEvent } from "./types";

/**
 * This is the data that will be passed to the handler
 * registred in the web worker
 */
type MineReq = { block: Block, difficulty: number }

/**
 * This is the data that will be returned to the client
 * that started the event
 */
type MineRes = { block: Block }

/**
 * 'mine' is the name of the event
 */
type MineEvent = WWEvent<'mine', MineReq, MineRes>

/**
 * An example event with no output
 */
type SomeOtherEvent = WWEvent<'someOtherEvent', number[]>

/**
 * These unions will be used later when registering
 * the handlers and creating the client
 */
type Events = MineEvent | SomeOtherEvent /* ... */
type Actions = Events['action']
```

Next inside of your `worker.ts` file register your handlers:

```ts
register<Events, Actions>({
  // 'mine' is the name of the event,
  // as specified in the WWEvent above
  mine: async (data) => {
    // 'data' is a MineReq as defined above
    // the return value must match the MineRes defined above
    return { block }
  },
  someOtherEvent: someOtherEventHandler
})

function someOtherEventHandler (
  // WWEReq matches the type specified in the request
  // associated with 'someOtherEvent'
  data: WWEReq<Events, Actions, 'someOtherEvent'>
) {
  // handlers don't need to return anything
  // if no response type is specified in the event 
}
```

Finally, create a client:

```ts
const worker: Worker = createWorker()  // create your worker here
const ww = WebWorkerClient<Actions, Events>(worker)

// Example usage
const { block } = await ww.do('mine', { block, difficulty })
```

You can find a more complete example in the `examples/react` folder.
