let username = "123",
	fullName,
	imgurl;
let checkDataLoaded = false;
window.onload = () => {
	const dbref = ref(db);
	get(child(dbref, "loggedInuser/")).then((snapshot) => {
		if (snapshot.exists()) {
			username = snapshot.val().username;
			console.log(username + "1");
		}
	});
	setTimeout(() => {
		console.log(username + "2");
		SelectData();
	}, 2000);
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

function loadLoggedInUser() {
	const dbref = ref(db);

	get(child(dbref, "loggedInuser/")).then((snapshot) => {
		if (snapshot.exists()) {
			username = snapshot.val().username;
		}
	});
}

function SelectData() {
	console.log("1");
	const dbref = ref(db);
	get(child(dbref, "Usernames/" + username)).then((snapshot) => {
		console.log("12");
		console.log(username + "5");
		if (snapshot.exists()) {
			imgurl = snapshot.val().imgurl;
			document.getElementById("profile_pic").src = imgurl;
			console.log(imgurl);
		}
	});
}

// <-------------------------------------------Linking Ends Here------------------------------------------>
