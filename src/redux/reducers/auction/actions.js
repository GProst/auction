export const SET_CONNECTION_STATUS = 'auction/SET_CONNECTION_STATUS'

export const setConnectionStatus = payload => {
  return {
    type: SET_CONNECTION_STATUS,
    payload
  }
}
