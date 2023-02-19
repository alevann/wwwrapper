/**
 * Base wrapper for all events sent to, and from, the worker
 *
 * ReqPayload and ResPayload are required to be never by default
 * since never is used to infer the return type of the handler
 */
export type WWEvent<
  Name extends string,
  ReqPayload = never,
  ResPayload = never
> = {
  action: Name
  id: string
  req: ReqPayload
  res: ResPayload
}

/**
 * Shortcut to extract a specific event from the collection
 * of all events
 */
export type Action <
  Actions extends string,
  Events extends WWEvent<Actions, unknown, unknown>,
  Key
> = Extract<Events, { action: Key }>

/**
 * Shortcut to extract the type of response associated with an event
 */
export type WWERes <
  Actions extends string,
  Events extends WWEvent<Actions, unknown, unknown>,
  Key
> = Action<Actions, Events, Key>['res']

/**
 * Shortcut to extract the type of request associated with an event
 */
export type WWEReq <
  Actions extends string,
  Events extends WWEvent<Actions, unknown, unknown>,
  Key
> = Action<Actions, Events, Key>['req']

/**
 * Type definition for an event handler
 */
export type ActionHandler <
  Actions extends string,
  Events extends WWEvent<Actions, unknown, unknown>,
  Key
> = (
  data: WWEReq<Actions, Events, Key>
) => WWERes<Actions, Events, Key> extends never
  ? void
  : WWERes<Actions, Events, Key> | Promise<WWERes<Actions, Events, Key>>

/**
 * Type definition for of an object containing an action handler
 * for each available action
 */
export type ActionHandlers <
  Actions extends string,
  Events extends WWEvent<Actions, unknown, unknown>
> = {
  [Key in Actions]: ActionHandler<Actions, Events, Key>
}
