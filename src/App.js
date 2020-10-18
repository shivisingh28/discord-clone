import React, { useEffect } from "react";
import Sidebar from "./Sidebar";
import { useSelector, useDispatch } from "react-redux";
import { selectUser, login, logout } from "./features/userSlice";
import Chat from "./Chat";
import Login from "./Login";
import { auth } from "./firebase";
import "./App.css";

function App() {
	const dispatch = useDispatch();
	const user = useSelector(selectUser);
	useEffect(() => {
		auth.onAuthStateChanged((authUser) => {
			if (authUser) {
				//the user is logged in
				dispatch(
					login({
						uid: authUser.uid,
						photo: authUser.photoURL,
						email: authUser.email,
						displayName: authUser.displayName,
					})
				);
			} else {
				//the user is logged out
				dispatch((logout));
			}
		});
	}, [dispatch]);
	return (
		<div className="app">
			{user ? (
				<>
					<Sidebar />
					<Chat />
				</>
			) : (
				<Login />
			)}
		</div>
	);
}

export default App;
