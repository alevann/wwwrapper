import type { WWEvent } from "wwwrapper"
import type { Block } from "../blockchain/block";

type MineReq = { block: Block, difficulty: number }
type MineRes = { block: Block }
type MineEvent = WWEvent<'mine', MineReq, MineRes>

export type Events = MineEvent
export type Actions = Events['action']
