import { Data1 } from './DataLayer.js'
let v = document.getElementById('signinbtn');
v.onclick = (() => {
    let user = document.getElementById('username').value;
    let pass = document.getElementById('password').value;
    if (Data1.checkUser(user, pass)) {
        alert('user found')
        // open page
    }
    else {
        document.getElementById('username').value = '';
        document.getElementById('password').value = '';
        alert('No such User')

        console.log(Data1.arr);
        
    }
})
