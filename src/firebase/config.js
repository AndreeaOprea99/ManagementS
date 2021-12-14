import firebase from "firebase/app"
import 'firebase/firestore'
import 'firebase/auth'
import 'firebase/storage'


const firebaseConfig = {
  apiKey: "AIzaSyDyWQQnt_cuJhwjZMh4KS77JcJgN9oLVHc",
  authDomain: "managements-ae2ba.firebaseapp.com",
  projectId: "managements-ae2ba",
  storageBucket: "managements-ae2ba.appspot.com",
  messagingSenderId: "212127933139",
  appId: "1:212127933139:web:3801335ad20169a24e6a26"
};

//init firebase
firebase.initializeApp(firebaseConfig)

//init services
const projectFirestore= firebase.firestore()
const projectAuth = firebase.auth()
const projectStorage = firebase.storage()


//timestamp
const timestamp = firebase.firestore.Timestamp

export { projectFirestore, projectAuth, projectStorage, timestamp }

