export class Data1 {
    persons = {}
    posts = {}
    checkUser(name, pass) {
        if (name == "1" && pass == "1")
            return true;
    }
    checkUserExist(name)
    {
        // for (let [key, value] of this.persons.entries()) {
        //     if(value.name == name)
        //     {
        //         return true;
        //     }
        // }
        // return false;
    }
}
