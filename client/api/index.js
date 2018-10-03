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
  socket.on('connect_error', () => {
    setTimeout(() => {
      socket.connect()
    }, 1000)
  })
  socket.on('initial-connect', data => {
    store.dispatch(updateAuctionState({
      isConnectedToWS: true,
      ...data
    }))
  })
  socket.on('auction-update', data => {
    store.dispatch(updateAuctionState(data))
  })
}

export const startAuction = ({itemName, startingPrice}) => {
  return new Promise(resolve => {
    socket.emit('start-auction', {itemName, startingPrice}, data => {
      store.dispatch(updateAuctionState(data))
      resolve()
    })
  })
}

export const stopAuction = async () => {
  return new Promise(resolve => {
    socket.emit('stop-auction', null, data => {
      store.dispatch(updateAuctionState(data))
      resolve()
    })
  })
}

export const submitOffer = async ({bidderId, offerPrice}) => {
  return new Promise(resolve => {
    socket.emit('submit-offer', {bidderId, offerPrice}, data => {
      store.dispatch(updateAuctionState(data))
      resolve()
    })
  })
}
