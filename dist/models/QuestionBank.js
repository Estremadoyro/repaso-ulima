"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuestionBank = void 0;
class QuestionBank {
    getJSON() {
        let questionBankJson = {};
        for (let propertie in this) {
            questionBankJson[propertie] = this[propertie];
        }
        return questionBankJson;
    }
    static mapperToQuestionBank(docQBank) {
        let temp = new QuestionBank();
        for (let propertie in docQBank) {
            temp[propertie] = docQBank[propertie];
        }
        return temp;
    }
}
exports.QuestionBank = QuestionBank;
