import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';


//Initialize firebase
const firebaseConfig = {
  apiKey: "AIzaSyDu78o4TaLQm9VSsq86wA1xrMAu303Xyp0",
  authDomain: "Healthify-37a9e.firebaseapp.com",
  projectId: "Healthify-37a9e",
  storageBucket: "Healthify-37a9e.appspot.com",
  messagingSenderId: "876210535886",
  appId: "1:876210535886:web:cc1c20808b7179985dbf9f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { db, auth, storage };

