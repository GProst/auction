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

const auctionState = {
  ...defaultAuctionState
}

io.on('connection', socket => {
  socket.emit('initial-connect', auctionState)
})
