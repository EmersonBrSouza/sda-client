import firebase from 'firebase'
import { config } from './firebaseConfig'

const firebaseApp = firebase.initializeApp(config)

const auth = firebaseApp.auth()
const db = firebaseApp.firestore()
const firestore = firebase.firestore
db.settings({timestampsInSnapshots: true})

export { firebaseApp, auth, db, firestore }
