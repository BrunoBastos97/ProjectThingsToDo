import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";



const firebaseConfig = {
  apiKey: "AIzaSyD1-JTiPYAh95Kn5zXcO4orpAACFB5a_dc",
  authDomain: "things-to-do-a38c9.firebaseapp.com",
  projectId: "things-to-do-a38c9",
  storageBucket: "things-to-do-a38c9.appspot.com",
  messagingSenderId: "223721457672",
  appId: "1:223721457672:web:73e68e80223f023860e9bd"
};

// Initialize Firebase 
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export default getFirestore(app);






