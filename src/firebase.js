import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore/lite";

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
const db = getFirestore(app);

const db2 = getFirestore(app);
// const myDocRef = db2.collection("messages").doc("my-doc");

const myCollectionRef = collection(db2, "messages");

getDocs(myCollectionRef).onSnapshot((querySnapshot) => {
  querySnapshot.forEach((doc) => {
    console.log(doc.data());
  });
});

// const db = firebaseApp.fireStore();

// Get a list of cities from your database
// async function getCities() {
//   const messagesCol = collection(db, "messages");
//   const citySnapshot = await getDocs(messagesCol);
//   const cityList = citySnapshot.docs.map((doc) => doc.data());
//   return cityList;
// }

// getCities()
//   .then((response) => {
//     console.log("response", response);
//   })
//   .catch((err) => {
//     console.log("error : ", err);
//   });

export default db;
