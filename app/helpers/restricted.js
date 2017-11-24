import React, {Component} from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import { checkIfAuthed } from './auth'

export default (BaseComponent, store) => {
  class Restricted extends Component {
    componentWillMount () {
      this.checkAuthentication(this.props)
    }

    componentWillReceiveProps (nextProps) {
      if (this.props.location !== nextProps.location) {
        this.checkAuthentication(nextProps)
      }
    }

    checkAuthentication = (props) => {
      const { history } = props
      const nextPathName = history.location.pathname
      const isAuthed = checkIfAuthed(store)
      if (nextPathName === '/' || nextPathName === '/auth') {
        if (isAuthed === true) {
          history.replace({ pathname: '/feed' })
        }
      } else {
        if (isAuthed !== true) {
          history.replace({ pathname: '/auth' })
        }
      }
    }

    render () {
      return <BaseComponent {...this.props} />
    }
  }

  Restricted.propTypes = {
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
  }

  return withRouter(Restricted)
}
