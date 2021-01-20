"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Teacher = void 0;
const User_1 = require("./User");
class Teacher extends User_1.User {
    getJSON() {
        let teacherJson = {};
        for (let propertie in this) {
            teacherJson[propertie] = this[propertie];
        }
        return teacherJson;
    }
    static mapperToTeacher(docTeacher) {
        let temp = new Teacher();
        for (let propertie in docTeacher) {
            temp[propertie] = docTeacher[propertie];
        }
        return temp;
    }
}
exports.Teacher = Teacher;
