import { Data1 } from './DataLayer.js'
Data1.persons['2']=2;
let signup = document.getElementById('signup');
signup.onclick = (() => {
    let user = document.getElementById('username').value;
    let pass = document.getElementById('password').value;
    let repass = document.getElementById('repassword').value;
    if (pass == repass) {
        if (!Data1.checkUserExist(user)) {
            // open page
            alert('succesful')
            // D.persons[user]=pass;
        }
        else {
            alert('User already Exists')
        }
    }
    else {
        alert('Password does not match.')
    }
})
