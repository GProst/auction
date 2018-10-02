import {SET_CONNECTION_STATUS} from './actions'

export * from './actions'

export const defaultState = {
  isConnectedToWS: true,
  isAuctionStarted: false,
  itemName: '',
  startingPrice: 0,
  currentPrice: 0,
  leader: null,
  offerors: []
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
