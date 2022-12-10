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

let addDetail = document.getElementById("detail_enterd");
addDetail.addEventListener("click", insertDetails);
function insertDetails() {
	const dbref = ref(db);
	let username = "123";
	get(child(dbref, "loggedInuser/")).then((snapshot) => {
		if (snapshot.exists()) {
			username = snapshot.val().username;
			console.log(username);
		}
	});
	setTimeout(() => {
		let name = document.getElementById("name").value;
		let email = document.getElementById("email").value;
		let bio = document.getElementById("bio").value;
		let imgurl = document.getElementById("imgurl").value;
		set(ref(db, "Usernames/" + username), {
			fullName: name,
			email: email,
			bio: bio,
			imgurl: imgurl,
			addFriendPrivacy: false,
			showFriendPrivacy: false,
			isVerified: false,
		})
			.then(() => {
				alert("Data stored suxxessfully");
			})
			.catch((error) => {
				alert("Error: " + error);
			});
		setTimeout(() => {
			location.href = "main-page.html";
		}, 1000);
	}, 1000);
}

// <-------------------------------------------Linking Ends Here------------------------------------------>
