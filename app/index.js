import React from 'react'
import ReactDOM from 'react-dom'
import getRoutes from './config/routes'
import thunk from 'redux-thunk'
import { createStore, applyMiddleware, compose, combineReducers } from 'redux'
import { Provider } from 'react-redux'
import restricted from './helpers/restricted'
import * as reducers from './redux/modules'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(
  combineReducers(reducers),
  composeEnhancers(
    applyMiddleware(thunk)
  )
)

const checkAuth = (component) => (
  restricted(component, store)
)

ReactDOM.render(
  <Provider store={store}>
    {getRoutes(checkAuth)}
  </Provider>,
  document.getElementById('app')
)
