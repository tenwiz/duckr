import React, {Component} from 'react'
import { Authenticate } from 'components'
import auth from 'helpers/auth'

class AuthenticateContainer extends Component {
  handleAuth = () => {
    auth().then(user => {
      console.log(user)
    })
  }

  render () {
    return (
      <Authenticate
        onAuth={this.handleAuth}
        isFetching={false}
        error={''} />
    )
  }
}

export default AuthenticateContainer
