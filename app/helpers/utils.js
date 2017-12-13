export const formatUserInfo = (name, avatar, uid) => (
  {
    name,
    avatar,
    uid,
  }
)

export const formatDuck = (text, {name, avatar, uid}) => (
  {
    text,
    name,
    avatar,
    uid,
    timestamp: Date.now(),
  }
)
