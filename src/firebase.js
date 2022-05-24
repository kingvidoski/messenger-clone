import firebase from "firebase/compat/app";
import 'firebase/compat/firestore';
import 'firebase/compat/auth';
import 'firebase/compat/storage';

const firebaseConfig = {
  apiKey: "AIzaSyCHMzsanejegBPQH_nP7IWbWApLVhelAfg",
  authDomain: "kingsley-messenger-clone.firebaseapp.com",
  projectId: "kingsley-messenger-clone",
  storageBucket: "kingsley-messenger-clone.appspot.com",
  messagingSenderId: "1051034043792",
  appId: "1:1051034043792:web:e7c78c4f7e4590018f1f15"
};


const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.FacebookAuthProvider();
const storage = firebase.storage();

export { auth, provider, storage }
export default db;