const MAX_WIDTH = 320;
const MAX_HEIGHT = 180;
const MIME_TYPE = "image/jpeg";
const QUALITY = 0.7;
let imgurl;

const input = document.getElementById("img-input");
input.onchange = function (ev) {
	const file = ev.target.files[0]; // get the file
	const blobURL = URL.createObjectURL(file);
	const img = new Image();
	img.src = blobURL;
	img.onerror = function () {
		URL.revokeObjectURL(this.src);
		// Handle the failure properly
		console.log("Cannot load image");
	};
	img.onload = function () {
		URL.revokeObjectURL(this.src);
		const [newWidth, newHeight] = calculateSize(img, MAX_WIDTH, MAX_HEIGHT);
		const canvas = document.createElement("canvas");
		canvas.width = newWidth;
		canvas.height = newHeight;
		const ctx = canvas.getContext("2d");
		ctx.drawImage(img, 0, 0, newWidth, newHeight);
		canvas.toBlob(
			(blob) => {
				// Handle the compressed image. es. upload or save in local state
				//console.log(blob);
				imageUploaded(blob);
				displayInfo("Original file", file);
				displayInfo("Compressed file", blob);
			},
			MIME_TYPE,
			QUALITY
		);
		document.getElementById("root").append(canvas);
	};
};

function calculateSize(img, maxWidth, maxHeight) {
	let width = img.width;
	let height = img.height;

	// calculate the width and height, constraining the proportions
	if (width > height) {
		if (width > maxWidth) {
			height = Math.round((height * maxWidth) / width);
			width = maxWidth;
		}
	} else {
		if (height > maxHeight) {
			width = Math.round((width * maxHeight) / height);
			height = maxHeight;
		}
	}
	return [width, height];
}

// Utility functions for demo purpose

function displayInfo(label, file) {
	const p = document.createElement("p");
	p.innerText = `${label} - ${readableBytes(file.size)}`;

	document.getElementById("root").append(p);
}

function readableBytes(bytes) {
	const i = Math.floor(Math.log(bytes) / Math.log(1024)),
		sizes = ["B", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

	return (bytes / Math.pow(1024, i)).toFixed(2) + " " + sizes[i];
}
let base64String = "";

function imageUploaded(myfile) {
	var file = myfile;

	var reader = new FileReader();
	console.log("next");

	reader.onload = function () {
		base64String = reader.result.replace("data:", "").replace(/^.+,/, "");

		imgurl = "data:image/png;base64," + base64String;
	};
	reader.readAsDataURL(file);
}


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
	let password = "invalid";
	get(child(dbref, "loggedInuser/")).then((snapshot) => {
		if (snapshot.exists()) {
			username = snapshot.val().username;
			password = snapshot.val().password;
			console.log(username);
		}
	});
	setTimeout(() => {
		let name = document.getElementById("name").value;
		let email = document.getElementById("email").value;
		let bio = document.getElementById("bio").value;
		console.log(imgurl)
		set(ref(db, "Usernames/" + username), {
			username: username,
			password: password,
			fullName: name,
			email: email,
			bio: bio,
			imgurl: imgurl,
			addFriendPrivacy: false,
			showFriendPrivacy: false,
			isVerified: false,
		})
			.then(() => {
				alert("Details stored suxxessfully");
			})
			.catch((error) => {
				alert("Error: " + error);
			});
		setTimeout(() => {
			location.href = "main-page.html";
		}, 1000);
	}, 2000);
}

// <-------------------------------------------Linking Ends Here------------------------------------------>
