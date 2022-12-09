import { person } from './personClass.js'
export class Data1 {
    static persons = new Map()
    static posts = new Map()
    static arr=[];//just checking  --> it is working before switching pages
    static LoadData(){

        //Following code is not working
        // const fs = require("fs");

		// 		fs.writeFile("sample.txt", "Writing content", (err) => {
		// 			if (err) throw err;
		// 			console.log("Completed!");
		// 		});
    }
    static checkUser(name, pass) {
        //Entering some data in map to check
        this.persons
					.set("a", "132")
					.set("website", "geeksforgeeks")
					.set("friend 1", "gourav")
					.set("friend 2", "sourav");
        //console.log(this.persons.get("a"))
        //this looop is working 
        // var get_entries = this.persons.entries()
        // for (var ele of get_entries){
        //     if(name==ele[0]&&pass==ele[1]){
        //         return true;
        //     }
        // }
        if(this.persons.get(name)==pass){
            return true;
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
        if (this.persons.get(name) == undefined) {
            return false;
        }
        return true;
    }
    static usernameValid(str) {
        return !str.includes(' ');
    }
}
