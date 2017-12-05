import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import { Duck } from '../../components'
const { func, object, bool, number } = PropTypes

class DuckContainer extends Component {
  static defaultProps = {
    hideReplyBtn: false,
    hideLikeCount: true,
  }

  goToProfile = (e) => {
    const { history, duck } = this.props
    e.stopPropagation()
    history.push(`/${duck.uid}`)
  }

  handleClick = (e) => {
    const { history, duck } = this.props
    e.preventDefault()
    history.push(`/duckDetail/${duck.duckId}`)
  }

  render() {
    return (
      <Duck
        goToProfile={this.goToProfile}
        onClick={this.props.hideReplyBtn === true ? null : this.handleClick}
        {...this.props} />
    )
  }
}

DuckContainer.propTypes = {
  duck: object.isRequired,
  handleClick: func,
  hideLikeCount: bool.isRequired,
  hideReplyBtn: bool.isRequired,
  isLiked: bool.isRequired,
  numberOfLikes: number,
  addAndHandleLike: func.isRequired,
  handleDeleteLike: func.isRequired,
  history: object.isRequired,
}

const mapStateToProps = ({ ducks, likeCount, usersLikes }, props) => {
  return {
    duck: ducks[props.duckId],
    hideLikeCount: props.hideLikeCount,
    hideReplyBtn: props.hideReplyBtn,
    isLiked: usersLikes[props.duckId] === true,
    numberOfLikes: likeCount[props.duckId],
  }
}

export default connect(
  mapStateToProps
)(DuckContainer)
