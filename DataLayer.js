export class Data1 {
    static persons = {}
    static posts = {}
    static checkUser(name, pass) {
        if (name == "1" && pass == "1")
            return true;
    }
    static checkUserExist(name) {
        for(let key in this.persons)
        {
            if(this.persons[key]==name)
            {
                return true;
            }
        }
        return false;
    }
    static usernameValid(str) {
        return !str.includes(' ');
    }
}
