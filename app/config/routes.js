import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import {
  MainContainer, HomeContainer, AuthenticateContainer, FeedContainer,
  LogoutContainer, UserContainer, DuckDetailsContainer,
} from './../containers'

const getRoutes = (checkAuth) => (
  <Router>
    <MainContainer>
      <Switch>
        <Route path='/auth' component={checkAuth(AuthenticateContainer)} />
        <Route path='/feed' component={checkAuth(FeedContainer)} />
        <Route path='/logout' component={LogoutContainer} />
        <Route path='/duckDetail/:duckId' component={checkAuth(DuckDetailsContainer)} />
        <Route path='/:uid' component={checkAuth(UserContainer)} />
        <Route exact={true} path='/' component={checkAuth(HomeContainer)} />
      </Switch>
    </MainContainer>
  </Router>
)

export default getRoutes
