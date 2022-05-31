// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {
  getStorage,
  ref,
  StorageReference,
  uploadBytes,
} from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_KEY,
  authDomain: "crudwrpl.firebaseapp.com",
  projectId: "crudwrpl",
  storageBucket: "crudwrpl.appspot.com",
  messagingSenderId: "945983832412",
  appId: "1:945983832412:web:00f6fd86bbfd0994a7c199",
  measurementId: "G-VBVL7CLPT8",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
export const submitImageToFirebaseStorage = async (
  imageFile: File,
  productID: number
): Promise<StorageReference> => {
  const imageRef = ref(storage, `images/${imageFile!.name + productID}`);
  await uploadBytes(imageRef, imageFile!).then();
  return imageRef;
};
