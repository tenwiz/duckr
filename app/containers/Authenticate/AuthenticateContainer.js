import React, {Component} from 'react'
import PropTypes from 'prop-types'
import { Authenticate } from 'components'
import auth from 'helpers/auth'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as userActionCreators from 'redux/modules/users'

class AuthenticateContainer extends Component {
  handleAuth = () => {
    const { fetchingUser, fetchingUserSuccess, authUser, fetchingUserFailure } = this.props

    fetchingUser()
    auth().then(user => {
      fetchingUserSuccess(user.uid, user, Date.now())
      authUser(user.uid)
    }).catch(error => fetchingUserFailure(error))
  }

  render () {
    const { isFetching, error } = this.props

    return (
      <Authenticate
        onAuth={this.handleAuth}
        isFetching={isFetching}
        error={error} />
    )
  }
}

AuthenticateContainer.propTypes = {
  fetchingUser: PropTypes.func.isRequired,
  fetchingUserFailure: PropTypes.func.isRequired,
  fetchingUserSuccess: PropTypes.func.isRequired,
  authUser: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired,
  error: PropTypes.string.isRequired,
}

export default connect(
  state => ({isFetching: state.isFetching, error: state.error}),
  dispatch => bindActionCreators(userActionCreators, dispatch)
)(AuthenticateContainer)
