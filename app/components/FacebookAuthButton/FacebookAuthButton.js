import React from 'react'
import PropTypes from 'prop-types'
import { button } from './styles.css'

const FacebookAuthButton = ({ onAuth, isFetching }) => {
  return (
    <button onClick={onAuth} className={button} >
      {isFetching === true
        ? 'Loading'
        : 'Login with facebook'}
    </button>
  )
}

const { func, bool } = PropTypes
FacebookAuthButton.propTypes = {
  onAuth: func.isRequired,
  isFetching: bool.isRequired,
}

export default FacebookAuthButton