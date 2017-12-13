export const ADD_LIKE = 'ADD_LIKE'
export const REMOVE_LIKE = 'REMOVE_LIKE'
const FETCHING_LIKES = 'FETCHING_LIKES'
const FETCHING_LIKES_ERROR = 'FETCHING_LIKES_ERROR'
const FETCHING_LIKES_SUCCESS = 'FETCHING_LIKES_SUCCESS'

const addLike = (duckId) => (
  {
    type: ADD_LIKE,
    duckId,
  }
)

const removeLike = (duckId) => (
  {
    type: REMOVE_LIKE,
    duckId,
  }
)

const fetchingLikes = () => (
  {
    type: FETCHING_LIKES,
  }
)

const fetchLikesError = (error) => {
  console.warn(error)
  return {
    type: FETCHING_LIKES_ERROR,
    error: 'Error fetching likes',
  }
}

const fetchingLikesSuccess = (likes) => (
  {
    type: FETCHING_LIKES_SUCCESS,
    likes,
  }
)

const initialState = {
  isFetching: false,
  error: '',
}

const usersLikes = (state = initialState, action) => {
  const type = action.type
  switch (type) {
    case FETCHING_LIKES :
      return {
        ...state,
        isFetching: true,
      }
    case FETCHING_LIKES_ERROR :
      return {
        ...state,
        isFetching: false,
        error: action.error,
      }
    case FETCHING_LIKES_SUCCESS :
      return {
        ...state,
        ...action.likes,
        isFetching: false,
        error: '',
      }
    case ADD_LIKE :
      return {
        ...state,
        [action.duckId]: true,
      }
    case REMOVE_LIKE :
      return Object.keys(state)
        .filter((duckId) => action.duckId !== duckId)
        .reduce((prev, current) => {
          prev[current] = state[current]
          return prev
        }, {})
    default :
      return state
  }
}

export default usersLikes
