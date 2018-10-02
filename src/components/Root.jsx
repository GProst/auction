import React from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'
import {ConnectedRouter} from 'react-router-redux'
import {Provider} from 'react-redux'

import {store} from '../redux/store'
import {history} from '../history'

import {HomePage} from './pages/Home'
import {AuctioneerPage} from './pages/Auctioneer'
import {BidderPage} from './pages/Bidder'

import {ROUTES} from '../routes'

export class Root extends React.Component {
  static displayName = 'Root'

  render() {
    return (
      <Provider store={store}>
        <ConnectedRouter history={history} store={store}>
          <Switch>
            <Route exact strict path={ROUTES.root} component={HomePage} />
            <Route exact strict path={ROUTES.auctioneer} component={AuctioneerPage} />
            <Route exact strict path={ROUTES.bidder.routePattern} component={BidderPage} />
            <Redirect to={ROUTES.root} />
          </Switch>
        </ConnectedRouter>
      </Provider>
    )
  }
}
