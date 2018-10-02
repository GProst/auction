import {SET_CONNECTION_STATUS} from './actions'

export * from './actions'

export const defaultState = {
  isConnectedToWS: false
}

export const auction = (previousState = defaultState, action) => {
  switch (action.type) {
    case SET_CONNECTION_STATUS:
      return {
        ...previousState,
        isConnectedToWS: action.payload
      }
    default:
      return previousState
  }
}
