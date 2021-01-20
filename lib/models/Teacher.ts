import { User } from "./User";

export class Teacher extends User {

    listCourses : string[]
    getJSON() {
        let teacherJson: any = {}
        for(let propertie in this){
            teacherJson[propertie] = this[propertie]
        }
        return teacherJson;
    }

    static mapperToTeacher(docTeacher: FirebaseFirestore.DocumentData): Teacher {
        let temp = new Teacher()
        for( let propertie in docTeacher){
            temp[propertie] = docTeacher[propertie]
        }
        return temp
    }

}