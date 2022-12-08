import { person } from './personClass.js'
export class Data1 {
    static persons = {}
    static posts = {}
    static checkUser(name, pass) {
        console.log(this.persons[name])
        for (var key in this.persons) {
            console.log(key + " : " + this.persons[key]);
        }

        //There is error in this code to check if the person is present or not

        // if (this.persons[name] != undefined) {
        //     if (this.persons[name].password == pass) {
        //         return true;
        //     }
        // }
        return false;
    }
    static checkUserExist(name) {
        if (this.persons[name] == undefined) {
            return false;
        }
        return true;
    }
    static usernameValid(str) {
        return !str.includes(' ');
    }
}
