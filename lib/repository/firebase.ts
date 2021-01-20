import * as admin from "firebase-admin";
import * as firebaseui from "firebaseui"

import { Student } from "../models/Student"
import { Course } from "../models/Course"
import { Question } from "../models/Question"
import { QuestionBank } from "../models/QuestionBank"
import { Teacher } from "../models/Teacher"
import { Message } from "../models/Message"
import { resolve } from "path";


let serviceAccount = require('../../repasoulima_firebase_config.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://repasoulima.firebaseio.com"
})


let db = admin.firestore()
let au = admin.auth()

const studentCollection: string = "users"
const courseCollection: string = "courses"
const teacherCollection: string = "teachers"
const PINCollection: string = "PIN"

export class Repository {


    //COURSES DAO

    public async getCourses(): Promise<Course[]> {
        return new Promise((resolve, reject) => {
            let listCourses: Course[] = []
            db.collection(courseCollection).get()
                .then(snapshot => {
                    if (snapshot.empty) {
                        this.printEmpty(courseCollection)
                    }
                    snapshot.forEach(doc => {
                        let tempCourse: Course = Course.mapperToCourse(doc.data())
                        tempCourse.id = doc.id
                        listCourses.push(tempCourse)
                    })
                    resolve(listCourses)
                })
                .catch(error => {
                    this.printError(error)
                    reject(error)
                })
        })
    }

    public async getCourse(id: string): Promise<Course> {
        return new Promise((resolve, reject) => {
            db.collection(courseCollection).doc(id).get()
                .then(doc => {
                    if (!doc.exists) {
                        this.printEmpty(`${courseCollection}: ${id}`)
                    }
                    let tempCourse: Course = Course.mapperToCourse(doc.data())
                    tempCourse.id = doc.id
                    resolve(tempCourse)
                })
                .catch(error => {
                    this.printEmpty(error)
                    reject(error)
                })
        })
    }


    public async createCourse(course: Course): Promise<Message> {
        return new Promise((resolve, reject) => {
            db.collection(courseCollection).doc(course.name).set(course.getJSON())
                .then(ref => {
                    this.sendResponse(course.name, true, resolve)
                })
                .catch(error => {
                    this.printError(error)
                    this.sendResponse(null, false, resolve)
                })
        })
    }

    public async updateCourse(codCourse: string, course: Course): Promise<Message> {
        return new Promise((resolve, reject) => {
            db.collection(courseCollection).doc(codCourse).update(course.getJSON())
                .then(ref => {
                    this.sendResponse(null, true, resolve)
                })
                .catch(error => {
                    this.printError(error)
                    this.sendResponse(null, false, resolve)
                })
        })
    }

    public async deleteCourse(codCourse: string): Promise<Message> {
        return new Promise((resolve, reject) => {
            db.collection(courseCollection).doc(codCourse).delete()
                .then(ref => {
                    this.sendResponse(null, true, resolve)
                })
                .catch(error => {
                    this.printError(error)
                    this.sendResponse(null, false, resolve)
                })
        })
    }

    public async checkCourseIsCreated(codCourse: string): Promise<Message> {
        return new Promise((resolve, reject) => {
            db.collection(courseCollection).doc(codCourse).get()
                .then(doc => {
                    if (doc.exists) {
                        this.sendResponse(null, true, resolve)
                    } else {
                        this.sendResponse(null, false, resolve)
                    }
                })
                .catch(error => {
                    this.printEmpty(error)
                    reject(error)
                })
        })
    }


    //TEACHERS DAO

    public async getTeachers(): Promise<Teacher[]> {
        return new Promise((resolve, reject) => {
            let listTeacher: Teacher[] = []
            db.collection(teacherCollection).get()
                .then(snapshot => {
                    if (snapshot.empty) {
                        this.printEmpty(teacherCollection)
                    }
                    snapshot.forEach(doc => {
                        let tempTeacher: Teacher = Teacher.mapperToTeacher(doc.data())
                        tempTeacher.id = doc.id
                        listTeacher.push(tempTeacher)
                    })
                    resolve(listTeacher)
                })
                .catch(error => {
                    this.printError(error)
                    reject(error)
                })
        })
    }

    public async getTeacher(email: string): Promise<Teacher> {
        return new Promise((resolve, reject) => {
            db.collection(teacherCollection).doc(email).get()
                .then(doc => {
                    if (!doc.exists) {
                        this.printEmpty(`${teacherCollection}: ${email}`)
                    }
                    let tempTeacher: Teacher = Teacher.mapperToTeacher(doc.data())
                    tempTeacher.id = doc.id
                    resolve(tempTeacher)
                })
                .catch(error => {
                    this.printEmpty(error)
                    reject(error)
                })
        })
    }

    public async getTeacherById(id: string): Promise<Teacher> {
        return new Promise((resolve, reject) => {
            db.collection(teacherCollection).doc(id).get()
                .then(doc => {
                    if (!doc.exists) {
                        this.printEmpty(`${teacherCollection}: ${id}`)
                    }
                    let tempTeacher: Teacher = Teacher.mapperToTeacher(doc.data())
                    tempTeacher.id = doc.id
                    resolve(tempTeacher)
                })
                .catch(error => {
                    this.printEmpty(error)
                    reject(error)
                })
        })
    }

