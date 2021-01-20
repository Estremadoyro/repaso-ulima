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

firebase.auth().signInWithEmailAndPassword("aron.lo.li@hotmail.com", "aron12345")
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

/* 
firebase.auth().signOut()



    firebase.auth().createUserWithEmailAndPassword("aron.lo.li@hotmail.com", "aron12345")
        .then(function (ref) {
            console.log(ref)
            console.log(ref.user.uid)

            //post 

        }


).catch (function (error) {
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
 */
firebase.auth().useDeviceLanguage()