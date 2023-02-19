import { register, WWEReq } from "wwwrapper";
import { Actions, Events } from "./events";
import { hash } from "../blockchain/block";

register<Actions, Events>({ mine })

function mine (
  { block, difficulty }: WWEReq<Actions, Events, 'mine'>
) {
  const expect = Array(difficulty + 1).join('0')
  while (!block.hash.startsWith(expect)) {
    block.nonce++
    block.hash = hash(block)
  }
  return { block }
}
