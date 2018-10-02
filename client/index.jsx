import ReactDOM from 'react-dom'
import React from 'react'

import {connectToWS} from './api'
import {Root} from './components/Root'

connectToWS()

ReactDOM.render(<Root />, document.getElementById('root'))
