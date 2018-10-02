export const ROUTES = {
  root: '/',
  auctioneer: '/auctioneer',
  bidder: {
    routePattern: '/bidder/:id',
    getRouteByID: id => `/bidder/${id}`
  }
}
