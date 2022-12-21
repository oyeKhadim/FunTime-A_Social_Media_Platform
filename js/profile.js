let imgurl,fullName, username, email, bio;
window.onload = () => {
	loadData();
	fillData();
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
	onValue,
} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";
const db = getDatabase();
async function loadData() {
	let userRef = ref(db, "loggedInuser/");
	await new Promise((resolve) => {
		onValue(userRef, (snapshot) => {
			username = snapshot.val().username;
			resolve();
		});
	});
	userRef = ref(db, "Usernames/" + username);
	await new Promise((resolve) => {
		onValue(userRef, (snapshot) => {
			fullName = snapshot.val().fullName;
			imgurl = snapshot.val().imgurl;
			email = snapshot.val().email;
			bio = snapshot.val().bio;
			resolve();
		});
	});
    console.log(fullName)
	document.getElementById("profile_pic").src = imgurl;
	document.getElementById("fullName").textContent=fullName;
	document.getElementById("username").textContent=username;
	document.getElementById("email").textContent=email;
	document.getElementById("bio").textContent=bio;
}
function fillData() {}
