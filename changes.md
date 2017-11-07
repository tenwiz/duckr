## Optional

- I used BrowserRouter as router and used BrowserHistory instead of hashHistory, changes needs to be made in the routes.js file
```javascript
import { BrowserRouter as Router, Route } from 'react-router-dom'
```

## Changes

- In the routes.js file use MainContainer with a children Route instead of nested Routers and IndexRoute
```javascript
  <Router>
    <MainContainer>
      <Route exact={true} path='/' component={HomeContainer} />
    </MainContainer>
  </Router>
```

- Wrap the redux connected function call inside a withRouter function call in order to work with react router v4
```javascript
import { withRouter } from 'react-router'
  export default withRouter(connect(
    (state) => ({ isAuthed: state.isAuthed })
  )(MainContainer))
```
#### Changed applied to the Route Protection with React Router lesson

You can view the full changes applied in the following [commit](https://github.com/warborn/duckr/commit/0f059028c84627e295bacd96353bf2025360074d)

 - Use this.context.router.history object to do the 'feed' redirection (Used the 4 way as stated [here](https://stackoverflow.com/a/42124328) to stick to the course code)
```javascript
handleAuth (e) {
  e.preventDefault();

  this.props.fetchAndHandleAuthedUser()
    .then(() => this.context.router.history.replace('feed'))
}
```

- In order to replace the onEnter property because is not longer there on react-router v4, i opted for a [HOC](https://facebook.github.io/react/docs/higher-order-components.html) to make the least amount of changes to the original course code, the idea of using a HOC was taken from [here](https://codeburst.io/react-router-v4-unofficial-migration-guide-5a370b8905a)

  1. Create a HOC in a restricted.js file located at /app/helpers/restricted.js, in here we will use the checkIfAuthed helper and pass the redux store as an argument with that we can apply the same rules to make the redirection
  ```javascript
  import React, { Component } from 'react'
  import { withRouter } from 'react-router-dom'
  import { checkIfAuthed } from './auth'

  export default (BaseComponent, store) => {
    class Restricted extends Component {
      componentWillMount() {
        this.checkAuthentication(this.props);
      }

      componentWillReceiveProps(nextProps) {
        if (nextProps.location !== this.props.location) {
          this.checkAuthentication(nextProps);
        }
      }

      checkAuthentication(props) {
        const { history } = props;
        const nextPathName = history.location.pathname
        const isAuthed = checkIfAuthed(store)
        if(nextPathName === '/' || nextPathName === '/login') {
          if(isAuthed === true) {
            history.replace({ pathname: '/feed' })
          }
        } else {
          if(isAuthed !== true) {
            history.replace({ pathname: '/login' })
          }
        }
      }

      render() {
        return <BaseComponent {...this.props} />;
      }
    }

    return withRouter(Restricted);
  }
  ```
  
  2. In the routes.js file instead of setting the onEnter property we will set the component property to the call of the checkAuth function that will call the restricted function and thus give the component it needs
  ```javascript
  export default function getRoutes (checkAuth) {
    return (
      <Router>
        <MainContainer>
          <Switch>
            <Route exact={true} path='/' component={checkAuth(HomeContainer)} />
            <Route path='/login' component={checkAuth(AuthenticateContainer)} />
            <Route path='/feed' component={checkAuth(FeedContainer)} />
            <Route path='/logout' component={LogoutContainer} />
          </Switch>
        </MainContainer>
      </Router>
    )
  }
  ```
  
  3. In the /app/index.js file now we need to define the checkAuth function that will accept a component and the redux store and call the restricted function
  ```javascript
  import restricted from 'helpers/restricted'
  ...
  function checkAuth (component) {
    return restricted(component, store)
  }
  
  ReactDOM.render(
    <Provider store={store}>
      {getRoutes(checkAuth)}
    </Provider>,
    document.getElementById('app')
  )
  ```
  
*******

- Use this.context.router.history inside of the onAuthStateChanged callback when authenticating on MainContainer
```javascript
if (this.props.location.pathname === '/feed') {
  this.context.router.history.replace('feed')
}
```

- Add the contentLabel modal property to the ReactModal component
```javascript
<ReactModal 
  style={modalStyles} 
  isOpen={props.isOpen} 
  onRequestClose={props.closeModal}
  contentLabel='Modal'>
```

- Use this.props.match.params.uid instead of this.props.routeParams.uid to get the user's uid from the URL inside the UserContainer component
```javascript
  componentDidMount () {
    const uid = this.props.match.params.uid
    ...
  }
```

- Add the publicPath key to the output object inside the webpack configuration object to load the index_bundle.js file from the root of the application and not from some URL like /duckDetail/index_bundle.js when navigating to the duck's details

```javascript
output: {
  path: PATHS.build,
  filename: 'index_bundle.js',
  publicPath: '/'
}
```

- Place the duckDetail route before the users route, to match first because otherwise an URL like /duckDetail/someId can match the /:uid pattern
```javascript
<Route path='/duckDetail/:duckId' component={checkAuth(DuckDetailsContainer)}/>
<Route path='/:uid' component={checkAuth(UserContainer)}/>
```