"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Repository = void 0;
const admin = require("firebase-admin");
const Student_1 = require("../models/Student");
const Course_1 = require("../models/Course");
const Question_1 = require("../models/Question");
const Teacher_1 = require("../models/Teacher");
const Message_1 = require("../models/Message");
let serviceAccount = require('../../repasoulima_firebase_config.json');
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://repasoulima.firebaseio.com"
});
let db = admin.firestore();
let au = admin.auth();
const studentCollection = "users";
const courseCollection = "courses";
const teacherCollection = "teachers";
const PINCollection = "PIN";
class Repository {
    //COURSES DAO
    getCourses() {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                let listCourses = [];
                db.collection(courseCollection).get()
                    .then(snapshot => {
                    if (snapshot.empty) {
                        this.printEmpty(courseCollection);
                    }
                    snapshot.forEach(doc => {
                        let tempCourse = Course_1.Course.mapperToCourse(doc.data());
                        tempCourse.id = doc.id;
                        listCourses.push(tempCourse);
                    });
                    resolve(listCourses);
                })
                    .catch(error => {
                    this.printError(error);
                    reject(error);
                });
            });
        });
    }
    getCourse(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                db.collection(courseCollection).doc(id).get()
                    .then(doc => {
                    if (!doc.exists) {
                        this.printEmpty(`${courseCollection}: ${id}`);
                    }
                    let tempCourse = Course_1.Course.mapperToCourse(doc.data());
                    tempCourse.id = doc.id;
                    resolve(tempCourse);
                })
                    .catch(error => {
                    this.printEmpty(error);
                    reject(error);
                });
            });
        });
    }
    createCourse(course) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                db.collection(courseCollection).doc(course.name).set(course.getJSON())
                    .then(ref => {
                    this.sendResponse(course.name, true, resolve);
                })
                    .catch(error => {
                    this.printError(error);
                    this.sendResponse(null, false, resolve);
                });
            });
        });
    }
    updateCourse(codCourse, course) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                db.collection(courseCollection).doc(codCourse).update(course.getJSON())
                    .then(ref => {
                    this.sendResponse(null, true, resolve);
                })
                    .catch(error => {
                    this.printError(error);
                    this.sendResponse(null, false, resolve);
                });
            });
        });
    }
    deleteCourse(codCourse) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                db.collection(courseCollection).doc(codCourse).delete()
                    .then(ref => {
                    this.sendResponse(null, true, resolve);
                })
                    .catch(error => {
                    this.printError(error);
                    this.sendResponse(null, false, resolve);
                });
            });
        });
    }
    checkCourseIsCreated(codCourse) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                db.collection(courseCollection).doc(codCourse).get()
                    .then(doc => {
                    if (doc.exists) {
                        this.sendResponse(null, true, resolve);
                    }
                    else {
                        this.sendResponse(null, false, resolve);
                    }
                })
                    .catch(error => {
                    this.printEmpty(error);
                    reject(error);
                });
            });
        });
    }
    //TEACHERS DAO
    getTeachers() {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                let listTeacher = [];
                db.collection(teacherCollection).get()
                    .then(snapshot => {
                    if (snapshot.empty) {
                        this.printEmpty(teacherCollection);
                    }
                    snapshot.forEach(doc => {
                        let tempTeacher = Teacher_1.Teacher.mapperToTeacher(doc.data());
                        tempTeacher.id = doc.id;
                        listTeacher.push(tempTeacher);
                    });
                    resolve(listTeacher);
                })
                    .catch(error => {
                    this.printError(error);
                    reject(error);
                });
            });
        });
    }
    getTeacher(email) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                db.collection(teacherCollection).doc(email).get()
                    .then(doc => {
                    if (!doc.exists) {
                        this.printEmpty(`${teacherCollection}: ${email}`);
                    }
                    let tempTeacher = Teacher_1.Teacher.mapperToTeacher(doc.data());
                    tempTeacher.id = doc.id;
                    resolve(tempTeacher);
                })
                    .catch(error => {
                    this.printEmpty(error);
                    reject(error);
                });
            });
        });
    }
    getTeacherById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                db.collection(teacherCollection).doc(id).get()
                    .then(doc => {
                    if (!doc.exists) {
                        this.printEmpty(`${teacherCollection}: ${id}`);
                    }
                    let tempTeacher = Teacher_1.Teacher.mapperToTeacher(doc.data());
                    tempTeacher.id = doc.id;
                    resolve(tempTeacher);
                })
                    .catch(error => {
                    this.printEmpty(error);
                    reject(error);
                });
            });
        });
    }
    createTeacher(teacher) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                db.collection(teacherCollection).doc(teacher.id).set(teacher.getJSON())
                    .then(ref => {
                    this.sendResponse(teacher.id, true, resolve);
                })
                    .catch(error => {
                    this.printError(error);
                    this.sendResponse(null, false, resolve);
                });
            });
        });
    }
    updateTeacher(id, teacher) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                db.collection(teacherCollection).doc(id).update(teacher.getJSON())
                    .then(ref => {
                    this.sendResponse(null, true, resolve);
                })
                    .catch(error => {
                    this.printError(error);
                    this.sendResponse(null, false, resolve);
                });
            });
        });
    }
    deleteTeacher(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                db.collection(teacherCollection).doc(id).delete()
                    .then(ref => {
                    this.sendResponse(null, true, resolve);
                })
                    .catch(error => {
                    this.printError(error);
                    this.sendResponse(null, false, resolve);
                });
            });
        });
    }
    //STUDENTS DAO
    getStudents() {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                let listStudents = [];
                db.collection(studentCollection).get()
                    .then((snapshot) => {
                    if (snapshot.empty) {
                        this.printEmpty(studentCollection);
                    }
                    snapshot.forEach(doc => {
                        let tempStudent = Student_1.Student.mapperToStudent(doc.data());
                        tempStudent.id = doc.id;
                        listStudents.push(tempStudent);
                    });
                    resolve(listStudents);
                })
                    .catch(error => {
                    this.printError(error);
                    reject(error);
                });
            });
        });
    }
    getStudent(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                db.collection(studentCollection).doc(id).get()
                    .then(doc => {
                    if (!doc.exists) {
                        this.printEmpty(`${studentCollection}: ${id}`);
                    }
                    let tempStudent = Student_1.Student.mapperToStudent(doc.data());
                    tempStudent.id = doc.id;
                    resolve(tempStudent);
                })
                    .catch(error => {
                    this.printEmpty(error);
                    reject(error);
                });
            });
        });
    }
    createStudent(student) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                db.collection(studentCollection).add(student.getJSON())
                    .then(ref => {
                    this.sendResponse(ref.id, true, resolve);
                })
                    .catch(error => {
                    this.printError(error);
                    this.sendResponse(null, false, resolve);
                });
            });
        });
    }
    //---------------------------------------------------------------------------------
    addCourseToTeacher(teacherId, courseId) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                db.collection(teacherCollection).doc(teacherId).update({
                    listCourses: admin.firestore.FieldValue.arrayUnion(courseId)
                }).then(ref => {
                    this.sendResponse(null, true, resolve);
                }).catch(error => {
                    this.printError(error);
                    this.sendResponse(null, false, resolve);
                });
            });
        });
    }
    removeCourseToTeacher(teacherId, courseId) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                db.collection(teacherCollection).doc(teacherId).update({
                    listCourses: admin.firestore.FieldValue.arrayRemove(courseId)
                }).then(ref => {
                    this.sendResponse(null, true, resolve);
                }).catch(error => {
                    this.printError(error);
                    this.sendResponse(null, false, resolve);
                });
            });
        });
    }
    getQuestionsOfCourse(courseId, topic) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                let listQuestions = [];
                db.collection(courseCollection).doc(courseId).collection("questions").where("topic", '==', topic).get()
                    .then(snapshot => {
                    if (snapshot.empty) {
                        this.printEmpty(`Questions of topic :${topic}`);
                    }
                    snapshot.forEach(doc => {
                        let tempQuestion = Question_1.Question.mapperToQuestion(doc.data());
                        tempQuestion.id = doc.id;
                        listQuestions.push(tempQuestion);
                    });
                    resolve(listQuestions);
                }).catch(error => {
                    this.printError(error);
                    reject(error);
                });
            });
        });
    }
    getQuestionOfCourseByQuestion(courseId, question) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                db.collection(courseCollection).doc(courseId).collection("questions").where("question", '==', question).limit(1).get()
                    .then(snapshot => {
                    if (snapshot.empty) {
                        this.printEmpty(`Question :${question}`);
                    }
                    let tempQuestion;
                    snapshot.forEach(doc => {
                        tempQuestion = Question_1.Question.mapperToQuestion(doc.data());
                        tempQuestion.id = doc.id;
                    });
                    resolve(tempQuestion);
                }).catch(error => {
                    this.printError(error);
                    reject(error);
                });
            });
        });
    }
    getQuestionOfCourseByidQuestion(courseId, idQuestion) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                db.collection(courseCollection).doc(courseId).collection("questions").doc(idQuestion).get()
                    .then(doc => {
                    if (!doc.exists) {
                        this.printEmpty(`Question :${idQuestion}`);
                    }
                    let tempQuestion = Question_1.Question.mapperToQuestion(doc.data());
                    tempQuestion.id = doc.id;
                    resolve(tempQuestion);
                }).catch(error => {
                    this.printError(error);
                    reject(error);
                });
            });
        });
    }
    createQuestionToCourse(courseId, question) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                let refDoc = db.collection(courseCollection).doc(courseId);
                refDoc.update({ topics: admin.firestore.FieldValue.arrayUnion(question.topic) });
                refDoc.collection("questions").add(question.getJSON())
                    .then(ref => {
                    this.sendResponse(ref.id, true, resolve);
                }).catch(error => {
                    this.printError(error);
                    this.sendResponse(null, false, resolve);
                });
            });
        });
    }
    uptadeQuestionToCourse(courseId, questionId, question) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                db.collection(courseCollection).doc(courseId)
                    .collection("questions").doc(questionId).update(question.getJSON())
                    .then(ref => {
                    this.sendResponse(null, true, resolve);
                }).catch(error => {
                    this.printError(error);
                    this.sendResponse(null, false, resolve);
                });
            });
        });
    }
    deleteQuestionToCourse(courseId, questionId) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                db.collection(courseCollection).doc(courseId).collection("questions").doc(questionId).get()
                    .then(doc => {
                    let question = Question_1.Question.mapperToQuestion(doc.data());
                    db.collection(courseCollection).doc(courseId).collection("questions").doc(questionId).delete()
                        .then(ref => {
                        db.collection(courseCollection).doc(courseId).collection("questions").where("topic", '==', question.topic).get()
                            .then(snapshot => {
                            if (snapshot.empty) {
                                db.collection(courseCollection).doc(courseId).update({
                                    topics: admin.firestore.FieldValue.arrayRemove(question.topic)
                                });
                            }
                            this.sendResponse(null, true, resolve);
                        });
                    }).catch(error => {
                        this.printError(error);
                        this.sendResponse(null, false, resolve);
                    });
                }).catch(error => {
                    this.printError(error);
                    this.sendResponse(null, false, resolve);
                });
            }));
        });
    }
    createFiveQuestions(courseId, topic, pinId) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                let listQuestions = [];
                let listFiveQuestions = [];
                db.collection(courseCollection).doc(courseId)
                    .collection("questions").where('topic', '==', topic)
                    .get()
                    .then(snapshot => {
                    if (snapshot.empty) {
                        this.printEmpty(`Questions of topic :${topic}`);
                        return;
                    }
                    snapshot.forEach(doc => {
                        let tempQuestion = Question_1.Question.mapperToQuestion(doc.data());
                        tempQuestion.id = doc.id;
                        listQuestions.push(tempQuestion);
                    });
                    //console.log(listQuestions);
                    let arr = this.generateFiveRandomsNumbers(listQuestions.length);
                    console.log(arr);
                    for (let num of arr) {
                        listFiveQuestions.push(listQuestions[num]);
                    }
                    console.log(listFiveQuestions);
                    let refPIN = db.collection(PINCollection).doc(pinId).collection("questions");
                    for (let question of listFiveQuestions) {
                        refPIN.doc(question.id).set(question.getJSON());
                    }
                    let refDoc = db.collection(PINCollection).doc(pinId);
                    let dataTemp = {
                        course: courseId,
                        isActive: true,
                        started: false
                    };
                    refDoc.set(dataTemp);
                    this.sendResponse(pinId, true, resolve);
                }).catch(error => {
                    this.printError(error);
                    this.sendResponse(null, false, resolve);
                });
            });
        });
    }
    generateFiveRandomsNumbers(lenOfArray) {
        let arr = [];
        while (arr.length < 5 && arr.length != lenOfArray) {
            var r = Math.floor(Math.random() * lenOfArray);
            if (arr.indexOf(r) === -1)
                arr.push(r);
        }
        return arr;
    }
    printError(error) {
        console.log(error);
    }
    printEmpty(colecion) {
        console.log(`No hay documentos en ${colecion}`);
    }
    sendResponse(ref, status, resolve) {
        let message = new Message_1.Message();
        if (ref != null) {
            message.reference = ref;
        }
        message.status = status;
        resolve(message);
    }
}
exports.Repository = Repository;
