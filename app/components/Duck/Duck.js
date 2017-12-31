import React from 'react'
import PropTypes from 'prop-types'
import { formatTimestamp } from '../../helpers/utils'
import Reply from 'react-icons/lib/fa/mail-reply'
import Star from 'react-icons/lib/fa/star'
import {
  duckContainer, contentContainer, avatar, actionContainer,
  header, text, likeReplyContainer, icon, likedIcon, author,
} from './styles.css'
const { shape, func, string, bool, number } = PropTypes

const Duck = ({ isLiked, handleDeleteLike, addAndHandleLike, hideReplyBtn,
                onClick, duck, goToProfile, hideLikeCount, numberOfLikes }) => {
  const starIcon = isLiked === true ? likedIcon : icon
  const starFn = isLiked === true ? handleDeleteLike : addAndHandleLike

  return (
    <div
      className={duckContainer}
      style={{cursor: hideReplyBtn === true ? 'default' : 'pointer'}}
      onClick={onClick}>
        <img src={duck.avatar} className={avatar}/>
        <div className={contentContainer}>
          <div className={header}>
            <div onClick={goToProfile} className={author}>{duck.name}</div>
            <div>{formatTimestamp(duck.timestamp)}</div>
          </div>
          <div className={text}>{duck.text}</div>
          <div className={likeReplyContainer}>
            {
              hideReplyBtn === true
                ? null
                : <Reply className={icon}/>
            }
            <div className={actionContainer}>
              <Star className={starIcon} onClick={e => starFn(duck.duckId, e)}/>
              {
                hideLikeCount === true
                  ? null
                  : <div>{numberOfLikes}</div>
              }
            </div>
          </div>
        </div>
    </div>
  )
}

Duck.propTypes = {
  duck: shape({
    avatar: string.isRequired,
    duckId: string.isRequired,
    name: string.isRequired,
    text: string.isRequired,
    timestamp: number.isRequired,
    uid: string.isRequired,
  }),
  onClick: func,
  isLiked: bool.isRequired,
  addAndHandleLike: func.isRequired,
  handleDeleteLike: func.isRequired,
  numberOfLikes: number,
  hideReplyBtn: bool.isRequired,
  hideLikeCount: bool.isRequired,
  goToProfile: func.isRequired,
}

export default Duck
