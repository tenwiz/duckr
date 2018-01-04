import React from 'react'
import PropTypes from 'prop-types'
import { DuckContainer } from '../../containers'
import {
  mainContainer, container, content, repliesContainer,
  replyTextAreaContainer, replyTextArea } from './styles.css'
import { subHeader, darkBtn, errorMsg } from '../../sharedStyles/styles.css'
const { object, string, bool } = PropTypes

const DuckDetails = ({ authedUser, duckId, isFetching, error }) => {
  return (
    <div className={mainContainer}>
      {
        isFetching
          ? <p className={subHeader}>Fetching</p>
          : (
            <div className={container}>
              <div className={content}>
                <DuckContainer duckId={duckId} hideLikeCount={false} hideReplyBtn={true}/>
                MAKE REPLY
              </div>
              <div className={repliesContainer}>
                REPLY SECTION
              </div>
            </div>
          )
      }
      {error && <p className={errorMsg}>{error}</p>}
    </div>
  )
}

DuckDetails.propTypes = {
  authedUser: object.isRequired,
  duckId: string.isRequired,
  isFetching: bool.isRequired,
  error: string.isRequired,
}

export default DuckDetails
