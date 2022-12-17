let showpassword = document.getElementById("showpassword");
showpassword.onclick = () => {
	if (document.getElementById("password").type == "text") {
		document.getElementById("password").type = "password";
		showpassword.src = "../Pngs/closedeye.png";
		return;
	}
	document.getElementById("password").type = "text";
	showpassword.src = "../Pngs/openeye.png";
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
	query,
	onValue,
	orderByKey,
	orderByChild,
} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";
const db = getDatabase();

var username = document.getElementById("username");
var password = document.getElementById("password");


function SelectData() {
	const dbref = ref(db);

	// setTimeout(()=>{},1000)
	get(child(dbref, "Usernames/" + username.value)).then((snapshot) => {
		if (snapshot.exists()) {
			if(username.value == snapshot.val().username&&
			password.value == snapshot.val().password){
				set(ref(db, "loggedInuser/"), {
					username: username.value,
					password: password.value,
				
				})
					.then(() => {
						alert("Loggend in user Data stored suxxessfully");
						location.href="../pages/main-page.html"
					})
					.catch((error) => {
						alert("Error: " + error);
					});
                alert('Valid User');
            }
            else{
                alert('wrong password');
            }
		} else {
			alert("No Data Found");
		}
	});
	
    
}
function checking() {
	const dbref = ref(db);
	const khadim=child(dbref,'Usernames');
	//update just one entry
	// let count=""
	// get(khadim).then((snapshot)=>{
	// 	count=snapshot.val().postCount;
	// 	count += "123";
	// })
	// setTimeout(()=>{
	// 	update(khadim,{postCount:count})

	// },1000)
	

	//loop
	// once(khadim,snap=>{
	// 	snap.forEach(eventSnap => {
	// 		console.log(eventSnap);
	// 	});
	// })
// 	const mostViewedPosts = query(
// 		ref(db, "PostCount"),
// 		orderByChild("PostCount")
// 	);
// console.log(mostViewedPosts)


// Retrive Posts
// const Posts = ref(db, "Posts/");
// onValue(Posts, (snapshot) => {
// 	const data = snapshot.val();
// 	let post = [];
// 	Object.keys(data).forEach((key) => {
// 		post.push({
// 			name: key,
// 			data: data[key],
// 		});
// 	});

// 	post.forEach((element) => {
// 		console.log(element.data);
// 	});
// });



}
var signinbtn = document.getElementById("signinbtn");
signinbtn.addEventListener("click", SelectData);
// signinbtn.addEventListener('click',checking);


// <-------------------------------------------Linking Ends Here------------------------------------------>