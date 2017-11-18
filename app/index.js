import React from 'react'
import ReactDOM from 'react-dom'
import routes from './config/routes'
import users from './redux/modules/users'
import thunk from 'redux-thunk'
import { createStore, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(
  users,
  composeEnhancers(
    applyMiddleware(thunk)
  )
)

ReactDOM.render(
  <Provider store={store}>
    {routes}
  </Provider>,
  document.getElementById('app')
)
