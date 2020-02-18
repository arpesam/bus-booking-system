import firebase from "firebase";
import "firebase/auth";
import "firebase/firestore";

console.log('---------', process.env.VUE_APP_apiKey)

const apiKey = process.env.VUE_APP_apiKey;
const authDomain = process.env.VUE_APP_authDomain;
const databaseURL = process.env.VUE_APP_databaseURL;
const projectId = process.env.VUE_APP_projectId;
const storageBucket = process.env.VUE_APP_storageBucket;
const messagingSenderId = process.env.VUE_APP_messagingSenderId;
const appId = process.env.VUE_APP_appId;
const measurementId = process.env.VUE_APP_measurementId;

const config = {
  apiKey,
  authDomain,
  databaseURL,
  projectId,
  storageBucket,
  messagingSenderId,
  appId,
  measurementId,
};

const fb = firebase.initializeApp(config);

const db = firebase.firestore();

export { fb, db };


  // // Your web app's Firebase configuration
  // var firebaseConfig = {
  //   apiKey: "AIzaSyA5pNMIU0QxlQnPP69TJYWdtsnYrbLtJGg",
  //   authDomain: "bus-booking-70dbc.firebaseapp.com",
  //   databaseURL: "https://bus-booking-70dbc.firebaseio.com",
  //   projectId: "bus-booking-70dbc",
  //   storageBucket: "bus-booking-70dbc.appspot.com",
  //   messagingSenderId: "303097707478",
  //   appId: "1:303097707478:web:e6c725fd1ec9ed00ab8277",
  //   measurementId: "G-SSGZXHJHLS"
  // };
  // // Initialize Firebase
  // firebase.initializeApp(firebaseConfig);
  // firebase.analytics();