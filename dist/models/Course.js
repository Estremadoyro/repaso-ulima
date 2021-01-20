"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Course = void 0;
class Course {
    getJSON() {
        let courseJson = {};
        for (let propertie in this) {
            courseJson[propertie] = this[propertie];
        }
        return courseJson;
    }
    static mapperToCourse(docCourse) {
        let temp = new Course();
        for (let propertie in docCourse) {
            temp[propertie] = docCourse[propertie];
        }
        return temp;
    }
}
exports.Course = Course;
