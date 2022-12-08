import { Data1 } from './DataLayer.js'
let v = document.getElementById('signinbtn');
v.onclick = (() => {
    let user = document.getElementById('username').value;
    let pass = document.getElementById('password').value;
    // let D = new Data1();
    if (Data1.checkUser(user, pass)) {
        // open page
        alert('user found')
    }
    else {
        document.getElementById('username').value = '';
        document.getElementById('password').value = '';
        alert('No such User')
    }
})
