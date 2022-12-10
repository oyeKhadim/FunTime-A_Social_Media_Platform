export class person {
	//<-------------------------------------Constructor And Getter/Setters------------------------------------>
	constructor(
		name,
		username,
		password,
		email,
		bio,
		posts,
		requests,
		addFriendPrivacy,
		showFriendPrivacy,
		friends,
		notifications,
		picture,
		isVerfied
	) {
		this._name = name;
		this._username = username;
		this._password = password;
		this._email = email;
		this._bio = bio;
		this._posts = posts;
		this._requests = requests;
		this._addFriendPrivacy = addFriendPrivacy;
		this._showriendPrivacy = showFriendPrivacy;
		this._friends = friends;
		this._notifications = notifications;
		this._picture = picture;
		this._isVerfied = isVerfied;
	}
	set name(newname) {
		this._name = newname;
	}
	set username(newUsername) {
		this._username = newUsername;
	}
	set password(newPassword) {
		this._password = newPassword;
	}
	set email(newEmail) {
		this._email = newEmail;
	}
	set bio(newBio) {
		this._bio = newBio;
	}
	set posts(newPosts) {
		this._posts = newPosts;
	}
	set requests(newRequest) {
		this._requests = newRequest;
	}
	set addFriendPrivacy(newAddFriendPrivacy) {
		this._addFriendPrivacy = newAddFriendPrivacy;
	}
	set showFriendPrivacy(newShowFriendPrivacy) {
		this._showriendPrivacy = newShowFriendPrivacy;
	}
	set friends(newFriends) {
		this._friends = newFriends;
	}
	set notifications(newNotifications) {
		this._notifications = newNotifications;
	}
	set picture(newpicture) {
		this._picture = newpicture;
	}
	set isVerfied(verfied) {
		this._isVerfied = verfied;
	}
	get name() {
		return this._name;
	}
	get username() {
		return this._username;
	}
	get password() {
		return this._password;
	}
	get email() {
		return this._email;
	}
	get bio() {
		return this._bio;
	}
	get posts() {
		return this._posts;
	}
	get requests() {
		return this._requests;
	}
	get addFriendPrivacy() {
		return this._addFriendPrivacy;
	}
	get showFriendPrivacy() {
		return this._showriendPrivacy;
	}
	get friends() {
		return this._friends;
	}
	get notifications() {
		return this._notifications;
	}
	get picture() {
		return this._picture;
	}
	get isVerfied() {
		return this._isVerfied;
	}
	// <-------------------------------------------------Functions And Implementations--------------------------------->




}
