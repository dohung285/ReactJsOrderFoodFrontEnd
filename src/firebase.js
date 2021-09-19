import firebase from 'firebase/app';
import 'firebase/messaging';
import { TOKEN_FIREBASE } from './constants/ConstantString';

var firebaseConfig = {
  apiKey: "AIzaSyBmsTN7JkljyvjkIcV5rUGT9LURTvnDqe4",
  authDomain: "fir-cloud-message-a97bb.firebaseapp.com",
  projectId: "fir-cloud-message-a97bb",
  storageBucket: "fir-cloud-message-a97bb.appspot.com",
  messagingSenderId: "539950280163",
  appId: "1:539950280163:web:7734779e8e15f8291b04d6"
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();


export const  getToken = () => {
  return messaging.getToken({ vapidKey: 'BByeNY5ECSP19xzyw3Yf1gfoqCAgflQa2_ahfQl92gt_EgLslYpMwj_FpT7kSkCrya07pcpdbIOPiLizBl_JsNI' }).then((currentToken) => {
    if (currentToken) {
      // console.log('current token for client: ', currentToken);
      localStorage.setItem(TOKEN_FIREBASE,currentToken)
      // setTokenFound(true);
      // Track the token -> client mapping, by sending to backend server
      // show on the UI that permission is secured
    } else {
      console.log('No registration token available. Request permission to generate one.');
      // setTokenFound(false);
      // shows on the UI that permission is required 
    }
  }).catch((err) => {
    console.log('An error occurred while retrieving token. ', err);
    // catch error while creating client token
  });
}


// export const  getToken = (setTokenFound) => {
//   return messaging.getToken({ vapidKey: 'BByeNY5ECSP19xzyw3Yf1gfoqCAgflQa2_ahfQl92gt_EgLslYpMwj_FpT7kSkCrya07pcpdbIOPiLizBl_JsNI' }).then((currentToken) => {
//     if (currentToken) {
//       console.log('current token for client: ', currentToken);
//       setTokenFound(true);
//       // Track the token -> client mapping, by sending to backend server
//       // show on the UI that permission is secured
//     } else {
//       console.log('No registration token available. Request permission to generate one.');
//       setTokenFound(false);
//       // shows on the UI that permission is required 
//     }
//   }).catch((err) => {
//     console.log('An error occurred while retrieving token. ', err);
//     // catch error while creating client token
//   });
// }



export const onMessageListener = () =>
  new Promise((resolve) => {
    messaging.onMessage((payload) => {
      resolve(payload);
    });
  });