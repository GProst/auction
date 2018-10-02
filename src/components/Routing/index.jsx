import React from 'react'
import PropTypes from 'prop-types'
import {Route, Switch, Redirect} from 'react-router-dom'
import {connect} from 'react-redux'

import {HomePage} from '../pages/Home'
import {AuctioneerPage} from '../pages/Auctioneer'
import {BidderPage} from '../pages/Bidder'
import {Spinner} from './Spinner'

import {ROUTES} from '../../routes'

const connector = connect(
  ({auction}) => ({
    isConnectedToWS: auction.isConnectedToWS
  })
)

class Routing extends React.Component {
  static displayName = 'Routing'

  static propTypes = {
    isConnectedToWS: PropTypes.bool.isRequired
  }

  render() {
    const {isConnectedToWS} = this.props
    if (!isConnectedToWS) return <Spinner />
    return (
      <Switch>
        <Route exact strict path={ROUTES.root} component={HomePage} />
        <Route exact strict path={ROUTES.auctioneer} component={AuctioneerPage} />
        <Route exact strict path={ROUTES.bidder.routePattern} component={BidderPage} />
        <Redirect to={ROUTES.root} />
      </Switch>
    )
  }
}

const ConnectedRouting = connector(Routing)

export {
  ConnectedRouting as Routing
}
