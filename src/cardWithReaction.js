
class MessageItem extends React.Component {
  //A method to "like" a message

  likeMessage(emotion) {
    /* Access the message in the firebase and add this user's name */
    var reactionRef = firebase.database().ref('articleUniqueIDs/' + this.props.url + '/'+emotion);

    //toggle logic
    var userId = firebase.auth().currentUser.uid
    var reactionObj = this.props.message;
	var allEmotions = [
		"happy", "sad", "wow", "neutral", "angry"
	]
	var emotionIndex = allEmotions.indexOf(emotion)
	allEmotions = allEmotions.splice(emotionIndex, 1)
    if (reactionObj[emotion] && reactionObj[emotion][userId]) { //in likes list already
      reactionObj[emotion][userId] = null; //remove
    }
    else { //add my like
      reactionObj[emotion][userId] = true; //just make it true so we have a key
	  allEmotions.forEach(function (otherEmotion){
		  reactionObj[otherEmotion][userId] = null;
	  })
    }

    reactionRef.set(reactionObj) //update the likes!
  }
  //before deleting, let users to confirm one more time
  deleteMessage() {
    if (confirm("Do You Really Want To Delete This Message?")) {
      var messageRef = firebase.database().ref("messages/" + this.props.message.key)

      messageRef.set(null);
    }
  }

  //edit messages posted by the users posted themselves
  editMessage() {
    var msgEdited = prompt("Change Your Text", this.props.message.text)
    if (msgEdited != this.props.message.text) {
      var messageRef = firebase.database().ref("messages/" + this.props.message.key + "/text")
      messageRef.set(msgEdited);
      var editRef = firebase.database().ref("messages/" + this.props.message.key + "/edit")
      editRef.set(firebase.database.ServerValue.TIMESTAMP);
    }
  }


  render() {
	var allEmotions = {"happy":0, "sad":0, "wow":0, "neutral":0, "angry":0}//TAKE THIS ARRAY TO RENDER COUNTS
	Object.keys(allEmotions).forEach(function (emotion) {
    	var reactionRef = firebase.database().ref('messages/' + this.props.message.key + '/'+emotion);
		if(reactionRef[emotion] != null) {
			allEmotions.emotion = Object.keys(reactionRef[emotion]).length; 
		}
	})

	var max = 0;
	var currentColor = 'teal';
	var colors = {"happy": "yellow", "sad": "blue", "wow": "purple", "neutral": "teal", "angry": "red"}	
	Object.keys(allEmotions).forEach(function (emotion) {
		if(allEmotions.emotion === max) {
			currentColor = 'teal';
		} else if(allEmotions.emotion > max){
			max = allEmotions.emotion;
			currentColor = colors.emotion;
		}
	})

  var articleColorRef = firebase.database().ref('articleUniqueIDs/' + this.props.url + '/color');
  articleColorRef.set(currentColor);

  
    // if (this.props.message.likes) {
    //   likeCount = Object.keys(this.props.message.likes).length;
    //   if (this.props.message.likes[firebase.auth().currentUser.uid])
    //     iLike = true;
    // }

    return (
      <div className={"message-box " + currentColor}>

        <div className="message">{this.props.message.text}</div>

        <div className="likes">

          <i aria-label="like button" className={'fa fa-heart ' + (iLike ? 'user-liked' : '')} aria-label="happy" onClick={() => this.likeMessage(happy)} ></i>
          <i aria-label="like button" className={'fa fa-heart ' + (iLike ? 'user-liked' : '')} aria-label="sad" onClick={() => this.likeMessage(sad)} ></i>
          <i aria-label="like button" className={'fa fa-heart ' + (iLike ? 'user-liked' : '')} aria-label="wow" onClick={() => this.likeMessage(wow)} ></i>
          <i aria-label="like button" className={'fa fa-heart ' + (iLike ? 'user-liked' : '')} aria-label="neutral" onClick={() => this.likeMessage(neutral)} ></i>
          <i aria-label="like button" className={'fa fa-heart ' + (iLike ? 'user-liked' : '')} aria-label="angry" onClick={() => this.likeMessage(angry)} ></i>
          <span>{/*space*/} {likeCount}      </span>

          {this.props.message.userId == firebase.auth().currentUser.uid &&
            <i className="fa fa-trash" onClick={() => this.deleteMessage()}></i>
          }
          <span>      </span>
          {this.props.message.userId == firebase.auth().currentUser.uid &&
            <i className="fa fa-pencil" onClick={() => this.editMessage()} />
          }
        </div>
      </div>
    );
  }
}
