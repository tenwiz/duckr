import { ref, firebaseAuth } from '../config/constants'

const auth = () => {
  return firebaseAuth().signInWithPopup(new firebaseAuth.FacebookAuthProvider())
}

export const checkIfAuthed = (store) => {
  return store.getState().users.isAuthed === true
}

export const logout = () => {
  return firebaseAuth().signOut()
}

export const saveUser = (user) => {
  return ref.child(`users/${user.uid}`)
    .set(user)
    .then(() => user)
}

export default auth
