import React, {Component} from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Feed } from './../../components'
import { bindActionCreators } from 'redux'
import * as feedActionCreators from '../../redux/modules/feed'
const { array, string, func, bool } = PropTypes

class FeedContainer extends Component {
  componentDidMount () {
    this.props.setAndHandleFeedListener()
  }

  render () {
    const { duckIds, newDucksAvailable, error, isFetching, resetNewDucksAvailable } = this.props

    return (
      <Feed
        duckIds={duckIds}
        newDucksAvailable={newDucksAvailable}
        error={error}
        isFetching={isFetching}
        resetNewDucksAvailable={resetNewDucksAvailable} />
    )
  }
}

FeedContainer.propTypes = {
  duckIds: array.isRequired,
  newDucksAvailable: bool.isRequired,
  error: string.isRequired,
  isFetching: bool.isRequired,
  setAndHandleFeedListener: func.isRequired,
  resetNewDucksAvailable: func.isRequired,
}

const mapStateToProps = ({ feed }) => {
  const { newDucksAvailable, error, isFetching, duckIds } = feed
  return {
    newDucksAvailable,
    error,
    isFetching,
    duckIds,
  }
}

export default connect(
  mapStateToProps,
  dispatch => bindActionCreators(feedActionCreators, dispatch)
)(FeedContainer)
