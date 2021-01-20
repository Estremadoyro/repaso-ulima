export class Course {
    id: string
    name: string
    career: string
    credits: number
    topics: string[] | null

    getJSON() {
        let courseJson: any = {}
        for (let propertie in this) {
            courseJson[propertie] = this[propertie]
        }
        return courseJson
    }

    static mapperToCourse(docCourse: FirebaseFirestore.DocumentData): Course {
        let temp = new Course()
        for (let propertie in docCourse) {
            temp[propertie] = docCourse[propertie]
        }
        return temp
    }
}