    public async createTeacher(teacher: Teacher): Promise<Message> {
        return new Promise((resolve, reject) => {
            db.collection(teacherCollection).doc(teacher.id).set(teacher.getJSON())
                .then(ref => {
                    this.sendResponse(teacher.id, true, resolve)
                })
                .catch(error => {
                    this.printError(error)
                    this.sendResponse(null, false, resolve)
                })
        })
    }

    public async updateTeacher(id: string, teacher: Teacher): Promise<Message> {
        return new Promise((resolve, reject) => {
            db.collection(teacherCollection).doc(id).update(teacher.getJSON())
                .then(ref => {
                    this.sendResponse(null, true, resolve)
                })
                .catch(error => {
                    this.printError(error)
                    this.sendResponse(null, false, resolve)
                })
        })
    }

    public async deleteTeacher(id: string): Promise<Message> {
        return new Promise((resolve, reject) => {
            db.collection(teacherCollection).doc(id).delete()
                .then(ref => {
                    this.sendResponse(null, true, resolve)
                })
                .catch(error => {
                    this.printError(error)
                    this.sendResponse(null, false, resolve)
                })
        })
    }




    //STUDENTS DAO

    public async getStudents(): Promise<Student[]> {
        return new Promise((resolve, reject) => {
            let listStudents: Student[] = []
            db.collection(studentCollection).get()
                .then((snapshot) => {
                    if (snapshot.empty) {
                        this.printEmpty(studentCollection)
                    }
                    snapshot.forEach(doc => {
                        let tempStudent: Student = Student.mapperToStudent(doc.data())
                        tempStudent.id = doc.id
                        listStudents.push(tempStudent)
                    })
                    resolve(listStudents)
                })
                .catch(error => {
                    this.printError(error)
                    reject(error)
                })
        })
    }



    public async getStudent(id: string): Promise<Student> {
        return new Promise((resolve, reject) => {
            db.collection(studentCollection).doc(id).get()
                .then(doc => {
                    if (!doc.exists) {
                        this.printEmpty(`${studentCollection}: ${id}`)
                    }
                    let tempStudent: Student = Student.mapperToStudent(doc.data())
                    tempStudent.id = doc.id
                    resolve(tempStudent)
                })
                .catch(error => {
                    this.printEmpty(error)
                    reject(error)
                })
        })
    }

    public async createStudent(student: Student): Promise<Message> {
        return new Promise((resolve, reject) => {
            db.collection(studentCollection).add(student.getJSON())
                .then(ref => {
                    this.sendResponse(ref.id, true, resolve)
                })
                .catch(error => {
                    this.printError(error)
                    this.sendResponse(null, false, resolve)
                })
        })
    }


    //---------------------------------------------------------------------------------

    public async addCourseToTeacher(teacherId: string, courseId: string): Promise<Message> {
        return new Promise((resolve, reject) => {
            db.collection(teacherCollection).doc(teacherId).update({
                listCourses: admin.firestore.FieldValue.arrayUnion(courseId)
            }).then(ref => {
                this.sendResponse(null, true, resolve)
            }).catch(error => {
                this.printError(error)
                this.sendResponse(null, false, resolve)
            })
        })
    }


    public async removeCourseToTeacher(teacherId: string, courseId: string): Promise<Message> {
        return new Promise((resolve, reject) => {
            db.collection(teacherCollection).doc(teacherId).update({
                listCourses: admin.firestore.FieldValue.arrayRemove(courseId)
            }).then(ref => {
                this.sendResponse(null, true, resolve)
            }).catch(error => {
                this.printError(error)
                this.sendResponse(null, false, resolve)
            })
        })
    }



    public async getQuestionsOfCourse(courseId: string, topic: String): Promise<Question[]> {
        return new Promise((resolve, reject) => {
            let listQuestions: Question[] = []
            db.collection(courseCollection).doc(courseId).collection("questions").where("topic", '==', topic).get()
                .then(snapshot => {
                    if (snapshot.empty) {
                        this.printEmpty(`Questions of topic :${topic}`)
                    }


                    snapshot.forEach(doc => {
                        let tempQuestion: Question = Question.mapperToQuestion(doc.data())
                        tempQuestion.id = doc.id
                        listQuestions.push(tempQuestion)
                    })
                    resolve(listQuestions)
                }).catch(error => {
                    this.printError(error)
                    reject(error)
                })
        })
    }


    public async getQuestionOfCourseByQuestion(courseId: string, question: string): Promise<Question> {
        return new Promise((resolve, reject) => {
            db.collection(courseCollection).doc(courseId).collection("questions").where("question", '==', question).limit(1).get()
                .then(snapshot => {
                    if (snapshot.empty) {
                        this.printEmpty(`Question :${question}`)
                    }
                    let tempQuestion: Question
                    snapshot.forEach(doc => {
                        tempQuestion = Question.mapperToQuestion(doc.data())
                        tempQuestion.id = doc.id
                    })
                    resolve(tempQuestion)
                }).catch(error => {
                    this.printError(error)
                    reject(error)
                })
        })
    }

