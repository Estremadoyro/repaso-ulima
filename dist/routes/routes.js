"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Routes = void 0;
const firebase_1 = require("../repository/firebase");
const Teacher_1 = require("../models/Teacher");
const Question_1 = require("../models/Question");
const Course_1 = require("../models/Course");
class Routes {
    constructor() {
        this.repository = new firebase_1.Repository();
    }
    routes(app) {
        //INICIO VIEW
        app.get('/', (req, res) => {
            if (req.session.userId != null) {
                res.redirect(`/main/${req.session.userId}`);
            }
            else {
                res.render('inicio', { msg: null });
            }
        });
        app.get('/inicioMensaje', (req, res) => {
            if (req.session.userId != null) {
                res.redirect(`/main/${req.session.userId}`);
            }
            else {
                res.render('inicio', { msg: "Se ha enviado al correo satisfactoriamente" });
            }
        });
        //FIN
        //REGISTRO INICIO
        app.get('/registro', (req, res) => {
            if (req.session.userId != null) {
                res.redirect(`/main/${req.session.userId}`);
            }
            else {
                res.render('registro');
            }
        });
        app.post('/teacher', (req, res) => {
            let teacher = new Teacher_1.Teacher();
            teacher.email = req.body.email;
            teacher.name = req.body.name;
            teacher.id = req.body.id;
            teacher.listCourses = [];
            this.repository.createTeacher(teacher)
                .then(msg => {
                this.setJsonType(res);
                res.send(JSON.stringify(msg));
            }).catch(error => {
                console.log(error);
            });
        });
        //REGISTRO FIN
        //RECUPERAR VIEW
        app.get('/recuperar', (req, res) => {
            if (req.session.userId != null) {
                res.redirect(`/main/${req.session.userId}`);
            }
            else {
                res.render('recuperar');
            }
        });
        //MAIN VIEW
        app.get('/main/:idTeacher', (req, res) => {
            req.session.userId = req.params.idTeacher;
            let coursesListTemp = [];
            this.repository.getCourses()
                .then(responseCourses => {
                let allCourses = responseCourses;
                this.repository.getTeacher(req.params.idTeacher)
                    .then(responseTeacher => {
                    let teacherCourses = responseTeacher.listCourses;
                    if (teacherCourses != undefined) {
                        for (let course of allCourses) {
                            if (teacherCourses.includes(course.id)) {
                                coursesListTemp.push(course);
                            }
                        }
                    }
                    res.render('main', { coursesList: coursesListTemp });
                }).catch(err => {
                    console.log(err);
                });
            }).catch(err => {
                console.log(err);
            });
        });
        app.post('/course', (req, res) => {
            let course = new Course_1.Course();
            course.name = req.body.name;
            course.career = req.body.career;
            course.credits = req.body.credits;
            course.topics = [];
            this.repository.createCourse(course)
                .then(msg => {
                this.setJsonType(res);
                res.send(JSON.stringify(msg));
            })
                .catch(err => {
                console.log(err);
            });
        });
        app.delete('/course/:course', (req, res) => {
            let course = req.params.course;
            this.repository.deleteCourse(course)
                .then(msg => {
                this.setJsonType(res);
                res.send(JSON.stringify(msg));
            })
                .catch(err => {
                console.log(err);
            });
        });
        app.put('/courseToTeacher', (req, res) => {
            this.repository.addCourseToTeacher(req.body.teacherId, req.body.course)
                .then(msg => {
                this.setJsonType(res);
                res.send(JSON.stringify(msg));
            });
        });
        app.put('/topicToCourse', (req, res) => {
            this.repository.getCourse(req.body.courseId)
                .then(course => {
                course.topics.push(req.body.topic);
                this.repository.updateCourse(course.id, course)
                    .then(msg => {
                    this.setJsonType(res);
                    res.send(JSON.stringify(msg));
                })
                    .catch(err => {
                    console.log(err);
                });
            })
                .catch(err => {
                console.log(err);
            });
        });
        //MAIN FINAL
        //TOPIC VIEW
        app.get('/:teacher/:course/:topic', (req, res) => {
            let teacher = req.params.teacher;
            let courseId = req.params.course;
            let topic = req.params.topic;
            this.repository.getQuestionsOfCourse(courseId, topic)
                .then(questions => {
                res.render('tema', { teacher: teacher, questions: questions, topic: topic, course: courseId });
            });
        });
        app.put('/pin/:course/:topic/:pin', (req, res) => {
            console.log('asdf');
            let course = req.params.course;
            let topic = req.params.topic;
            let pin = req.params.pin;
            this.repository.createFiveQuestions(course, topic, pin)
                .then(msg => {
                this.setJsonType(res);
                res.send(JSON.stringify(msg));
            })
                .catch(err => {
                console.log(err);
            });
        });
        //TOPIC FIN
        //QUESTION VIEW
        app.get('/question/:teacher/:course/:topic/', (req, res) => {
            let teacher = req.params.teacher;
            let course = req.params.course;
            let topic = req.params.topic;
            res.render('nuevaPregunta', { teacher: teacher, course: course, topic: topic });
        });
        app.get('/:teacher/:course/:topic/:question', (req, res) => {
            let teacher = req.params.teacher; //id
            let course = req.params.course; //id
            let topic = req.params.topic;
            let question = req.params.question; //id
            this.repository.getQuestionOfCourseByidQuestion(course, question)
                .then(questionObj => {
                res.render('editarPregunta', { teacher: teacher, course: course, question: questionObj, topic: topic });
            })
                .catch(err => {
                console.log(err);
            });
        });
        app.post('/question', (req, res) => {
            let course = req.body.course;
            let question = new Question_1.Question();
            question.answer = req.body.answer;
            question.options = req.body.options;
            question.question = req.body.question;
            question.topic = req.body.topic;
            this.repository.createQuestionToCourse(course, question)
                .then(msg => {
                this.setJsonType(res);
                res.send(JSON.stringify(msg));
            })
                .catch(err => {
                console.log(err);
            });
        });
        app.put('/question', (req, res) => {
            let course = req.body.course;
            let questionObj = new Question_1.Question();
            questionObj.answer = req.body.answer;
            questionObj.id = req.body.id;
            questionObj.options = req.body.options;
            questionObj.question = req.body.question;
            questionObj.topic = req.body.topic;
            this.repository.uptadeQuestionToCourse(course, questionObj.id, questionObj)
                .then(msg => {
                this.setJsonType(res);
                res.send(JSON.stringify(msg));
            })
                .catch(err => {
                console.log(err);
            });
        });
        app.delete('/question/:course/:question', (req, res) => {
            console.log("AEAEAEA");
            let course = req.params.course;
            let question = req.params.question;
            console.log(`${course}, ${question}`);
            this.repository.deleteQuestionToCourse(course, question)
                .then(msg => {
                this.setJsonType(res);
                res.send(JSON.stringify(msg));
            })
                .catch(err => {
                console.log(err);
            });
        });
        //QUESTION FIN
        app.get('/salir', (req, res) => {
            req.session.destroy();
            res.redirect('/');
        });
        //TODO LO DE ABAJO NO CUENTA
        /*
          app.route('/prueba')
              .get((req : Request, res : Response) => {
                  let teacher : Teacher = new Teacher()
                  teacher.name = "aron"
                  teacher.courses = null
                  teacher.email = "aron.lo.li@hotmail.com"
                  teacher.password ="aron12346"
                  //this.repository.createUserFirebase(teacher)
                  //res.send("/webs/auth.html")
                  this.repository.loginUserFirebase(teacher.email, teacher.password).then(val => console.log(val))
              })
 
      

      app.route('/students')
          .get((req: Request, res: Response) => {
              this.repository.getStudents()
                  .then((listAlumnos) => {
                      this.setJsonType(res)
                      res.send(JSON.stringify(listAlumnos))
                  })
                  .catch((error) => {
                      res.send(error)
                  })
          })

      app.route('/student/:id')
          .get((req: Request, res: Response) => {
              this.setJsonType(res)
              this.repository.getStudent(req.params.id)
                  .then(student => {
                      this.setJsonType(res)
                      res.send(JSON.stringify(student))
                  })
                  .catch(error => {
                      res.send(error)
                  })
          })
          .post((req: Request, res: Response) => {

          }) */
        /*
       //FALTA
       app.post('/resistrarCurso', (req, res) => {

           let course: Course = new Course()
           course.id = req.body.course
           course.name = req.body.course
           course.credits = req.body.credits
           course.career = req.body.career
           this.repository.createCourse(course)
               .then(respond => {
                   this.repository.addCourseToTeacher(req.session.userId, course.id)
                       .then( msg => {
                           if(msg.status == true){
                               res.redirect('/')
                           }}).catch(error => {
                               console.log(error);
                           })})
               .catch(error => {
                   console.log(error)
               })
       })





       // app.post('/login' , (req,res) => {
       /*
                       this.repository.loginUser(req.body.email , req.body.password)
                           .then(respond => {
                               if(respond){
                                   console.log(req.body.email)
                                   console.log(req.body.password)
                                   console.log("a22222")
                                   res.redirect('/main')
                               }else{
                                   console.log("quemierda")
                                   res.redirect('/')
                               }
                           })
                           .catch(error => {
                               console.log(error)
                           })
                   })
        */
        /*

        app.get('/pregunta', (req, res) => {
            if(req.session.userId != null){
                let coursesListTemp: Course[] = []
                this.repository.getCourses()
                    .then(responseCourses => {
                        let allCourses: Course[] = responseCourses
                        this.repository.getTeacher(req.session.userId)
                            .then(responseTeacher => {
                                let teacherCourses: string[] = responseTeacher.listCourses
                                if(teacherCourses != undefined ){
                                    for (let course of allCourses) {
                                        if (teacherCourses.includes(course.id)) {
                                            coursesListTemp.push(course)
                                        }
                                    }
                                }
                                res.render('pregunta', { coursesList: coursesListTemp })
                            }).catch(err => {
                                console.log(err);
                            })
                    }).catch(err => {
                        console.log(err);
                    })
            }else{
                res.redirect('/')
            }

         


               

                    


    

        })


        app.get('/editarTema/:idCourse/:topic', (req, res) => {

            // Conseguir los cursos de los profesores de firestore para luego pasarlos como array a .render('main', {inserta array})

            
            
            this.repository.getCourses()
                .then(coursesList => {
                    this.repository.getQuestionsOfCourse(req.params.idCourse,req.params.topic)
                        .then(questionsList =>{
                            res.render('editarTema', { coursesList: coursesList, questionsList: questionsList, courseId : req.params.idCourse})
                        })
                    .catch(err =>{
                        console.log(err)
                    })
                })
                .catch(err => {
                    console.log(err)
                })
        })
        app.get('/editarPregunta/:courseId/:topic/:questionId', (req, res) => {

            // Conseguir los cursos de los profesores de firestore para luego pasarlos como array a .render('main', {inserta array})
                       
            this.repository.getCourses()
                .then(coursesList => {
                    this.repository.getQuestionsOfCourse(req.params.courseId, req.params.topic)
                        .then(questionsList => {
                            let question : Question
                            for(let i = 0; i < questionsList.length; i++){
                                if (questionsList[i].id == req.params.questionId){
                                    question = questionsList[i]
                                }
                            }
                            res.render('editarPregunta', { coursesList: coursesList, question : question })
                        })

                    
                })
                .catch(err => {
                    console.log(err)
                })
        })
        app.get('/editarTema/nuevaPregunta', (req, res) => {

            // Conseguir los cursos de los profesores de firestore para luego pasarlos como array a .render('main', {inserta array})

            this.repository.getCourses()
                .then(coursesList => {
                    res.render('nuevaPregunta', { coursesList: coursesList })
                })
                .catch(err => {
                    console.log(err)
                })
        })

        //app.post('/login', (req, res) => {
        //Firestore


        //Envia el dashboard principal del profesor
        //res.render('main') ;
        //res.redirect('/main') ;
        //});

        //Se deberia hacer la consulta con un GET y no POST
        app.get('/main', (req, res) => {

            if(req.session.userId != null){
                res.redirect(`/main/${req.session.userId}`)
            }else{
                res.redirect('/')
            }

        })



        app.get('/pregunta/:idCourse', (req, res) => {
            let courseId: string = req.params.idCourse


            let coursesListTemp: Course[] = []
            this.repository.getCourses()
                .then(responseCourses => {
                    let allCourses: Course[] = responseCourses
                    this.repository.getTeacher(req.params.idTeacher)
                        .then(responseTeacher => {
                            let teacherCourses: string[] = responseTeacher.listCourses
                            if(teacherCourses != undefined ){
                                for (let course of allCourses) {
                                    if (teacherCourses.includes(course.id)) {
                                        coursesListTemp.push(course)
                                    }
                                }
                            }
                            res.render('pregunta', { coursesList: coursesListTemp })
                        }).catch(err => {
                            console.log(err);
                        })
                }).catch(err => {
                    console.log(err);
                })


            
        })




        app.post('/ajaxCreateQuestionToCourse', (req, res) => {
            console.log(req.body);
            
            let courseId: string = req.body.courseId

            let question: Question = new Question()
            question.answer = req.body.answer
            question.options = req.body.options
            question.question = req.body.question
            question.topic = req.body.topic
            
            this.repository.createQuestionToCourse(courseId, question)
                .then(msg => {
                    this.setJsonType(res)
                    res.send(JSON.stringify(msg))
                })
        })


        app.get('/prueba', (req, res) => {
            let courseId : string = "Calculo 5"

            let question : Question = new Question()
            question.answer = "2"
            question.options = ["1","2","3","3"]
            question.question = "¿1+1?"
            question.topic = "Suma"
            this.repository.createQuestionToCourse(courseId, question)
                .then(msg =>{
                    this.setJsonType(res)
                    res.send(JSON.stringify(msg))
                })
                .catch(err => {
                    res.send(err)
                })
        })

        app.get('/obtenerCursos', (res, req) => {
            this.repository.getCourses().then(value => req.send(value))
        })
        */
        app.get('/prueba', (res, req) => {
            this.repository.getQuestionOfCourseByidQuestion("Ingeniería de Software 2", "zL2MIeqOKgZwIaq8Ympx")
                .then(val => {
                console.log(val);
            });
            this.repository.getQuestionOfCourseByQuestion("Ingeniería de Software 2", "La extension .ts se refiere a que?")
                .then(val => {
                console.log(val);
            });
        });
    }
    setJsonType(res) {
        res.set('Content-Type', 'application/json');
    }
}
exports.Routes = Routes;
