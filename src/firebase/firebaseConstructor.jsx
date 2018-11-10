import firebase from 'firebase'

// Firebase copy and paste 'config'

if(!firebase.apps.length) {
  firebase.initializeApp(config)
}

const auth = firebase.auth()

export {
  auth,
}