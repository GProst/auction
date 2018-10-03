'use strict'

const io = require('socket.io')(3051, {
  transports: ['websocket']
})

const defaultAuctionState = {
  isAuctionStarted: false,
  itemName: '',
  startingPrice: null,
  currentPrice: null,
  leader: null,
  offerors: []
}

// No persistent store, just in memory
let auctionState = {
  ...defaultAuctionState
}

const updateAuctionState = data => {
  auctionState = {
    ...auctionState,
    ...data
  }
}

const emitUpdate = () => {
  io.sockets.emit('auction-update', auctionState)
}

io.on('connection', socket => {
  socket.on('start-auction', (data, fn) => {
    updateAuctionState({
      ...data,
      isAuctionStarted: true
    })
    fn(auctionState)
    emitUpdate()
  })

  socket.on('stop-auction', (data, fn) => {
    updateAuctionState(defaultAuctionState)
    fn(auctionState)
    emitUpdate()
  })

  socket.on('submit-offer', (data, fn) => {
    const {bidderId, offerPrice} = data
    const offerors = [...auctionState.offerors]
    if (!offerors.includes(bidderId)) offerors.push(bidderId)
    updateAuctionState({
      leader: bidderId,
      offerors,
      currentPrice: offerPrice
    })
    fn(auctionState)
    emitUpdate()
  })

  socket.emit('initial-connect', auctionState)
})
