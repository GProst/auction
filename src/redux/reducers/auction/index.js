import {UPDATE_STATE} from './actions'

export * from './actions'

export const defaultState = {
  isConnectedToWS: true,
  isAuctionStarted: false,
  itemName: '',
  startingPrice: null,
  currentPrice: null,
  leader: null,
  offerors: []
}

export const auction = (previousState = defaultState, action) => {
  switch (action.type) {
    case UPDATE_STATE:
      return {
        ...previousState,
        ...action.payload
      }
    default:
      return previousState
  }
}
