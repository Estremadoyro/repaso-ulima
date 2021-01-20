export class Question {
    id: string
    question: string
    options: string[]
    answer: string
    topic: string

    getJSON() {
        let questionJson: any = {}
        for (let propertie in this) {
            questionJson[propertie] = this[propertie]
        }
        return questionJson
    }

    static mapperToQuestion(docQuestion: FirebaseFirestore.DocumentData): Question {
        let temp = new Question()
        for (let propertie in docQuestion) {
            temp[propertie] = docQuestion[propertie]
        }
        return temp
    }
}