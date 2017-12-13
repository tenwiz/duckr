import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import {
  MainContainer, HomeContainer, AuthenticateContainer, FeedContainer,
  LogoutContainer,
} from './../containers'

const getRoutes = (checkAuth) => (
  <Router>
    <MainContainer>
      <Switch>
        <Route path='/auth' component={checkAuth(AuthenticateContainer)} />
        <Route path='/feed' component={checkAuth(FeedContainer)} />
        <Route path='/logout' component={LogoutContainer} />
        <Route path='/' component={checkAuth(HomeContainer)} />
      </Switch>
    </MainContainer>
  </Router>
)

export default getRoutes
