#### Changed applied to the Route Protection with React Router lesson

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