"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Question = void 0;
class Question {
    getJSON() {
        let questionJson = {};
        for (let propertie in this) {
            questionJson[propertie] = this[propertie];
        }
        return questionJson;
    }
    static mapperToQuestion(docQuestion) {
        let temp = new Question();
        for (let propertie in docQuestion) {
            temp[propertie] = docQuestion[propertie];
        }
        return temp;
    }
}
exports.Question = Question;
