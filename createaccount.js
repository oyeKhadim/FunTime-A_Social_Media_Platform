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
                            Data1.persons.set(user,pass) // <--It is working now
							// var per = new person();
							// per.password = pass;
							// per.username = user;
                            // Data1.arr=[2,4]
                            // console.log(Data1.arr);
							// Data1.persons[user] = pass; // Adds it to the map          //Make sure this is working and if it is not working make it happen
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
