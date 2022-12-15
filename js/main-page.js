let username = "123",
	postCount = 0,
	fullName,
	imgurl;
let checkDataLoaded = false;
//---------------------------------------Post picture Compressing----------------------------------------
const MAX_WIDTH = 320;
const MAX_HEIGHT = 180;
const MIME_TYPE = "image/jpeg";
const QUALITY = 0.7;
let post_imgurl;

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

		post_imgurl = "data:image/png;base64," + base64String;
	};
	reader.readAsDataURL(file);
}

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
		get(child(dbref, "PostCount/" + username)).then((snapshot) => {
			if (snapshot.exists()) {
				postCount = snapshot.val().postCount;
				console.log("post count : " + postCount);
			}
		});
		SelectData();
	}, 2000);
	addPosts();
};

let createPost_btn = document.getElementById("createPost_btn");
// createPost_btn.addEventListener('click',show_newpost_popup())
let cancle_btn = document.getElementById("cancle_btn");
// cancle_btn.addEventListener('click',show_newpost_popup())
createPost_btn.onclick = () => {
	show_newpost_popup();
};
cancle_btn.onclick = () => {
	show_newpost_popup();
};
function show_newpost_popup() {
	let btn = document.getElementById("new-post-popup");
	btn.classList.toggle("show-newpost-popup");
}

let btn = document.getElementById("post_btn");
btn.onclick = () => {
	storePostInDataBase();
	show_newpost_popup();
};
let loadPost_btn = document.getElementById("load_posts");
loadPost_btn.onclick = () => {
	addPosts();
};

//		Adding it to insert friend on btn click

let viewFriends = document.getElementById("view_friends");
viewFriends.onclick = () => {
	let extraFeatures = document.getElementById('extra-features');
	extraFeatures.innerHTML = `<h4 id="extra_header">Friend List</h4>`;
	let i = 0;
	for (i = 0; i < 10; i++) {
		ShowFriendCard();
	}

}
function ShowFriendCard() {
	let extraFeatures = document.getElementById('extra-features');
	extraFeatures.innerHTML += `<div id="person_card">
	<a href="#" class="no-link">
		<div id="view-profile" >
			<img id="profile_pic" class="profile_pic"
				src="https://uxwing.com/wp-content/themes/uxwing/download/peoples-avatars/no-profile-picture-icon.png"
				alt="">
			<h6 style="text-align: center;">Person Name</h6>
		</div>
	</a>
</div>`;
}

//		Friends Requests

let requests=document.getElementById('friend-requests');
requests.onclick=()=>{
	let extraFeatures = document.getElementById('extra-features');
	extraFeatures.innerHTML = `<h4 id="extra_header">Friends Requests</h4>`;
	let i = 0;
	for (i = 0; i < 10; i++) {
		ShowPersonCard();
	}
}
function ShowPersonCard() {
	let extraFeatures = document.getElementById('extra-features');
	extraFeatures.innerHTML += `<div id="person_card">
	<a href="#" class="no-link">
		<div id="view-profile">
			<img id="profile_pic" class="profile_pic"
				src="https://uxwing.com/wp-content/themes/uxwing/download/peoples-avatars/no-profile-picture-icon.png"
				alt="">
			<h6 style="text-align: center;">Person Name</h6>
		</div>
	</a>
	<div id="add_friend" class="flex-row">
		<div id="acceptRequest" class="setting-card" style="width: 50%;">Accept</div>
		<div id="declineRequest"  style="width: 50%">Reject</div>
		
	</div>
</div>`;
}


//	notification

let notiBtn = document.getElementById('notification_btn');
notiBtn.onclick = () => {
	let extraFeatures = document.getElementById('extra-features');
	extraFeatures.innerHTML = `<h4 id="extra_header">Notifications</h4>`;
	extraFeatures.innerHTML += `<div id="notification">
                <div id="notification-img">
				<img src="/Pngs/pic.jpg" alt="">
			</div>
			<div id="text-content">
				Ali liked your photo.
			</div>
		</div > `;
}

//	/	/	/	/	/	/	/	/	/	/	/	/

