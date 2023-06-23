import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js'
import {
    getAuth,
    onAuthStateChanged,
    GoogleAuthProvider,
    signInWithPopup,
    signOut,
    setPersistence,
    browserSessionPersistence,
    signInWithRedirect
  } from 'https://www.gstatic.com/firebasejs/9.22.2/firebase-auth.js'

const signInButton = document.querySelector("#sign-in");
const userInfoDiv = document.querySelector("#user-info");

let signedIn = false;

const firebaseConfig = {
    apiKey: "AIzaSyCKMyRRIBXNIG7ZWvgS1BamnMaZn006yMY",
    authDomain: "library-a0799.firebaseapp.com",
    projectId: "library-a0799",
    storageBucket: "library-a0799.appspot.com",
    messagingSenderId: "361604445102",
    appId: "1:361604445102:web:8aaa4ab9090e2a015a8e3f"
}

initializeApp(firebaseConfig);

signInButton.addEventListener('click', async () => {
    if (!getAuth().currentUser) {
        setPersistence(auth, browserSessionPersistence)
            .then(async () => {
                const provider = new GoogleAuthProvider();
                await signInWithPopup(getAuth(), provider);
                signInButton.textContent = "Sign Out";
                signedIn = true;
                userInfoDiv.textContent = getAuth().currentUser.displayName; 
            })
            .catch((error) => {
                alert(error.message);
            })
   
    } else {
        signedIn = false;
        signOut(getAuth());
        userInfoDiv.textContent = "";
        signInButton.textContent = "Sign in"
    }
})

const auth = getAuth();
