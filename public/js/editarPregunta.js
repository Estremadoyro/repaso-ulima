
function back(teacher, course, topic){
    window.location.href = `/${teacher}/${course}/${topic}`
}

function modify(course, topic, questionId){
    let json = getJSON(course, topic, questionId)
    modifyQuestion(json, course)
}

function getJSON(course,topic, questionId){
    var answer
    if (document.getElementById("input_radio_1").checked == true) {
        answer = document.getElementById("input_option_1").value
    } else if (document.getElementById("input_radio_2").checked == true) {
        answer = document.getElementById("input_option_2").value
    } else if (document.getElementById("input_radio_3").checked == true) {
        answer = document.getElementById("input_option_3").value
    } else if (document.getElementById("input_radio_4").checked == true) {
        answer = document.getElementById("input_option_4").value
    }else{
        answer = document.getElementById("input_option_1").value
    }

    var request_body = {
        course: course,
        answer: answer,
        options : [document.getElementById("input_option_1").value, document.getElementById("input_option_2").value, document.getElementById("input_option_3").value, document.getElementById("input_option_4").value],
        question: document.getElementById("input_question").value,
        topic: topic,
        id: questionId
    }
    return request_body
}

function modifyQuestion(request_body, course){
	var url = `/question`
	var req = new XMLHttpRequest()
	req.open("PUT", url)
	req.setRequestHeader("Content-type", "application/json")
	req.onreadystatechange = function (evt) {
		if (req.readyState == 4) {
			if (req.status == 200) {
				var response = JSON.parse(req.responseText)
				if (response.status == true) {
                    console.log("Registro exitoso")
                    document.getElementById('alerta').className = 'alert alert-success border'
                    document.getElementById('alerta').innerHTML = 'Se ha modificado exitosamente'
				} else {
                    document.getElementById('alerta').className = 'alert alert-danger border'
                    document.getElementById('alerta').innerHTML = 'Error al modificar'
				}
			} else {
                document.getElementById('alerta').className = 'alert alert-danger border'
                document.getElementById('alerta').innerHTML = 'Error al modificar'
			}
		}
	}
	req.send(JSON.stringify(request_body))
}
