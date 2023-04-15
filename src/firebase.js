import firebase from 'firebase/app'
import 'firebase/auth'

var firebaseConfig = {
    
        apiKey: "AIzaSyAJr8JHXELFJ_iEo6xmGd7J3dq4IRibP5c",
        authDomain: "chatbot-otp-e8e32.firebaseapp.com",
        projectId: "chatbot-otp-e8e32",
        storageBucket: "chatbot-otp-e8e32.appspot.com",
        messagingSenderId: "726317959735",
        appId: "1:726317959735:web:0a0316c266ff33e903cdb2",
        measurementId: "G-2R1JVCPTQ6"
      };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  
export default firebase