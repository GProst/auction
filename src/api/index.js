import {store} from '../redux/store'
import {updateAuctionState} from '../redux/reducers/auction/actions'

export const startAuction = async ({itemName, startingPrice}) => {
  // TODO: integrate real WS server
  await new Promise(resolve => {
    setTimeout(resolve, 1000)
  })
  store.dispatch(updateAuctionState({
    isAuctionStarted: true,
    currentPrice: null,
    leader: null,
    offerors: [],
    itemName,
    startingPrice
  }))
}

export const stopAuction = async () => {
  // TODO: integrate real WS server
  await new Promise(resolve => {
    setTimeout(resolve, 1000)
  })
  store.dispatch(updateAuctionState({
    isAuctionStarted: false,
    currentPrice: null,
    leader: null,
    offerors: [],
    itemName: '',
    startingPrice: null
  }))
}
