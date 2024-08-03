import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
	apiKey: "AIzaSyDxZQlbrEJW0D9s6wSo14m5zeI0AnJrm1w",
	authDomain: "chat-with-pdf-3c103.firebaseapp.com",
	projectId: "chat-with-pdf-3c103",
	storageBucket: "chat-with-pdf-3c103.appspot.com",
	messagingSenderId: "464817323885",
	appId: "1:464817323885:web:49d2a42a132ba4f043e464",
	measurementId: "G-5HYW42717T",
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

const db = getFirestore(app);
const storage = getStorage(app);

export { db, storage };
