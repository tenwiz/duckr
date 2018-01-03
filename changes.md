#### Changed applied to the Route Protection with React Router lesson

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