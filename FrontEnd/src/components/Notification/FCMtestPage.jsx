import React, { useState } from 'react';
import HeaderSub from '../Common/HeaderSub';
import { customAxios } from '../api/customAxios';
import { getToken, getMessaging } from 'firebase/messaging';
import { initializeApp } from "firebase/app";

const FCMtestPage = () => {
  const firebaseConfig = {
    apiKey: "AIzaSyAsVDuXDmuLEEmZGEzLXzC_JFOE9Dkv2yk",
    authDomain: "gappa-5755f.firebaseapp.com",
    projectId: "gappa-5755f",
    storageBucket: "gappa-5755f.appspot.com",
    messagingSenderId: "749380203321",
    appId: "1:749380203321:web:3aba3212b3da7ac363aee8",
    measurementId: "G-87Q4T0J8PG"
  };
  const initialToken = localStorage.getItem("fcmToken");
  const [Fcmtoken] = useState(initialToken);
  const app = initializeApp(firebaseConfig);
  const messaging = getMessaging(app);

  const setting = () => {
    const body = {
      token : Fcmtoken
    };
    customAxios.post("/fcm/login", body)
    .then((res)=>{
      console.log(res);
    })
    .catch((res)=>{
      console.log(res);
    })
  }

  const reload = () => {
    window.location.reload();
  }

  const logout = () => {
    window.localStorage.removeItem("token");
    window.localStorage.removeItem("fcmToken");
  }

  async function subs() {
    console.log("권한 요청 중...");

    const permission = await Notification.requestPermission();
    if (permission === "denied") {
      console.log("알림 권한이 허용되지 않음");
      return;
    }

    console.log("알림 권한이 허용됨");

  }


  const send = () => {
    customAxios.post("/fcm/push")
    .then((res)=>{
      console.log(res);
    })
    .catch((res)=>{
      console.log(res);
    })
  }

  async function getFirebaseToken() {
    try {
      const token = await getToken(messaging, {
        vapidKey: "BEGTfGO_ZzNesa6dGfyqdv6bLEy96rCBOcsZPV36Glm4MdYmWqVBhDjxIywtut1qVKq7hD_973Q3_fseOCFhuKU",
      });

      if (token) {
        console.log("token: ", token);
        localStorage.setItem("fcmToken", token);
        alert("토큰을 성공적으로 가져왔습니다!");
        return token;
      } else {
        console.log("Can not get Token");
        return null;
      }
    } catch (error) {
      console.error("Error getting token: ", error);
      return null;
    }
  }

  return (
    <div>
      <HeaderSub title={"FCM"} />
      <button onClick={send }>보내기</button>
      <div>Fcmtoken: {Fcmtoken}</div>
      <button onClick={setting }>fcm토큰보내기</button>
      <button onClick={subs }>알림 권한 허용 요청</button>
      <button onClick={reload }>새로고침</button>
      <button onClick={logout }>로그아웃</button>
    </div>
  );
};

export default FCMtestPage;