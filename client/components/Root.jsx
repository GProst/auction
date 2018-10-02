import React from 'react'
import {Route} from 'react-router-dom'
import {ConnectedRouter} from 'react-router-redux'
import {Provider} from 'react-redux'

import {store} from '../redux/store'
import {history} from '../history'

import {Routing} from './Routing/index'

export class Root extends React.Component {
  static displayName = 'Root'

  render() {
    return (
      <Provider store={store}>
        <ConnectedRouter history={history} store={store}>
          <Route component={Routing} />
        </ConnectedRouter>
      </Provider>
    )
  }
}
