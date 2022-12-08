export class Data1 {
    static persons = {}
    static posts = {}
    static checkUser(name, pass) {
        if (name == "1" && pass == "1")
            return true;
    }
    static checkUserExist(name) {
        if (name in this.persons) {
            return true;
        }
        return false;
    }
}
