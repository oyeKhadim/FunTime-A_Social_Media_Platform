class post {

//<-------------------------------------Constructor And Getter/Setters------------------------------------>
	constructor(
		text,
		username,
		picURL,
		comments,
		dateTime,
		noOfLikes,
		noOfDislikes
	) {
		this._text = text;
		this._username = username;
		this._picURL = picURL;
		this._comments = comments;
		this._dateTime = dateTime;
		this._noOfLikes = noOfLikes;
		this._noOfDislikes = noOfDislikes;
	}
    get text(){
        return this._text;
    }
    get username(){
        return this._username;
    }
    get picURL(){
        return this._picURL;
    }
    get comments(){
        return this._comments;
    }
    get dateTime(){
        return this._dateTime;
    }
    get noOfLikes(){
        return this._noOfLikes;
    }
    get noOfDislikes(){
        return this._noOfDislikes;
    }
    set text(newText){
        this._text=newText;
    }
    set username(newUsername)
    {
        this._username=newUsername;
    }
    set picURL(newPic){
        this._picURL=newPic;
    }
    set comments(newComments){
        this._comments=this.comments;
    }
	set dateTime(newDateTime) {
        this._dateTime=newDateTime;
    }
	set noOfLikes(likes) {
		this._noOfLikes = likes;
	}
	set noOfDislikes(dislikes) {
		this._noOfDislikes = dislikes;
	}



    // <-------------------------------------------------Functions And Implementations--------------------------------->
}
