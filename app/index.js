import React from 'react'
import ReactDOM from 'react-dom'
import getRoutes from './config/routes'
import users from './redux/modules/users'
import thunk from 'redux-thunk'
import { createStore, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux'
import restricted from './helpers/restricted'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(
  users,
  composeEnhancers(
    applyMiddleware(thunk)
  )
)

const checkAuth = (component) => {
  return restricted(component, store)
}

ReactDOM.render(
  <Provider store={store}>
    {getRoutes(checkAuth)}
  </Provider>,
  document.getElementById('app')
)
