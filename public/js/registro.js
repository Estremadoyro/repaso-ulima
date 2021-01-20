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

function crearCuenta() {
  var mail_1 = document.getElementById('inputEmail')
  var name_1 = document.getElementById('inputNombre')
  var lastName_1 = document.getElementById('inputApellido')
  var passConf_1 = document.getElementById('inputPassword-conf')
  var pass_1 = document.getElementById('inputPassword')

  if (mail_1.value == "" || name_1 == "" || lastName_1 == "" || passConf_1 == "" || pass_1 == "") {
    document.getElementById("alerta").className = "alert alert-danger alerta border"
    document.getElementById("alerta").innerText = "No se ha completado todos los campos"
    limpiarCampos()
  } else {
    if (pass_1.value.length >= 6) {
      if (pass_1.value == passConf_1.value) {
        firebase.auth().createUserWithEmailAndPassword(mail_1.value, pass_1.value)
          .then(function (ref) {
            var url = "/teacher"
            var request_body = {
              name: name_1.value,
              email: mail_1.value,
              id: ref.user.uid
            }
            var req = new XMLHttpRequest();
            req.open("POST", url)
            req.setRequestHeader("Content-type", "application/json")
            req.onreadystatechange = function (evt) {
              if (req.readyState == 4) {
                if (req.status == 200) {
                  var response = JSON.parse(req.responseText)
                  console.log(response.estado)
                  if (response.status == true) {
                    console.log("Registro exitoso")
                    window.location.href = `/main/${ref.user.uid}`
                  } else {
                    console.log("Error en crear en firestore")
                  }
                } else {
                  console.log("Error en la conexion")
                }
              }
            };
            console.log(JSON.stringify(request_body))
            req.send(JSON.stringify(request_body))
          })
          .catch(function (err) {
            document.getElementById("alerta").className = "alert alert-danger alerta border"
            document.getElementById("alerta").innerText = "Error al momento de crear la cuenta"
            limpiarCampos()
          })
      } else {
        document.getElementById("alerta").className = "alert alert-danger alerta border"
        document.getElementById("alerta").innerText = "Las contraseñas no coinciden"
        limpiarCampos()
      }
    } else {
      document.getElementById("alerta").className = "alert alert-danger alerta border"
      document.getElementById("alerta").innerText = "La contraseña debe tener más de 5 digitos"
      limpiarCampos()
    }
  }
}

function limpiarCampos() {
  document.getElementById('inputEmail').value = ""
  document.getElementById('inputNombre').value = ""
  document.getElementById('inputApellido').value = ""
  document.getElementById('inputPassword-conf').value = ""
  document.getElementById('inputPassword').value = ""
}
