import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { Navigation } from './../../components'
import { container, innerContainer } from './styles.css'
import { bindActionCreators } from 'redux'
import * as userActionCreators from './../../redux/modules/users'
import { formatUserInfo } from './../../helpers/utils'
import { firebaseAuth } from './../../config/constants'

class MainContainer extends Component {
  componentDidMount () {
    const { authUser, removeFetchingUser, fetchingUserSuccess, location, history } = this.props

    firebaseAuth().onAuthStateChanged(user => {
      if (user) {
        const userData = user.providerData[0]
        const userInfo = formatUserInfo(userData.displayName, userData.photoURL, user.uid)
        authUser(user.uid)
        fetchingUserSuccess(user.uid, userInfo, Date.now())
        if (location.pathname === '/') {
          history.replace('/feed')
        }
      } else {
        removeFetchingUser()
      }
    })
  }

  render () {
    const { isAuthed, children } = this.props

    return this.props.isFetching === true
      ? null
      : <div className={container}>
        <Navigation isAuthed={isAuthed} />
        <div className={innerContainer}>
          {children}
        </div>
      </div>
  }
}

MainContainer.propTypes = {
  children: PropTypes.any,
  isAuthed: PropTypes.bool.isRequired,
  authUser: PropTypes.func.isRequired,
  fetchingUserSuccess: PropTypes.func.isRequired,
  removeFetchingUser: PropTypes.func.isRequired,
  location: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  isFetching: PropTypes.bool.isRequired,
}

export default withRouter(connect(
  state => ({isAuthed: state.isAuthed, isFetching: state.isFetching}),
  dispatch => bindActionCreators(userActionCreators, dispatch)
)(MainContainer))
