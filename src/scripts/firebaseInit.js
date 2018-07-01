import firebase from 'firebase'

const firebaseApp = firebase.initializeApp({
  apiKey: 'AIzaSyAjMcAG1NvJVajJ08y8Q3eqgSjkKhKSQEg',
  authDomain: 'projeto-sda.firebaseapp.com',
  databaseURL: 'https://projeto-sda.firebaseio.com',
  projectId: 'projeto-sda',
  storageBucket: 'projeto-sda.appspot.com',
  messagingSenderId: '391712617507'
})

const auth = firebaseApp.auth()
const db = firebaseApp.firestore()
db.settings({timestampsInSnapshots: true})

export { firebaseApp, auth, db }
