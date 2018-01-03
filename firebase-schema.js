const db = {
  ducks: {
    [duckId]: {
      avatar: '',
      duckId: '',
      name: '',
      text: '',
      timestamp: 0,
      uid: '',
    }
  },
  likeCount: {
    [duckId]: 0,
  },
  users: {
    [uid]: {
      avatar: '',
      name: '',
      uid: '',
    }
  },
  usersDucks: {
    [uid]: {
      [duckId]: {
        avatar: '',
        duckId: '',
        name: '',
        text: '',
        timestamp: 0,
        uid: ''
      }
    }
  },
  usersLikes: {
    [uid]: {
      [duckId]: true
    }
  }
}

/notifications
  uid
    notificationId
      type
      author
      authorAvatar
      uid (of author)
      duckId
      timestamp

/replies
  duckId
    replyId
      name
      comment
      uid
      timestamp
      avatar
