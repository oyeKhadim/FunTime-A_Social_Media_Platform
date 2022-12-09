import { Data1 } from './DataLayer.js'
import { person } from './personClass.js'
let signup = document.getElementById('signup');
signup.onclick = (() => {
    let user = document.getElementById('username').value;
    let pass = document.getElementById('password').value;
    let repass = document.getElementById('repassword').value;
    if (pass == repass) {
        if (Data1.usernameValid(user)) {
            if (!Data1.checkUserExist(user)) {
                alert("succesful");
                Data1.persons.set(user, pass)   // <--It is working now
                console.log(Data1.persons);
                // open page
            } else {
                alert("Username already Taken.");
            }
        }
        else {
            alert('Username is not valid. There must be no spaces.')
        }
    }
    else {
        alert('Password does not match.')
    }
})
let showpassword = document.getElementById("showpassword")
let showpass = document.getElementById("showrepassword")
showpassword.onclick = () => {
    if (document.getElementById("password").type == 'text') {
        document.getElementById("password").type = "password";
        document.getElementById("repassword").type = "password";
        showpassword.src = "./closedeye.png";
        showpass.src = "./closedeye.png";

        return;
    }
    document.getElementById("password").type = "text";
    showpassword.src = "./openeye.png";
    document.getElementById("repassword").type = "text";
    showpass.src = "./openeye.png";

}
