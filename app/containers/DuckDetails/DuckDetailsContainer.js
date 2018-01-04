import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import { DuckDetails } from '../../components'
import * as duckActionCreators from '../../redux/modules/ducks'
import * as likeCountActionCreators from '../../redux/modules/likeCount'
const { func, object, string, bool } = PropTypes

class DuckDetailsContainer extends Component {
  componentDidMount() {
    const { initLikeFetch, duckId, duckAlreadyFetched, fetchAndHandleDuck, removeFetching } = this.props
    initLikeFetch(duckId)
    duckAlreadyFetched ? fetchAndHandleDuck(duckId) : removeFetching()
  }

  render() {
    const { authedUser, duckId, error, isFetching } = this.props
    return (
      <DuckDetails
        authedUser={authedUser}
        duckId={duckId}
        error={error}
        isFetching={isFetching}/>
    )
  }
}

DuckDetailsContainer.propTypes = {
  authedUser: object.isRequired,
  duckId: string.isRequired,
  error: string.isRequired,
  isFetching: bool.isRequired,
  removeFetching: func.isRequired,
  fetchAndHandleDuck: func.isRequired,
  duckAlreadyFetched: bool.isRequired,
  initLikeFetch: func.isRequired,
}

const mapStateToProps = ({ ducks, likeCount, users }, props) => {
  const duckId = props.match.params.duckId
  return {
    isFetching: ducks.isFetching || likeCount.isFetching,
    error: ducks.error,
    authedUser: users[users.authedId].info,
    duckId,
    duckAlreadyFetched: !!ducks[duckId],
  }
}

const mapDispatchToProps = (dispatch) => (
  bindActionCreators({
    ...duckActionCreators,
    ...likeCountActionCreators,
  }, dispatch)
)

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DuckDetailsContainer)
