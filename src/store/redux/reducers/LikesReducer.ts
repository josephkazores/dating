import { Action, User } from '../../types'

declare type State = {
  likes?: User[]
  matches?: User[]
}

const INITIAL_STATE: State = {}

export default (state = INITIAL_STATE, action: Action) => {
  switch (action.type) {
    default:
      return state
  }
}
