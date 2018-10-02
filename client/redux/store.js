import {createStore, applyMiddleware, combineReducers} from 'redux'
import {routerMiddleware, routerReducer} from 'react-router-redux'
import {logger} from 'redux-logger'

import {history} from '../history'
import * as reducers from './reducers/index'

const middleware = [routerMiddleware(history), logger]

export const store = createStore(
  combineReducers({
    ...reducers,
    router: routerReducer
  }),
  applyMiddleware(...middleware)
)
