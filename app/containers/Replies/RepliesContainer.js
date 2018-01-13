import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import { Replies } from '../../components'
import { staleReply } from '../../helpers/utils'
import * as repliesActionCreators from '../../redux/modules/replies'
const { func, string, bool, number, object } = PropTypes

class RepliesContainer extends Component {
  static defaultProps = {
    lastUpdated: 0,
    replies: {},
  }

  componentDidMount() {
    const { lastUpdated, fetchAndHandleReplies, duckId } = this.props

    if (staleReply(lastUpdated)) {
      fetchAndHandleReplies(duckId)
    }
  }

  render() {
    const { isFetching, error, lastUpdated, replies } = this.props

    return (
      <Replies
        isFetching={isFetching}
        error={error}
        lastUpdated={lastUpdated}
        replies={replies}/>
    )
  }
}

RepliesContainer.propTypes = {
  isFetching: bool.isRequired,
  error: string.isRequired,
  lastUpdated: number.isRequired,
  replies: object,
  duckId: string.isRequired,
  fetchAndHandleReplies: func.isRequired,
}

const mapStateToProps = ({ replies }, props) => {
  const duckRepliesInfo = replies[props.duckId] || {}
  const { lastUpdated, replies } = duckRepliesInfo
  return {
    isFetching: replies.isFetching,
    error: replies.error,
    lastUpdated,
    replies,
  }
}

export default connect(
  mapStateToProps,
  (dispatch) => bindActionCreators(repliesActionCreators, dispatch),
)(RepliesContainer)
