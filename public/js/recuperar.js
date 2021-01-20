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

function recuperar() { 

    var correo = document.getElementById('inputEmail')

    firebase.auth().sendPasswordResetEmail(correo.value)
        .then(function () {
            window.location.href = `/inicioMensaje`
        })
        .catch(function (error) {
            document.getElementById("alerta").className = "alert alert-danger alerta border"
            document.getElementById("alerta").innerText = "Validar correo ingresado"
            correo.value = ""
        });
}

firebase.auth().useDeviceLanguage()