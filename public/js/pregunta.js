


var crearTemas = function () {
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
        courseId: getUrlParameter('idCourse'),
        answer: answer,
        options : [document.getElementById("input_option_1").value, document.getElementById("input_option_2").value, document.getElementById("input_option_3").value, document.getElementById("input_option_4").value],
        question: document.getElementById("input_question").value,
        topic: document.getElementById("input_topic").value
    }

    console.log(request_body)

    //AJAX
    //var toSend = JSON.stringify(request_body)
    var url = "/ajaxCreateQuestionToCourse";

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

var getUrlParameter = function getUrlParameter(sParam) {
    var sPageURL = window.location.search.substring(1),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
        }
    }
};


document.getElementById("btn_addQuestion").addEventListener("click", crearTemas)