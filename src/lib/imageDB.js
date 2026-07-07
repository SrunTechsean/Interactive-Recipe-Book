//IndexedDB helper for storing recipe images

const DB_NAME = "RecipeAppDB";
const STORE_NAME = "images";
const DB_VERSION = 1;

function openDB() {
	return new Promise((resolve, reject) => {
		const request = indexedDB.open(DB_NAME, DB_VERSION);

		request.onupgradeneeded = (event) => {
			const db = event.target.result;
			if (!db.objectStoreNames.contains(STORE_NAME)) {
				db.createObjectStore(STORE_NAME);
			}
		};

		request.onsuccess = () => resolve(request.result);
		request.onerror = () => reject(request.error);
	});
}

export async function saveImage(id, file) {
	const db = await openDB();
	return new Promise((resolve, reject) => {
		const tx = db.transaction(STORE_NAME, "readwrite");
		tx.objectStore(STORE_NAME).put(file, id);
		tx.oncomplete = () => resolve();
		tx.onerror = () => reject(tx.error);
	});
}

export async function getImage(id) {
	const db = await openDB();
	return new Promise((resolve, reject) => {
		const tx = db.transaction(STORE_NAME, "readonly");
		const request = tx.objectStore(STORE_NAME).get(id);
		request.onsuccess = () => resolve(request.result || null);
		request.onerror = () => reject(request.error);
	});
}

export async function deleteImage(id) {
	const db = await openDB();
	return new Promise((resolve, reject) => {
		const tx = db.transaction(STORE_NAME, "readwrite");
		tx.objectStore(STORE_NAME).delete(id);
		tx.oncomplete = () => resolve();
		tx.onerror = () => reject(tx.error);
	});
}
