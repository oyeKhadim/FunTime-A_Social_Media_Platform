let username = "123",
	postCount = 0,
	fullName,
	imgurl;
let checkDataLoaded = false;
//---------------------------------------Post picture Compressing----------------------------------------
const MAX_WIDTH = 1280;
const MAX_HEIGHT = 720;
const MIME_TYPE = "image/jpeg";
const QUALITY = 0.7;
let post_imgurl;
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

function SelectData() {
	console.log("Dp values Assigend" + username);
	const dbref = ref(db);
	get(child(dbref, "Usernames/" + username)).then((snapshot) => {
		if (snapshot.exists()) {
			imgurl = snapshot.val().imgurl;
			document.getElementById("profile_pic").src = imgurl;
			document.getElementById("profile_pic_createPost").src = imgurl;
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
	const Posts = ref(db, "Posts/");
	onValue(Posts, (snapshot) => {
		const data = snapshot.val();
		let post = [];
		Object.keys(data).forEach((key) => {
			post.push({
				name: key,
				data: data[key],
			});
		});

		post.forEach((element) => {
			let authorDp =
				"https://uxwing.com/wp-content/themes/uxwing/download/peoples-avatars/no-profile-picture-icon.png",
				authorName = "Unknown";
			const dbref = ref(db);
			const author = ref(db, "Usernames/" + element.data.author);
			onValue(author, (snapshot) => {
				authorDp = snapshot.val().imgurl;
				authorName = snapshot.val().fullName;
			});

			let postImgurl = element.data.imgurl,
				date = "06:37 AM , 2 Dec",
				text = element.data.text,
				noOfLikes = element.data.likes,
				noOfDislikes = element.data.dislikes,
				noOfComments = element.data.comments;
			setTimeout(() => {
				insertpost(
					authorDp,
					authorName,
					date, //"06:37 AM , 2 Dec",
					postImgurl,
					text, //"Coming Soon...",
					noOfLikes, //37,
					noOfDislikes, //2,
					noOfComments //58
				);
			}, 1000);
		});
	});
}
// <-------------------------------------------Linking Ends Here------------------------------------------>

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
		document.getElementById("root").innerHTML = "";
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
//this funtion will be removed later

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
	const loggedinuser = ref(db, "loggedInuser/");
	onValue(loggedinuser, (snapshot) => {
		username = snapshot.val().username;
	});

	setTimeout(() => {
		get(child(dbref, "PostCount/" + username)).then((snapshot) => {
			if (snapshot.exists()) {
				postCount = snapshot.val().postCount;
				console.log("post count : " + postCount);
			}
		});
		SelectData();
	}, 2000);
	setTimeout(addPosts(), 1000);
};
let search_btn = document.getElementById("search_btn");
let search_input = document.getElementById("search_input");
search_btn.onclick = () => {
	let searchUsername = search_input.value;
	console.log(searchUsername.length);
	if (searchUsername.length > 0) {
		const searchedUser = ref(db, "Usernames/" + searchUsername);
		onValue(searchedUser, (snapshot) => {
			{
				if (snapshot.exists()) {
					let dp = snapshot.val().imgurl,
						name = snapshot.val().fullName,
						email = snapshot.val().email,
						bio = snapshot.val().bio,
						friends = snapshot.val().friends,
						status = friends.includes(username),
						id = searchUsername;
					let friendShipStatus = "Add Friend";
					if (status == true) {
						friendShipStatus = "You are Friends";
					}
					showSearchedUser(
						dp,
						name,
						searchUsername,
						email,
						bio,
						friendShipStatus,
						id
					);
				} else {
					let train = `<div><p>No Such User Found</p></div>`;
					document.getElementById("extra-features").innerHTML = train;
				}
			}
		});
	}
};

function showSearchedUser(
	dp,
	fullName,
	username,
	email,
	bio,
	friendShipStatus,
	id
) {
	let train = `<div id="userProfile">
                    <img id="userBanner" src="/Pngs/banner.jpg" alt="">
                    <img id="userProfilePic" src="${dp}" alt="">
                    <h4 id="fullname"><b>${fullName}</b></h4>
                    <div id="userDetails">
                        <div class="userCard">
                            <h6><b> Username : </b></h6>
                            <h6>${username}</h6>
                        </div>
                        <hr>
                        <div class="userCard">
                            <h6><b> Email :&nbsp&nbsp&nbsp&nbsp</b></h6>
                            <h6>${email}</h6>
                        </div>
                        <hr>
                        <div class="userCard">
                            <h6><b> Bio :&nbsp&nbsp&nbsp&nbsp</b></h6>
                            <h6>${bio}</h6>
                        </div>
                    </div>
                    <div id="${id}" class="setting-card" style="text-align: center;">${friendShipStatus}</div>
                </div>`;

	document.getElementById("extra-features").innerHTML = train;
	let get = document.getElementById(id);
	get.onclick = () => {
		addFriend();
	};
}
function addFriend() {
	console.log("data");
}
let view_friends = document.getElementById("view_friends");
view_friends.onclick = () => {
	let extraFeatures = document.getElementById("extra-features");
	extraFeatures.innerHTML = `<h4 id="extra_header">Friend List</h4>`;
	const friendRef = ref(db, "Usernames/" + username);
	let friends = "";
	onValue(friendRef, (snapshot) => {
		friends = snapshot.val().friends;
	});
	let friendArr = [];
	if (friends.length > 0) friendArr = friends.split(" ");
	console.log(friendArr);
	friendArr.forEach((element) => {
		const friendRef2 = ref(db, "Usernames/" + element);
		onValue(friendRef2, (snapshot) => {
			ShowFriendCard(snapshot.val().imgurl, snapshot.val().fullName);
		});
	});
};
let view_friends_requests = document.getElementById("friend-requests");
view_friends_requests.onclick = () => {
	let extraFeatures = document.getElementById("extra-features");
	extraFeatures.innerHTML = `<h4 id="extra_header">Friend Requests</h4>`;
	const friendRef = ref(db, "Usernames/" + username);
	let friendRequests = "";
	onValue(friendRef, (snapshot) => {
		friendRequests = snapshot.val().friendRequests;
	});
	let friendArr = [];
	if (friendRequests.length > 0) friendArr = friendRequests.split(" ");
	else {
		extraFeatures.innerHTML += `<h5 >No Pending Requests</h5>`;
	}
	console.log(friendArr);
	friendArr.forEach((element) => {
		const friendRef2 = ref(db, "Usernames/" + element);
		onValue(friendRef2, (snapshot) => {
			ShowPersonCard(snapshot.val().imgurl, snapshot.val().fullName);
		});
	});
};
let createPost_btn = document.getElementById("createPost_btn");
// createPost_btn.addEventListener('click',show_newpost_popup())
let cancle_btn = document.getElementById("cancle_btn");
// cancle_btn.addEventListener('click',show_newpost_popup())
createPost_btn.onclick = () => {
	show_newpost_popup();
	clearPostDetails();
};
cancle_btn.onclick = () => {
	show_newpost_popup();
};
function show_newpost_popup() {
	let btn = document.getElementById("new-post-popup");
	btn.classList.toggle("show-newpost-popup");
}

let post_btn = document.getElementById("post_btn");
post_btn.onclick = () => {
	storePostInDataBase();
	show_newpost_popup();
	clearPostDetails();
};
function clearPostDetails() {
	document.getElementById("root").innerHTML = "";
	document.getElementById("caption-area").value = "";
	document.getElementById("img-input").value = null;
}
let loadPost_btn = document.getElementById("load_posts");
loadPost_btn.onclick = () => {
	addPosts();
};

//		Adding it to insert friend on btn click

// let viewFriends = document.getElementById("view_friends");
// viewFriends.onclick = () => {
// 	let extraFeatures = document.getElementById("extra-features");
// 	extraFeatures.innerHTML = `<h4 id="extra_header">Friend List</h4>`;
// 	let i = 0;
// 	for (i = 0; i < 10; i++) {
// 		ShowFriendCard();
// 	}
// };
function ShowFriendCard(dp, name) {
	let extraFeatures = document.getElementById("extra-features");
	extraFeatures.innerHTML += `<div id="person_card">
	<a href="#" class="no-link">
		<div id="view-profile" >
			<img id="profile_pic" class="profile_pic"
				src="${dp}"
				alt="">
			<h6 style="text-align: center;">${name}</h6>
		</div>
	</a>
</div>`;
	// Added this so when user clicks on the profile of his friend it will show his profile
	let get = document.getElementById('person_card');
	get.onclick = () => {
		showSearchedUser(dp,name,'n','@','cool',true,'id');			
		//Call function you call when someone search for username
		// complete this by matching the user name with the data on db
	}
}

//		Friends Requests

// let requests = document.getElementById("friend-requests");
// requests.onclick = () => {
// 	let extraFeatures = document.getElementById("extra-features");
// 	extraFeatures.innerHTML = `<h4 id="extra_header">Friends Requests</h4>`;
// 	let i = 0;
// 	for (i = 0; i < 10; i++) {
// 		ShowPersonCard();
// 	}
// };
function ShowPersonCard(dp, name) {
	let extraFeatures = document.getElementById("extra-features");
	extraFeatures.innerHTML += `<div id="person_card"'>
	<a href="#" class="no-link">
		<div id="view-profile">
			<img id="profile_pic" class="profile_pic"
				src="${dp}"
				alt="">
			<h6 style="text-align: center;">${name}</h6>
		</div>
	</a>
	<div id="add_friend" class="flex-row">
		<div id="acceptRequest" class="setting-card" style="width: 50%;">Accept</div>
		<div id="declineRequest"  style="width: 50%">Reject</div>
		
	</div>
</div>`;
	// Added this so when user clicks on the profile of his friend it will show his profile
	let get = document.getElementById('person_card');
	get.onclick = () => {
		showSearchedUser(dp,name,'n','@','cool',true,'id');		
		//Call function you call when someone search for Username    // i changed so you do not have to
	}
}
//   onfriend card click
// let personCard = document.getElementById('btnn');
// personCard.onclick = () => {
// 	let extraFeatures = document.getElementById('extra-features');
// 	extraFeatures.innerHTML += `<div id="userProfile">
// 	<img id="userBanner" src="/Pngs/banner.jpg" alt="">
// 	<img id="userProfilePic" src="/Pngs/pic.jpg" alt="">
// 	<h4 id="fullname"><b> Abdul Mateen</b></h4>
// 	<div id="userDetails">
// 		<div class="userCard">
// 			<h6><b> Username :&nbsp&nbsp&nbsp&nbsp</b></h6>
// 			<h6>abdulmateen</h6>
// 		</div>
// 		<hr>
// 		<div class="userCard">
// 			<h6><b> Email :&nbsp&nbsp&nbsp&nbsp</b></h6>
// 			<h6>abdulmateen@mail.com</h6>
// 		</div>
// 		<hr>
// 		<div class="userCard">
// 			<h6><b> Bio :&nbsp&nbsp&nbsp&nbsp</b></h6>
// 			<h6>COOL</h6>
// 		</div>
// 	</div>
// 	<div id="friendshipInfo" class="setting-card" style="text-align: center;">Add Friend</div>
// </div>`;
// }

//	notification

let notiBtn = document.getElementById("notification_btn");
notiBtn.onclick = () => {
	let extraFeatures = document.getElementById("extra-features");
	extraFeatures.innerHTML = `<h4 id="extra_header">Notifications</h4>`;
	extraFeatures.innerHTML += `<div id="notification">
                <div id="notification-img">
				<img src="/Pngs/pic.jpg" alt="">
			</div>
			<div id="text-content">
				Ali liked your photo.
			</div>
		</div > `;
};

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
                    <img id="unlikedbtn" src="/Pngs/heart-unlike.png" alt="">
                    <p>Love</p>
                </div>
                <div class="comment-section">
                    <img src="/Pngs/commentpng.png" alt="">
                    <p>Comments</p>
                </div>
            </div>
        </div>
    </ > `;
	// Solve this error
	document.getElementById("posts_section").innerHTML += train;
	let gt= document.getElementById('unlikedbtn');
	// gt.addEventListener('click',ge());
	gt.onclick=(element)=>{
		
		console.log('hiii')
		gt.src='/Pngs/heart-liked.png';
	}
		
}