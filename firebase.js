import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js'
import {
    getAuth,
    GoogleAuthProvider,
    signInWithPopup,
    signOut,
    setPersistence,
    browserSessionPersistence,
  } from 'https://www.gstatic.com/firebasejs/9.22.2/firebase-auth.js'

import {
    getFirestore,
    collection,
    addDoc,
    query,
    where,
    getDocs,
    orderBy,
    limit,
    onSnapshot,
    setDoc,
    updateDoc,
    doc,
    serverTimestamp,
  } from 'https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore.js'

import Book from './script.js'
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
        setPersistence(getAuth(), browserSessionPersistence)
            .then(async () => {
                const provider = new GoogleAuthProvider();
                await signInWithPopup(getAuth(), provider);
                signInButton.textContent = "Sign Out";
                signedIn = true;
                userInfoDiv.textContent = getAuth().currentUser.displayName; 
                getUsersBooks(getAuth().currentUser.email);
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

async function addBook(book) {
    if (getAuth().currentUser) {
        try {
            await addDoc(collection(getFirestore(), 'books'), {
                user: getAuth().currentUser.email,
                name: book.name,
                author: book.author,
                pages: book.pages,
                read: book.read
            });
        }
        catch (error) {
            console.log(error.message)
        }
    }
}

async function getUsersBooks(userEmail) {
    const q = query(collection(getFirestore(), 'books'), where("user", "==", userEmail));
    const res = await getDocs(q);

    let books = res.docs.map((book) => ({
        name: book.data().name, 
        author: book.data().author, 
        pages: book.data().pages, 
        read: book.data().read
    }))

    console.log(res.docs);
    console.log(books);
    res.forEach((book) => {
        console.log(book.data());
    })
}

export {addBook};