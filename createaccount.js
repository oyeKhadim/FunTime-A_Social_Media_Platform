import { Data1 } from './DataLayer.js'
let signup = document.getElementById('signup');
signup.onclick = (() => {
    let user = document.getElementById('username').value;
    let pass = document.getElementById('password').value;
    let repass = document.getElementById('repassword').value;
    if (pass == repass) {
        if (Data1.usernameValid(user)) {
            if (!Data1.checkUserExist(user)) {
                alert('succesful')
                Data1.persons[user] = pass;           // Adds it to the map
                // open page
            }
            else {
                alert('Username already Taken.')
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
