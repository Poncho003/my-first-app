import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyB6f28qykHqQTpppZm8CXwhdwlLs_xmC2c",
    authDomain: "baseclasereactnative.firebaseapp.com",
    projectId: "baseclasereactnative",
    storageBucket: "baseclasereactnative.firebasestorage.app",
    messagingSenderId: "692726207068",
    appId: "1:692726207068:web:c017b291ebacdfea104c99"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);