import { User } from "./User"

export class Student extends User {

    profileImage: string
    career: string
    credits: number
    cycle: string
    victoriesSingle: number
    victoriesTournament: number
    victoriesFreeForAll: number

    getJSON() {
        let userJson: any = {}
        for(let propertie in this){
            userJson[propertie] = this[propertie]
        }
        return userJson;
    }


    static mapperToStudent(docStudent: FirebaseFirestore.DocumentData): Student {
        let temp = new Student()
        for( let propertie in docStudent){
            temp[propertie] = docStudent[propertie]
        }
        return temp
    }
}