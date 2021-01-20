"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
class User {
    constructor() {
    }
    getJSON() {
        let userJson = {};
        for (let propertie in this) {
            userJson[propertie] = this[propertie];
        }
        return userJson;
    }
}
exports.User = User;
