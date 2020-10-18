import React, { useEffect, useState } from "react";
import ChatHeader from "./ChatHeader";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import CardGiftcardIcon from "@material-ui/icons/CardGiftcard";
import EmojiEmotionsIcon from "@material-ui/icons/EmojiEmotions";
import GifIcon from "@material-ui/icons/Gif";
import Message from "./Message";
import "./Chat.css";
import { selectChannelName, selectChannelId } from "./features/appSlice";
import { selectUser } from "./features/userSlice";
import { useSelector } from "react-redux";
import db from "./firebase";
import firebase from "firebase";

function Chat() {
	const channelId = useSelector(selectChannelId);
	const user = useSelector(selectUser);
	const channelName = useSelector(selectChannelName);
	const [messages, setMessages] = useState([]);
	const [input, setInput] = useState("");

	useEffect(() => {
		if (channelId) {
			db.collection("channels")
				.doc(channelId)
				.collection("messages")
				.orderBy("timestamp", "desc")
				.onSnapshot((snapshot) =>
					setMessages(snapshot.docs.map((doc) => doc.data()))
				);
		}
	}, [channelId]);
	const sendMessage = (e) => {
		e.preventDefault();
		db.collection("channels").doc(channelId).collection("messages").add({
			timestamp: firebase.firestore.FieldValue.serverTimestamp(),
			message: input,
			user: user,
		});
		setInput("");
	};

	return (
		<div className="chat">
			<ChatHeader channelName={channelName} />
			<div className="chat__messages">
				{messages.map((message) => (
					<Message
						timestamp={message.timestamp}
						message={message.message}
						user={message.user}
					/>
				))}
			</div>
			<div className="chat__input">
				<AddCircleIcon />
				<form>
					<input
						value={input}
						disabled={!channelId}
						onChange={(e) => setInput(e.target.value)}
						placeholder={`message #${channelName}`}
					/>
					<button
						className="chat__inputButton"
						type="submit"
						onClick={sendMessage}
					>
						Send Message
					</button>
				</form>
				<div className="chat__inputIcons">
					<CardGiftcardIcon fontSize="large" />
					<GifIcon fontSize="large" />
					<EmojiEmotionsIcon fontSize="large" />
				</div>
			</div>
		</div>
	);
}

export default Chat;
