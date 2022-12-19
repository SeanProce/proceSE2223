// ----------------- Firebase Setup & Initialization ------------------------//
 // Import the functions you need from the SDKs you need
 import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
 import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getDatabase, ref, set, update, child, get } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";
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

// ---------------------- Sign-In User ---------------------------------------//
document.getElementById('signIn').onclick = function(){
    const email = document.getElementById('loginEmail').value
    const password = document.getElementById('loginPassword').value

    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        const user = userCredential.user
        let logDate = new Date()
        update(ref(db, 'users/' + user.uid + '/accountInfo'),{
            lastLogin: logDate
        })
        .then(()=> {
            alert('User signed in successully!')
            get(ref(db, 'users/' + user.uid + '/accountInfo')).then((snapshot) => {
                if(snapshot.exists()){
                    // console.log(snapshot.val())
                    logIn(snapshot.val())
                } else {
                    console.log('User does not exist.')
                }
            })
            .catch((error)=>{
                console.log(error)
            })
        })
        .catch((error)=>{
            alert(error)
        })
    })
    .catch((error)=>{
        const errorCode = error.errorCode
        const errorMessage = error.messagingSenderId
        alert(errorMessage)
    })
}


// ---------------- Keep User Logged In ----------------------------------//
function logIn(user){
    let keepLoggedIn = document.getElementById('keepLoggedInSwitch').ariaChecked
    if(!keepLoggedIn){
        sessionStorage.setItem('user', JSON.stringify(user))
        window.location='home.html'
    } else {
        localStorage.setItem('keepLoggedIn', 'yes')
        localStorage.setItem('user', JSON.stringify(user))
        window.location='home.html'
    }
}
