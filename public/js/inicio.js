// Initialize Firebase
var firebaseConfig = {
    apiKey: "AIzaSyDBWIM7PRl5OXOz_SV9g8ksBRU60feZ_pM",
    authDomain: "repasoulima.firebaseapp.com",
    databaseURL: "https://repasoulima.firebaseio.com",
    projectId: "repasoulima",
    storageBucket: "repasoulima.appspot.com",
    messagingSenderId: "714818478928",
    appId: "1:714818478928:web:9e7c4f6505793ca2370255"
};

// Initialize Firebase
var defaultProject = firebase.initializeApp(firebaseConfig);

document.getElementById("btn-registrate").addEventListener("click", function(){
    this.href = "/registro"
})

window.addEventListener("keypress", function(key){
    if(key.keyCode == "13"){
        login()
    }
}, false)

document.getElementById("but_login").addEventListener("click", login)

document.getElementById("customCheck1").addEventListener("change", function(){
    if(this.checked) {
        if(document.getElementById("inputEmail").value != "" && document.getElementById("inputPassword").value !=""){
            localStorage.setItem("email_user",document.getElementById("inputEmail").value)
            localStorage.setItem("pass_user", document.getElementById("inputPassword").value)
        }
    } else {
        localStorage.clear()
        document.getElementById("inputPassword").value = ""
        document.getElementById("inputEmail").value = ""
    }
})

function login(){
    
    var email = document.getElementById("inputEmail").value
    var password = document.getElementById("inputPassword").value
    firebase.auth().signInWithEmailAndPassword(email, password)
    .then(function (ref) {
        window.location.href = `/main/${ref.user.uid}`
 
    }).catch(function (error) {
        console.log(error.message)
        console.log(error.code)
        document.getElementById("inputPassword").value = ""
        document.getElementById("inputEmail").value = ""
        document.getElementById("alerta").className = "alert alert-danger alerta border"
    });
}


window.onload = function(){
    if(localStorage.getItem("email_user") != null){
        document.getElementById("inputEmail").value = localStorage.getItem("email_user")
        document.getElementById("customCheck1").checked = true;
    }
    if(localStorage.getItem("pass_user") != null){
        document.getElementById("inputPassword").value = this.localStorage.getItem("pass_user")
        document.getElementById("customCheck1").checked = true;
    }
    
    
}
/*
    firebase.auth().signInWithEmailAndPassword(mail, pass)
    .then(function (result) {
        console.log(result)
        document.write(JSON.stringify(result))
        // result.user.tenantId should be ‘TENANT_PROJECT_ID’.
    }).catch(function (error) {
        console.log(result)
    });



firebase.auth().sendPasswordResetEmail('aron.lo.li@hotmail.com')
    .then(function () {
        // Password reset email sent.
    })
    .catch(function (error) {
        // Error occurred. Inspect error.code.
    });


firebase.auth().signOut()



    firebase.auth().createUserWithEmailAndPassword("aron.lo.li@hotmail.com", "aron12345")
        .then(function (ref) {
            console.log(ref)
            console.log(ref.user.uid)

            //post 
        }


)
    .catch (function (error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    if (errorCode == 'auth/weak-password') {
        alert('The password is too weak.');
    } else {
        alert(errorMessage);
    }
    console.log(error);
});

firebase.auth().useDeviceLanguage()

*/