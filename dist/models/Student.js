"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Student = void 0;
const User_1 = require("./User");
class Student extends User_1.User {
    getJSON() {
        let userJson = {};
        for (let propertie in this) {
            userJson[propertie] = this[propertie];
        }
        return userJson;
    }
    static mapperToStudent(docStudent) {
        let temp = new Student();
        for (let propertie in docStudent) {
            temp[propertie] = docStudent[propertie];
        }
        return temp;
    }
}
exports.Student = Student;