function insertpost(dp, name, date, img, text, likes, dislikes, comments) {
	let train = `<div class="post" >
        <div class="post-details">
            <img src=${dp} class="profile_pic"
                alt="">
            <div class="name-time">
                <h4>${name}</h4>
                <p>${date}</p>
            </div>
        </div>
        <div class="post-data">
            <p>${text}</p>
            <img src=${img}
                alt="">

        </div>
        <div class="reaction-section">
            <div class="reaction-section-details">
                <p>${likes} Likes</p>
                <p>${dislikes} Dislikes</p>
                <p style="margin-left: auto;">${comments} Comments</p>
            </div>

            <div class="reaction-option">
                <div class="love-reaction">
                    <img src="/Pngs/heart-unlike.png" alt="">
                    <p>Love</p>
                </div>
                <div class="comment-section">
                    <img src="/Pngs/commentpng.png" alt="">
                    <p>Comments</p>
                </div>
            </div>
        </div>
    </ > `;
	document.getElementById("posts_section").innerHTML += train;
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
			document.getElementById("profile_pic_createPost").src = imgurl;

			console.log(imgurl);
		}
	});
}
function storePostInDataBase() {
	let text = document.getElementById("caption-area");
	let author = username;
	let likes = 0;
	let dislikes = 0;
	let comments = "";
	let date = new Date();
	set(ref(db, "Posts/" + author + postCount), {
		text: text.value,
		imgurl: post_imgurl,
		author: author,
		likes: likes,
		dislikes: dislikes,
		comments: comments,
	})
		.then(() => {
			alert("Data stored suxxessfully");
		})
		.catch((error) => {
			alert("Error: " + error);
		});
	postCount = postCount + 1;
	updatevalues();
	text.value = "";
}
function updatevalues() {
	set(ref(db, "PostCount/" + username), {
		postCount: postCount,
	})
		.then(() => {
			alert("Data stored suxxessfully");
		})
		.catch((error) => {
			alert("Error: " + error);
		});
}
function addPosts() {
	let postauthorImgUrl =
		"https://lh3.googleusercontent.com/hELpn1DhzoxKewQkTgpKL6DCMH00fBaOn0cdgDHOyWLv1DLR5s-WsJg-YTtt8S1zh7oYhv2Bv8zrrpIvYoIjZB34YLa6_9iut71yCtDhSUCkJLKVE4ZiOKITlhWVADRtBU5wwoE7Q4s55Yal03WvzY_EsQrgBs1HNmaeyKNBKAC5UcsL__IPx9Undnpf--fEEbiyzRbhEhbZcQe9cCgEAsK4DXteYfGdQvhNwO0kiQxDVtUEZq3kjn79WG9gI9mr-tOVyiipG3WovA6FrdykOo0kyB-Kxm5xtu6We3z3ZCRkfOhitJ7MG7yydBOStYYeUZdsPPvIiPTs_XcuXbgAomzVPhKE4lLWiONmtOtcfqFj5HitkCvoW7tEPxKyAidU5rnUYqql8McV_kMV-kljyEEaDpMI54nbWGp3SQ0tVJAsfzzobA47Q1BsDXSjxgV7KtnycD_uIE1KQ2nvFMyVI_lcZkKQPejNbils7MyiL412E3S6pUm6dkwqUQ9f9qgki5HDx4uBU05jn6H8d7xxvwyQBLbdiaMVr5DvyknkiAejPKU0sJdM3upl5nq7K9s7Bbip1LiLsVAnMDhzKUKdC0enQ7021sjA_lwOeFEYPmU7oQmCUphl673RI_ba-vsp8iwgw3suUDx-tLpOmA6vI931Ha2Qt7LDXZEYllTfYbXXQmfYSxjFs4PUZtwwm2NHVNNmQAEjI-BXNjbS6qhEXDnvBIw-sMbMmNGK8R8977xJp6jgp_MrTwjBR0O4czlYSRUKfEpRiKpudNYaV9p8tw3_08-fyloZavVV4MrZk1HqEIpM6rDwXC4duAmEvU7KFMEZwHdEKE_rmtwd2AGpiLwW8HQ-m1bjZ8nFfi23d6AZWNsT2bvlYVOZucvIYLYs8lYHf5Ea5DbKbPPpdlAXEqR3qVBl2ORFOJ7TxKuxCKlc=w207-h276-no?authuser=0",
		postImgurl =
			"https://thumbs.dreamstime.com/b/fun-time-concept-toy-objects-child-education-yellow-background-142226373.jpg",
		authorName = "Khadim Hussain",
		date = "06:37 AM , 2 Dec",
		text = "How is it Looking...",
		noOfLikes = 5,
		noOfDislikes = 1,
		noOfComments = 3;
	for (let i = 0; i < 5; i++) {
		insertpost(
			postauthorImgUrl,
			authorName,
			date, //"06:37 AM , 2 Dec",
			postImgurl,

			text, //"Coming Soon...",
			noOfLikes, //37,
			noOfDislikes, //2,
			noOfComments //58
		);
	}
}
// <-------------------------------------------Linking Ends Here------------------------------------------>
