export const UPDATE_STATE = 'auction/UPDATE_STATE'

export const updateAuctionState = payload => {
  return {
    type: UPDATE_STATE,
    payload
  }
}
