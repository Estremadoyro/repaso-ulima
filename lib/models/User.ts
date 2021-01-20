import { Course } from "./Course"
export class User {

    id: string
    name: string
    email: string
    courses: Course[] | null 

    constructor() {
    }

    getJSON() {
        let userJson : any = {}
        for(let propertie in this){
            userJson[propertie] = this[propertie]
        }
        return userJson
    }
}