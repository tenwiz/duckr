import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import {
  MainContainer, HomeContainer, AuthenticateContainer, FeedContainer,
  LogoutContainer
} from './../containers'

const routes = (
  <Router>
    <MainContainer>
      <Switch>
        <Route path='/auth' component={AuthenticateContainer} />
        <Route path='/feed' component={FeedContainer} />
        <Route path='/logout' component={LogoutContainer} />
        <Route path='/' component={HomeContainer} />
      </Switch>
    </MainContainer>
  </Router>
)

export default routes
