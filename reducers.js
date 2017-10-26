// Users

const initialUserState = {
  lastUpdated: 0,
  info: {
    name: '',
    uid: '',
    avatar: ''
  }
}

function user(state = initialUserState, action) {
  switch (action.type) {
    case FETCHING_USER_SUCCESS:
      return {
        ...state,
        lastUpdated: action.timestamp,
        info: action.user
      }
    default:
      return state
  }
}

const initialState = {
  isAuthed: false,
  isFetching: false,
  error: '',
  authedId: ''
}

export default function users(state = initialState, action) {
  switch (action.type) {
    case AUTH_USER:
      return {
        ...state,
        isAuthed: true,
        authedId: action.uid
      }
    case UNAUTH_USER:
      return {
        ...state,
        isAuthed: false,
        authedId: ''
      }
    case FETCHING_USER:
      return {
        ...state,
        isFetching: true
      }
    case FETCHING_USER_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.error
      }
    case FETCHING_USER_SUCCESS:
      return action.user === null
        ? {
          ...state,
          isFetching: false,
          error: ''
        }
        : {
          ...state,
          isFetching: false,
          error: '',
          [action.uid]: user(state[action.uid], action)
        }
    default:
      return state
  }
}

// Ducks

const initialState = {
  isFetching: true,
  error: ''
}

export default function ducks(state = initialState, action) {
  switch (action.type) {
    case FETCHING_DUCK:
      return {
        ...state,
        isFetching: true,
      }
    case ADD_DUCK:
    case FETCHING_DUCK_SUCCESS:
      return {
        ...state,
        isFetching: false,
        error: '',
        [action.duck.duckId]: action.duck
      }
    case FETCHING_DUCK_ERROR:
      return {
        ...state,
        isFetching: false,
        error: action.error,
      }
    case REMOVE_FETCHING:
      return {
        ...state,
        isFetching: false,
        error: ''
      }
    case ADD_MUTIPLE_DUCKS:
      return {
        ...state,
        ...action.ducks
      }
    default:
      return state
  }
}

// Feed

const initialState = {
  isFetching: false,
  error: '',
  newDucksAvailable: false,
  duckIdsToAdd: [],
  duckIds: []
}

export default function feed(state = initialState, action) {
  switch (action.type) {
    case SETTING_FEED_LISTENER:
      return {
        ...state,
        isFetching: true
      }
    case SETTING_FEED_LISTENER_ERROR:
      return {
        ...state,
        isFetching: false,
        error: action.error
      }
    case SETTING_FEED_LISTENER_SUCCESS:
      return {
        ...state,
        isFetching: false,
        error: '',
        duckIds: action.duckIds,
        newDucksAvailable: false
      }
    case ADD_NEW_DUCK_ID_TO_FEED:
      return {
        ...state,
        newDucksAvailable: true,
        newDucksToAdd: [action.duckId, ...state.newDucksToAdd],
      }
    case RESET_NEW_DUCKS_AVAILABLE:
      return {
        ...state,
        newDucksAvailable: false,
        newDucksToAdd: [],
        duckIds: [...state.newDucksToAdd, ...state.duckIds]
      }
    default:
      return state
  }
}

// Listeners

export default function listeners(state = {}, action) {
  switch (action.type) {
    case ADD_LISTENER:
      return {
        ...state,
        [action.listenerId]: true
      }
    default:
      return state
  }
}

// Modal

const initialState = {
  duckText: '',
  isOpen: false
}

export default function modal(state = initialState, action) {
  switch (action.type) {
    case OPEN_MODAL:
      return {
        ...state,
        isOpen: true,
      }
    case CLOSE_MODAL:
      return {
        ...state,
        isOpen: false
      }
    case UPDATE_DUCK_TEXT:
      return {
        ...state,
        duckText: action.newDuckText
      }
    default:
      return state
  }
}

// Replies

const initialReply = {
  name: '',
  reply: '',
  uid: '',
  timestamp: 0,
  avatar: '',
  replyId: '',
}

function duckReplies(state = initialReply, action) {
  switch (action.type) {
    case ADD_REPLY:
      return {
        ...state,
        [state.reply.replyId]: action.reply
      }
    case REMOVE_REPLY:
      return {
        ...state,
        [action.reply.replyId]: undefined
      }
    default:
      return state
  }
}

const initialDuckState = {
  lastUpdated: Date.now(),
  replies: {}
}

function repliesAndLastUpdated(state = initialDuckState, action) {
  switch (action.type) {
    case FETCHING_REPLIES_SUCCESS:
      return {
        ...state,
        lastUpdated: action.lastUpdated,
        replies: action.replies
      }
    case ADD_REPLY:
    case REMOVE_REPLY:
      return {
        ...state,
        replies: duckReplies(state.replies, action)
      }
    default:
      return state
  }
}

const initialState = {
  isFetching: true,
  error: ''
}

export default function replies(state = initialState, action) {
  switch (action.type) {
    case FETCHING_REPLIES:
      return {
        ...state,
        isFetching: true,
      }
    case FETCHING_REPLIES_ERROR:
    case ADD_REPLY_ERROR:
      return {
        ...state,
        isFetching: false,
        error: action.error
      }
    case ADD_REPLY:
    case FETCHING_REPLIES_SUCCESS:
    case REMOVE_REPLY:
      return {
        ...state,
        isFetching: false,
        error: '',
        [action.duckId]: repliesAndLastUpdated(state[action.duckId], action)
      }
    default:
      return state
  }
}
