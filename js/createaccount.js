import { Data1 } from "../DataLayer.js";
// let signup = document.getElementById('signup');
// signup.onclick = (() => {
//     let user = document.getElementById('username').value;
//     let pass = document.getElementById('password').value;
//     let repass = document.getElementById('repassword').value;
//     if (pass == repass) {
//         if (Data1.usernameValid(user)) {
//             if (!Data1.checkUserExist(user)) {
//                 alert("succesful");
//                 Data1.persons.set(user, pass)   // <--It is working now
//                 console.log(Data1.persons);
//                 // open page
//             } else {
//                 alert("Username already Taken.");
//             }
//         }
//         else {
//             alert('Username is not valid. There must be no spaces.')
//         }
//     }
//     else {
//         alert('Password does not match.')
//     }
// })
let showpassword = document.getElementById("showpassword");
showpassword.onclick = () => {
	if (document.getElementById("password").type == "text") {
		document.getElementById("password").type = "password";
		document.getElementById("repassword").type = "password";
		showpassword.src = "../Pngs/closedeye.png";

		return;
	}
	document.getElementById("password").type = "text";
	showpassword.src = "../Pngs/openeye.png";
	document.getElementById("repassword").type = "text";
};

//<--------------------------------Bachy is code se door rahy--------------------------------------->

//<------------------------------------Linking With DataBase---------------------------------------->

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-analytics.js";

const firebaseConfig = {
	apiKey: "AIzaSyDgjxC3pegDxwodMo_tBF6og-5NAtccu_U",
	authDomain: "justteatingfirebase.firebaseapp.com",
	databaseURL: "https://justteatingfirebase-default-rtdb.firebaseio.com",
	projectId: "justteatingfirebase",
	storageBucket: "justteatingfirebase.appspot.com",
	messagingSenderId: "1055889204987",
	appId: "1:1055889204987:web:33450c37ba9cf8d798b25e",
	measurementId: "G-LQLCQBVPS3",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

import {
	getDatabase,
	get,
	set,
	ref,
	child,
	update,
	remove,
} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";
const db = getDatabase();

let signup = document.getElementById("signup");
signup.addEventListener("click", insertData);
function insertData() {
	let user = document.getElementById("username").value;
	const dbref = ref(db);
	let flag = true;
	get(child(dbref, "Usernames/" + user)).then((snapshot) => {
		if (!snapshot.exists()) {
			flag = false;
		}
	});
	let pass = document.getElementById("password").value;
	let repass = document.getElementById("repassword").value;
	setTimeout(() => {
		if (pass == repass) {
			if (Data1.usernameValid(user)) {
				if (flag) {
					alert("Username already Taken.");
				} else {
					set(ref(db, "Usernames/" + username.value), {
						username: username.value,
						password: password.value,
					})
						.then(() => {
							alert("Data stored suxxessfully");
						})
						.catch((error) => {
							alert("Error: " + error);
						});
						
						set(ref(db, "loggedInuser/" ), {
							username: username.value,
							password:password.value,
						
						})
							.then(() => {
								alert("Data stored suxxessfully");
							})
							.catch((error) => {
								alert("Error: " + error);
							});
						// open page
						setTimeout(() => {
							location.href = "../Pages/User-info.html";
						}, 1000);
				}
			} else {
				alert(
					"Enter a Valid Username containing atleast 5 cahracters and With No Spaces."
				);
			}
		} else {
			alert("Password does not match.");
		}
	}, 1000);
}

// <-------------------------------------------Linking Ends Here------------------------------------------>
