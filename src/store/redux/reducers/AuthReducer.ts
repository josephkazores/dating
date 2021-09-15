import { Action, User } from '../../types'

declare type State = {
  user?: User
  loggedIn?: boolean
}

const INITIAL_STATE: State = {}

export default (state = INITIAL_STATE, action: Action) => {
  switch (action.type) {
    case 'TOGGLE_LOGGED_IN':
      return {
        ...state,
        loggedIn: !state.loggedIn,
      }
    default:
      return state
  }
}
