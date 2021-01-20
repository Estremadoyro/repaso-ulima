var crearPregunta = function (course, topic) {
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
        topic: topic
    }

    console.log(request_body)

    //AJAX
    var url = "/question";
    var req = new XMLHttpRequest();
    req.open("POST", url);
    req.setRequestHeader("Content-type", "application/json");
    req.onreadystatechange = function (evt) {
        if (req.readyState == 4) {
            if (req.status == 200) {
                var response = JSON.parse(req.responseText)
                console.log(response.estado)
                if (response.status == true) {
                    console.log("Registro exitoso")
                    document.getElementById('alerta').innerHTML = 'Pregunta creada exitosamente!'
                    document.getElementById("input_question").value = "",
                    document.getElementById("input_option_1").value = "", 
                    document.getElementById("input_option_2").value = "", 
                    document.getElementById("input_option_3").value = "", 
                    document.getElementById("input_option_4").value = ""
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
}



//reciente
function topicView(teacher,course,topic){
    window.location.href = `/${teacher}/${course}/${topic}`
}
