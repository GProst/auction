import React from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'
import {ConnectedRouter} from 'react-router-redux'
import {Provider} from 'react-redux'

import {store} from '../redux/store'
import {history} from '../history'

import {InfoPage} from './pages/Info'
import {AuctioneerPage} from './pages/Auctioneer'
import {BidderPage} from './pages/Bidder'

export class Root extends React.Component {
  static displayName = 'Root'

  render() {
    return (
      <Provider store={store}>
        <ConnectedRouter history={history} store={store}>
          <Switch>
            <Route exact strict path='/' component={InfoPage} />
            <Route exact strict path='/auctioneer' component={AuctioneerPage} />
            <Route exact strict path='/bidder/:id' component={BidderPage} />
            <Redirect to='/' />
          </Switch>
        </ConnectedRouter>
      </Provider>
    )
  }
}
