import { initializeApp, analytics } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDXBiilZloYaCici4PkLSC3YR23v0wX79k",
  authDomain: "messenger-clone-c1210.firebaseapp.com",
  projectId: "messenger-clone-c1210",
  storageBucket: "messenger-clone-c1210.appspot.com",
  messagingSenderId: "424886295603",
  appId: "1:424886295603:web:6296c356665aabd46c5746",
  measurementId: "G-LQBVQMMDT4",
};

const app = initializeApp(firebaseConfig);
// analytics();
// export const auth = getAuth(app);
export const store = getStorage(app);

const db = getFirestore(app);
export default db;
