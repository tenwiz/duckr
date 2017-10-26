{
  users: {
    isAuthed,
    isFetching,
    error,
    authedId,
    [uid]: {
      lastUpdated,
      info: {
        name,
        uid,
        avatar,
      }
    }
  },
  modal: {
    duck,
    isOpen
  },
  ducks: {
    isFetching,
    error,
    [duckId]: {
      lastUpdated,
      info: {
        avatar,
        duckId,
        name,
        text,
        timestamp,
        uid,
      }
    }
  },
  likeCount: {
    [duckId]: 0
  },
  usersDucks: {
    isFetching,
    error,
    [uid]: {
      lastUpdated,
      duckIds: [duckId, duckId, duckId]
    }
  },
  usersLikes: {
    [duckid]: true,
  },
  feed: {
    isFetching,
    error,
    newDucksAvailable,
    duckIdsToAdd: [duckId, duckId],
    duckIds: [duckId, duckId, duckId]
  },
  replies: {
    isFetching,
    error,
    [duckId]: {
      lastUpdated,
      replies: {
        [replyId]: {
          name,
          reply,
          uid,
          timestamp,
          avatar,
          replyId
        }
      }
    }
  },
  listeners: {
    [listenerId]: true
  }
}
