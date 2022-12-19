// This JS file is for registering a new app user ---------------------------//

// ----------------- Firebase Setup & Initialization ------------------------//
// Import the functions you need from the SDKs you need
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getDatabase,ref,set,update,child,get } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";


import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

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

// ---------------- Register New Uswer --------------------------------//
document.getElementById('submitData').onclick = function () {
  const firstName = document.getElementById('firstName').value
  const lastName = document.getElementById('lastName').value
  const email = document.getElementById('userEmail').value

  //Firebase requires a password of at least 6 characters
  const password = document.getElementById('userPass').value

  //Validate user inouts
  if (!validation(firstName, lastName, email, password)) {
    return
  }


  //Create new app user
  createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    // alert("User created successfully!")
    //Add user account info to realtime database
    //set:  creates new reference or replace existing reference
    //each new user iwll be placed under the users node
    set(ref(db, 'users/' + user.uid + '/accountInfo'),{
      uid: user.uid,
      email: email,
      password: encryptPass(password),  
      firstname: firstName,
      lastname: lastName
    })
    .then(()=>{
      //Data saved successfully
      alert('User created successfully!')
      window.location='index.html'
    })
    .catch((error)=>{
      alert(error)
    })
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    alert(errorMessage)
    // ..
  });
}

// --------------- Check for null, empty ("") or all spaces only ------------//
function isEmptyorSpaces(str) {
  return str === null || str.match(/^ *$/) !== null
}

// ---------------------- Validate Registration Data -----------------------//
function validation(firstName, lastName, email, password) {
  let fNameRegex = /^[a-zA-Z]+$/
  let lNameRegex = /^[a-zA-Z]+$/
  let emailRegex = /^\w+@ctemc\.org$/

  if (isEmptyorSpaces(firstName) || isEmptyorSpaces(lastName) || isEmptyorSpaces(email) || isEmptyorSpaces(password)) {
    alert("please complete all fields.")
    return false;
  }
  if(!fNameRegex.test(firstName)){
    alert("The first name should only contain letters.")
    return false
  }
  if(!lNameRegex.test(lastName)){
    alert("The last name should only contain letters.")
    return false
  }
  if(!emailRegex.test(email)){
    alert("Please enter a valid email.")
    return false
  }
  return true
}

// --------------- Password Encryption -------------------------------------//

function encryptPass(password){
  let encrypted = CryptoJS.AES.encrypt(password, password)
  return encrypted.toString()
}

function decryptPass(password){
  let decrypted = CryptoJS.AES.decrypt(password, password)
  return decrypted.toString()
}

