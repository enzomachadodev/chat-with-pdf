import { initializeApp, getApps, App, getApp, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import { getStorage } from "firebase-admin/storage";

if (!process.env.SERVICE_KEY) {
	throw new Error("SERVICE_KEY is not set");
}

const serviceKey = JSON.parse(process.env.SERVICE_KEY);

let app: App;

if (getApps().length === 0) {
	app = initializeApp({
		credential: cert(serviceKey),
	});
} else {
	app = getApp();
}

const adminDb = getFirestore(app);
const adminStorage = getStorage(app);

export { app as adminApp, adminDb, adminStorage };

