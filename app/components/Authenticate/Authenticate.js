import React from 'react'
import PropTypes from 'prop-types'
import { centeredContainer, largeHeader, errorMsg } from './../../sharedStyles/styles.css'
import { FacebookAuthButton } from './../../components'

const Authenticate = ({ onAuth, isFetching, error }) => {
  return (
    <div className={centeredContainer}>
      <h1 className={largeHeader}>Authenticate</h1>
      <FacebookAuthButton isFetching={isFetching} onAuth={onAuth} />
      {error ? <p className={errorMsg}>{error}</p> : null}
    </div>
  )
}

const { string, func, bool } = PropTypes
Authenticate.propTypes = {
  error: string.isRequired,
  isFetching: bool.isRequired,
  onAuth: func.isRequired,
}

export default Authenticate
