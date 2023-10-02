// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// import { getToken, getMessaging } from 'firebase/messaging';

// import { customAxios } from './components/api/customAxios';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyAsVDuXDmuLEEmZGEzLXzC_JFOE9Dkv2yk",
//   authDomain: "gappa-5755f.firebaseapp.com",
//   projectId: "gappa-5755f",
//   storageBucket: "gappa-5755f.appspot.com",
//   messagingSenderId: "749380203321",
//   appId: "1:749380203321:web:3aba3212b3da7ac363aee8",
//   measurementId: "G-87Q4T0J8PG"
// };

// Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const messaging = getMessaging(app);
// const analytics = getAnalytics(app);


// async function requestPermission() {
//   console.log("권한 요청 중...");

//   const permission = await Notification.requestPermission();
//   if (permission === "denied") {
//     console.log("알림 권한이 허용되지 않음");
//     return;
//   }       
    
//   console.log("알림 권한이 허용됨");

//   const token = await getToken(messaging, {
//     vapidKey: "BEGTfGO_ZzNesa6dGfyqdv6bLEy96rCBOcsZPV36Glm4MdYmWqVBhDjxIywtut1qVKq7hD_973Q3_fseOCFhuKU",
//   });

//   if (token) {
//     console.log("token: ", token);
//     localStorage.setItem("fcmToken", token);
//     // const body = {
//     //   token : token
//     // };
//     // customAxios.post("/fcm/login", body)
//     // .then((res)=>{
//     //   console.log(res);
//     // })
//     // .catch((res)=>{
//     //   console.log(res);
//     // })
//   } else console.log("Can not get Token");

  // onMessage(messaging, (payload) => {
  //   console.log("메시지가 도착했습니다.", payload);
  //   // ...
  // });
// }

// requestPermission();