// ----------------- Page Loaded After User Sign-in -------------------------//

// ----------------- Firebase Setup & Initialization ------------------------//

// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getAuth, signOut } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getDatabase, ref, set, update, child, get, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";


// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBjdGSw3CEz99yEaOf1SzcMfDzcUzCh6nc",
    authDomain: "researchweb-c105c.firebaseapp.com",
    databaseURL: "https://researchweb-c105c-default-rtdb.firebaseio.com",
    projectId: "researchweb-c105c",
    storageBucket: "researchweb-c105c.appspot.com",
    messagingSenderId: "539768094698",
    appId: "1:539768094698:web:823f42b9f9d096162f7c93"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);


// Initialize Authentication
const auth = getAuth()

//Return instance of database
const db = getDatabase(app)


// ---------------------// Get reference values -----------------------------
let userLink = document.getElementById('userLink')
let signOutLink = document.getElementById('signOut')
let welcome = document.getElementById('welcome')
let currentUser = null



// ----------------------- Get User's Name'Name ------------------------------
function getUsername() {
  let keepLoggedIn = localStorage.getItem('keepLoggedIn')
  if (keepLoggedIn == 'yes') {
    currentUser = JSON.parse(localStorage.getItem('user'))
  }
  else {
    currentUser = JSON.parse(sessionStorage.getItem('user'))
  }
}

function signOutUser() {
  sessionStorage.removeItem('user')
  localStorage.removeItem('user')
  localStorage.removeItem('keepLoggedIn')
  signOut(auth).then(() => {
    window.location = 'index.html'
    alert('The user has successfully signed out.')
  }).catch((error) => {

  })
  
}

function updateData(userID, trial, key, value) {
  //Must use brackets around variable name to use it as a key
  update(ref(db, 'users/' + userID + '/data/Trial_' + trial), {
    [key]: value
  })
    .then(() => {
      alert("Data updated successfully")
    })
    .catch((error) => {
      alert(error)
    })
}

// --------------------------- Home Page Loading -----------------------------
window.onload = function () {
  getUsername()
  if (currentUser == null) {
    userLink.innerText = 'Create New Account'
    userLink.classList.replace("nav-link", "btn")
    userLink.classList.add("btn-primary")
    userLink.href = 'register.html'
    signOutLink.innerText = 'Sign In'
    signOutLink.classList.replace("nav-link", 'btn')
    signOutLink.classList.add("btn-success")
    signOutLink.href = 'signIn.html'
  } else {
    userLink.innerText = currentUser.firstname
    welcome.innerText = 'Welcome ' + currentUser.firstname
    userLink.classList.replace("btn", "nav-link")
    userLink.classList.add("btn-primary")
    userLink.href = '#'
    signOutLink.innerText = 'Sign Out'
    signOutLink.classList.replace("btn", 'nav-link')
    signOutLink.classList.add("btn-success")
    document.getElementById('signOut').onclick = function () {
      signOutUser()
    }
  }

  document.getElementById('update').onclick = function () {
    const trial = document.getElementById('trial').value
    const key = document.getElementById('key').value
    const value = document.getElementById('value').value
    const userID = currentUser.uid

    updateData(userID, trial, key, value)
  }

}
