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
let loggedInuser = "";
let allMessagestxt = []; //all messages
let msgArr = []; //messages of specific user
let allUsers = document.getElementById("msgs_contact");
function addUsers() {
	const Posts = ref(db, "Usernames/");
	onValue(Posts, (snapshot) => {
		const data = snapshot.val();
		let post = [];
		Object.keys(data).forEach((key) => {
			post.push({
				name: key,
				data: data[key],
			});
		});
		let friends=data[loggedInuser].friends.split(' ');
		console.log(friends);
		allUsers.innerHTML = "";
		post.forEach((element) => {
			if (element.data.username != loggedInuser&&friends.includes(element.data.username)) {
				let user = `<div id="person_card" onclick="viewMessages(${element.data.username})">
                <a href="#" class="no-link" >
                    <div id="view-profile" >
                        <img id="profile_pic" class="profile_pic"
                            src="${element.data.imgurl}"
                            alt="">
                        <h4 style="text-align: center;">${element.data.fullName}</h4>
                        <p style = "display:none" id="${element.data.username}">${element.data.username}</p>
                    </div>
                </a>
            </div>`;
				allUsers.innerHTML += user;
			}
		});
	});
}
let username;
window.viewMessages = async function viewMessages(usernameObj) {
	username = usernameObj.id;
	const userRef = ref(db, "Usernames/" + username);
	let dp, fullName;
	await onValue(userRef, (snapshot) => {
		dp = snapshot.val().imgurl;
		fullName = snapshot.val().fullName;
	});

	document.getElementById("msgs_details").innerHTML = `<div id="msg_section">
                <div id="msg_top">
                    <img src="${dp}" class="profile_pic" alt="">
                    <h5 style="margin-left: 5px;">${fullName}</h5>
                </div>
                <div id="msg_div">
                    
                </div>
                <div id="msg_input">
                    <textarea name="" id="textarea" cols="1" rows="1" placeholder="Enter Msg"></textarea>
                    <img src="/Pngs/sendbtn.png" id="sendbtn" onclick="sendMessage()" alt="">
                </div>
            </div>`;
	let msg = "";
	allMessagestxt.forEach((element) => {
		if (element.username == username) {
			msg = element.messages.messages;
		}
	});
    msgArr=[];
	if (msg.length > 0) msgArr = msg.split("•");
	msgArr.forEach((element) => {
		let thisMsg = element.split("ò");
		let message = `
        <div class="message">
            <div class="${thisMsg[0]}">${thisMsg[1]}</div>
        </div>            `;
		document.getElementById("msg_div").innerHTML += message;
	});
};
window.onload = async () => {
	await get(child(ref(db), "loggedInuser/")).then((snapshot) => {
		loggedInuser = snapshot.val().username;
	});
	update(ref(db, "Usernames/" + loggedInuser), {
		messagesRead: true,
	});
	addUsers();
	getAllMessages();
};
async function getAllMessages() {
	let messages;
	await get(child(ref(db), "Usernames/" + loggedInuser)).then((snapshot) => {
		messages = snapshot.val().Messages;
	});
	Object.keys(messages).forEach((key) => {
		allMessagestxt.push({
			username: key,
			messages: messages[key],
		});
	});
}
window.sendMessage = function sendMessage() {
	let msgDiv = document.getElementById("msg_div");
	let newDiv = document.createElement("div");
	newDiv.classList += "message";
	let msg = document.createElement("div");
	msg.classList = "msg_sent";
	let text = document.getElementById("textarea");
	if (text.value != "") {
		msg.innerText = text.value;
		newDiv.appendChild(msg);
		msgDiv.append(newDiv);
	}
	let mymsg = text.value;
	storeMessageInDataBase(mymsg);
	storeInArray(mymsg);
	text.value = null;
	get.scrollTop = get.scrollHeight;
};
async function storeMessageInDataBase(text) {
	//username,loggedinuser
	//msg_sent <--loggedinuser
	//msg_recieved <---username
	// ò
	// •
	let sentMsg = "•msg_sentò" + text;
	let receivedMsg = "•msg_recievedò" + text;

	let myMsgs = "msg_sentò" + text;
	await get(
		child(ref(db), "Usernames/" + loggedInuser + "/Messages/" + username)
	).then((snapshot) => {
		if (snapshot.exists()) {
			myMsgs = snapshot.val().messages;
			myMsgs += sentMsg;
		}
	});
	update(ref(db, "Usernames/" + loggedInuser + "/Messages/" + username), {
		messages: myMsgs,
		read: true,
	});
	let yourMsgs = "msg_recievedò" + text;
	await get(
		child(ref(db), "Usernames/" + username + "/Messages/" + loggedInuser)
	).then((snapshot) => {
		if (snapshot.exists()) {
			yourMsgs = snapshot.val().messages;
			yourMsgs += receivedMsg;
		}
	});
	update(ref(db, "Usernames/" + username + "/Messages/" + loggedInuser), {
		messages: yourMsgs,
		read: false,
	});
	update(ref(db, "Usernames/" + username), {
		messagesRead: false,
	});
}
function storeInArray(text) {
    let flag=false;
	allMessagestxt.forEach((element) => {
		if (element.username == username) {
			if (element.messages.messages.length > 0)
				element.messages.messages += "•msg_sentò" + text;
			else element.messages.messages =  "msg_sentò"+ text;
            flag=true;
		}
	});
	//user not found
    if(flag==false){
        allMessagestxt.push({
            username:username,
            messages:{
                messages:"msg_sentò"+ text,
                read:true,
            }
        })
    }
}
