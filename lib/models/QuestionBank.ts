import { Question } from "./Question"

export class QuestionBank {
    id: string
    idCourse: string
    thematicName: string
    questions: Question[]


    getJSON() {
        let questionBankJson: any = {}
        for (let propertie in this) {
            questionBankJson[propertie] = this[propertie]
        }
        return questionBankJson
    }

    static mapperToQuestionBank(docQBank: FirebaseFirestore.DocumentData): QuestionBank {
        let temp = new QuestionBank()
        for (let propertie in docQBank) {
            temp[propertie] = docQBank[propertie]
        }
        return temp
    }
}