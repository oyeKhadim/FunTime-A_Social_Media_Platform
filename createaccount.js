import { Data1 } from './DataLayer.js'

let signup = document.getElementById('signup');
signup.onclick = (() => {
    let user = document.getElementById('username').value;
    let pass = document.getElementById('password').value;
    let repass = document.getElementById('repassword').value;
    if (pass === repass) {
        let D = new Data1();
        if (!D.checkUserExist(user)) {
            // open page
            alert('user not exist')
        }
        else {
            alert('User already Exists')
        }
    }
    else {
        alert('Password does not match.')
    }
})
