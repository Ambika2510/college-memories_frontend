// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
    apiKey: "AIzaSyDmXYRdLhMpUn0phJfYR8fVtj1YG4EXLek",
    authDomain: "uploadingimage-2b4e1.firebaseapp.com",
    projectId: "uploadingimage-2b4e1",
    storageBucket: "uploadingimage-2b4e1.appspot.com",
    messagingSenderId: "164547010904",
    appId: "1:164547010904:web:c8d5359be7da827833452d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);