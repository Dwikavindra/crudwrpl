// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {
  getStorage,
  ref,
  StorageReference,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";
import { product } from "@prisma/client";
import { Product } from "../../pages/product/edit/[id]";
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
export const submitProduct = async (
  imageFile: File,
  productObject: Product,
  submitToDB: Function // For DB related action
) => {
  const imageRef = ref(
    storage,
    `images/${imageFile!.name + productObject.productID}`
  );
  await uploadBytes(imageRef, imageFile!).then(() => {
    getDownloadURL(imageRef).then((url) => {
      const newproducts = { ...productObject, imageUrl: url };
      console.log(newproducts);
      submitToDB(newproducts);
    });
  });
};
