import React, {Component} from 'react'
import PropTypes from 'prop-types'
import { Authenticate } from './../../components'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as userActionCreators from './../../redux/modules/users'

class AuthenticateContainer extends Component {
  handleAuth = (e) => {
    e.preventDefault()
    this.props.fetchAndHandleAuthedUser()
      .then(() => this.props.history.replace('/feed'))
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
  fetchAndHandleAuthedUser: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired,
  error: PropTypes.string.isRequired,
  history: PropTypes.object.isRequired
}

export default connect(
  state => ({isFetching: state.isFetching, error: state.error}),
  dispatch => bindActionCreators(userActionCreators, dispatch)
)(AuthenticateContainer)