    public async getQuestionOfCourseByidQuestion(courseId: string, idQuestion: string): Promise<Question> {
        return new Promise((resolve, reject) => {
            db.collection(courseCollection).doc(courseId).collection("questions").doc(idQuestion).get()
                .then(doc => {
                    if (!doc.exists) {
                        this.printEmpty(`Question :${idQuestion}`)
                    }
                    let tempQuestion: Question = Question.mapperToQuestion(doc.data())
                    tempQuestion.id = doc.id
                    resolve(tempQuestion)
                }).catch(error => {
                    this.printError(error)
                    reject(error)
                })
        })
    }


    public async createQuestionToCourse(courseId: string, question: Question): Promise<Message> {
        return new Promise((resolve, reject) => {
            let refDoc: FirebaseFirestore.DocumentReference = db.collection(courseCollection).doc(courseId)
            refDoc.update({ topics: admin.firestore.FieldValue.arrayUnion(question.topic) })
            refDoc.collection("questions").add(question.getJSON())
                .then(ref => {
                    this.sendResponse(ref.id, true, resolve)
                }).catch(error => {
                    this.printError(error)
                    this.sendResponse(null, false, resolve)
                })
        })
    }

    public async uptadeQuestionToCourse(courseId: string, questionId: string, question: Question): Promise<Message> {
        return new Promise((resolve, reject) => {
            db.collection(courseCollection).doc(courseId)
                .collection("questions").doc(questionId).update(question.getJSON())
                .then(ref => {
                    this.sendResponse(null, true, resolve)
                }).catch(error => {
                    this.printError(error)
                    this.sendResponse(null, false, resolve)
                })
        })
    }

    public async deleteQuestionToCourse(courseId: string, questionId: string): Promise<Message> {
        return new Promise(async (resolve, reject) => {
            db.collection(courseCollection).doc(courseId).collection("questions").doc(questionId).get()
                .then(doc => {
                    let question: Question = Question.mapperToQuestion(doc.data())
                    db.collection(courseCollection).doc(courseId).collection("questions").doc(questionId).delete()
                        .then(ref => {
                            db.collection(courseCollection).doc(courseId).collection("questions").where("topic", '==', question.topic).get()
                                .then(snapshot => {
                                    if (snapshot.empty) {
                                        db.collection(courseCollection).doc(courseId).update({
                                            topics: admin.firestore.FieldValue.arrayRemove(question.topic)
                                        })
                                    }
                                    this.sendResponse(null, true, resolve)
                                })
                        }).catch(error => {
                            this.printError(error)
                            this.sendResponse(null, false, resolve)
                        })
                }).catch(error => {
                    this.printError(error)
                    this.sendResponse(null, false, resolve)
                })


        })
    }


    public async createFiveQuestions(courseId: string, topic: string, pinId: string): Promise<Message> {
        return new Promise((resolve, reject) => {
            let listQuestions: Question[] = []
            let listFiveQuestions: Question[] = []
            db.collection(courseCollection).doc(courseId)
                .collection("questions").where('topic', '==', topic)
                .get()
                .then(snapshot => {
                    if (snapshot.empty) {
                        this.printEmpty(`Questions of topic :${topic}`)
                        return;
                    }
                    snapshot.forEach(doc => {
                        let tempQuestion: Question = Question.mapperToQuestion(doc.data())
                        tempQuestion.id = doc.id
                        listQuestions.push(tempQuestion)
                    })
                    //console.log(listQuestions);


                    let arr: number[] = this.generateFiveRandomsNumbers(listQuestions.length)
                    console.log(arr);

                    for (let num of arr) {
                        listFiveQuestions.push(listQuestions[num])
                    }
                    console.log(listFiveQuestions);

                    let refPIN: FirebaseFirestore.CollectionReference = db.collection(PINCollection).doc(pinId).collection("questions")


                    for (let question of listFiveQuestions) {
                        refPIN.doc(question.id).set(question.getJSON())
                    }

                    let refDoc: FirebaseFirestore.DocumentReference = db.collection(PINCollection).doc(pinId)

                    let dataTemp = {
                        course : courseId,
                        isActive: true,
                        started: false
                    }

                    refDoc.set(dataTemp)

                    this.sendResponse(pinId, true, resolve)
                }).catch(error => {
                    this.printError(error)
                    this.sendResponse(null, false, resolve)
                })

        })
    }



    private generateFiveRandomsNumbers(lenOfArray: number): number[] {
        let arr = []
        while (arr.length < 5 && arr.length != lenOfArray) {
            var r = Math.floor(Math.random() * lenOfArray);
            if (arr.indexOf(r) === -1) arr.push(r);
        }
        return arr
    }

    private printError(error: any) {
        console.log(error);
    }

    private printEmpty(colecion: string) {
        console.log(`No hay documentos en ${colecion}`);
    }

    private sendResponse(ref: string | null, status: boolean, resolve: (value?: Message | PromiseLike<Message>) => void) {
        let message: Message = new Message()
        if (ref != null) {
            message.reference = ref
        }
        message.status = status
        resolve(message)
    }
}