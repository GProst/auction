import {store} from '../redux/store'
import {updateAuctionState} from '../redux/reducers/auction/actions'
import io from 'socket.io-client'

let socket

export const connectToWS = () => {
  socket = io('http://localhost:3051', {
    transports: ['websocket']
  })
  socket.on('disconnect', () => {
    store.dispatch(updateAuctionState({
      isConnectedToWS: false
    }))
    socket.connect()
  })
  socket.on('initial-connect', data => {
    store.dispatch(updateAuctionState({
      isConnectedToWS: true,
      ...data
    }))
  })
}

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

export const submitOffer = async ({bidderId, offerPrice}) => {
  // TODO: integrate real WS server
  await new Promise(resolve => {
    setTimeout(resolve, 1000)
  })
  store.dispatch(updateAuctionState({
    isAuctionStarted: false,
    currentPrice: offerPrice.toString(),
    leader: bidderId,
    offerors: [bidderId],
    itemName: '',
    startingPrice: null
  }))
}
