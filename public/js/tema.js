
function generarCodigoRandom(course, topic) {
    let r = Math.random().toString(36).substring(7);

	document.getElementById('codigoGenerado').innerHTML = r;
	
	var url = `/pin/${course}/${topic}/${r}`
	
	console.log(url)

	var req = new XMLHttpRequest()
	req.open("PUT", url)
	req.setRequestHeader("Content-type", "application/json")
	req.onreadystatechange = function (evt) {
		if (req.readyState == 4) {
			if (req.status == 200) {
				var response = JSON.parse(req.responseText)
				if (response.status == true) {
                    console.log("Post exitoso") 
				} else {
					console.log("Error en crear en firestore")
				}
			} else {
				console.log("Error en la conexion")
			}
		}
    }
    var json = {msg : ""}
	req.send(JSON.stringify(json))
}

document.getElementById("btn_back").addEventListener("click", function () {
    window.location.href = `/main/${getTeacher()}`
})

function preguntaView(course, topic) {
    window.location.href = `/question/${getTeacher()}/${course}/${topic}`
}

function modifyQuestion(course, topic,question) {
    console.log(question)
    window.location.href = `/${getTeacher()}/${course}/${topic}/${question}`
}

function getTeacher() {
    var path = window.location.pathname
    var arr = path.split("/")
    return arr[1]
}


/*
function eliminarPreguntaDeTema (course, topic, question){ 

    console.log(`Curso: ${course}, Tema: ${topic}, Pregunta: ${question}`) ; 

    var url = `/question/${course}/${question}` ;
    console.log(url) ; 
	var req = new XMLHttpRequest()
	req.open("DELETE", url)
	req.setRequestHeader("Content-type", "application/json")
	req.onreadystatechange = function (evt) {
		if (req.readyState == 4) {
			if (req.status == 200) {
				var response = JSON.parse(req.responseText) 
				if (response.status == true) {
                    console.log("Se elimino aea") ; 
				} else {
                    console.log("Error al eliminar")
				}
			} 
		}
    }

    req.send(JSON.stringify(url)) ; 
    
}
*/
function getTeacherId() {
	var path = window.location.pathname
	var arr = path.split("/")
	return arr[1]
}

function eliminarPreguntaDeTema(course, topic, question){//modificar
	console.log("asfdasdfasdf")
    var url = `/question/${course}/${question}`
	var req = new XMLHttpRequest()
	req.open("DELETE", url)
	req.setRequestHeader("Content-type", "application/json")
	req.onreadystatechange = function (evt) {
		if (req.readyState == 4) {
			if (req.status == 200) {
				var response = JSON.parse(req.responseText)
				if (response.status == true) {
                    console.log("Delete exitoso") 
                    window.open(`/${getTeacherId()}/${course}/${topic}`, "_self") ;
				} else {
					console.log("Error en crear en firestore")
				}
			} else {
				console.log("Error en la conexion")
			}
		}
    }
    var json = {msg : ""}
	req.send(JSON.stringify(json))
}