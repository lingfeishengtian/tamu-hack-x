const { initializeApp } = require("firebase/app");
const { getAuth } = require("firebase/auth");
const { getFirestore, collection, doc, setDoc, getDoc, updateDoc } = require("firebase/firestore");

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD63Jko-swAVu9Ip6PrdPpuUkR_lRXrdpI",
  authDomain: "tabventure-manager.firebaseapp.com",
  projectId: "tabventure-manager",
  storageBucket: "tabventure-manager.appspot.com",
  messagingSenderId: "997983272750",
  appId: "1:997983272750:web:c57c07a3d1dbd1eb3904bf",
  measurementId: "G-REJLJQJVH4"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const collectionRef = collection(db, "Users");
console.log("Collection made: Users")


async function addUser(iD) {
  try {
    const docRef = setDoc(doc(db, "Users", iD), {});
    console.log("Document made: ", iD)
  }
  catch (e) {
    console.error("Error adding document: ", e);
    return 0;
  }
}

async function addBookmark(iD, [msg, url]) {
  
  const docRef = doc(db, "Users", iD);
  const docSnap = await getDoc(docRef);
  
  if(docSnap.exists()) {
    console.log("Document reference: ", iD);
    try{
      const newMark = {title: msg, message: url};
      const existingData = docSnap.data();
      const updatedBookmarks = existingData.Bookmarks ? [...existingData.Bookmarks, newMark] : [newMark];
      await setDoc(docRef, {Bookmarks: updatedBookmarks});
      console.log("Document updated: ", iD);
    }
    catch(e){
      console.error("Error updating document: ", e);
      return 0;
    }
  }
  else{
    addUser(iD);
    addBookmark(iD, [msg, url]);
  } 
}
/*
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

var firebase = require('firebase');
var firebaseui = require('firebaseui');
var ui = new firebaseui.auth.AuthUI(firebase.auth());


ui.start('#firebaseui-auth-container', {
  signInOptions: [{
    provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
    requireDisplayName: false,
    signInMethod: firebase.auth.EmailAuthProvider.EMAIL_LINK_SIGN_IN_METHOD
  },
  firebase.auth.GoogleAuthProvider.PROVIDER_ID,
  ]
});
if (ui.isPendingRedirect()) {
  ui.start('#firebaseui-auth-container', uiConfig);
}

var uiConfig = {
  callbacks: {
    signInSuccessWithAuthResult: function (authResult, redirectUrl) {
      return true;
    },
    uiShown: function () {
      document.getElementById('loader').style.display = 'none';
    }
  },
  signInFlow: 'popup',
  //signInSuccessUrl: '<url-to-redirect-to-on-success>',
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    firebase.auth.EmailAuthProvider.PROVIDER_ID,
  ],
  //tosUrl: '<your-tos-url>',
  //privacyPolicyUrl: '<your-privacy-policy-url>'
};

firebase.auth().signInAnonymously()

ui.start('#firebaseui-auth-container', uiConfig);
try {
  const docRef = await addDoc(collection(db, "users"), {
    first: "Ada",
    last: "Lovelace",
    born: 1815
  });
  console.log("Document written with ID: ", docRef.id);
} catch (e) {
  console.error("Error adding document: ", e);
}

const querySnapshot = await getDocs(collection(db, "users"));
querySnapshot.forEach((doc) => {
  console.log(`${doc.id} => ${doc.data()}`);
});*/
