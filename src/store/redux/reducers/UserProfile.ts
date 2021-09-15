declare type Action = {
  type: string
}

const INITIAL_STATE = {}

export default (state = INITIAL_STATE, action: Action) => {
  switch (action.type) {
    default:
      return state
  }
}
