import React, { useState } from 'react';
import HeaderSub from '../Common/HeaderSub';
import style from './FCMPage.module.css';
import { customAxios } from '../api/customAxios';
import { getToken, getMessaging } from 'firebase/messaging';
import { initializeApp } from "firebase/app";

const FCMtestPage = () => {

  // 버튼 토글
  const [isPushEnabled, setPushEnabled] = useState(false);

  const togglePushNotification = () => {
    if(isPushEnabled === false){
      setPushEnabled(true);
      hideOnPush(); 
    } else if(isPushEnabled === true){
      setPushEnabled(false);
      hideOffPush();
    }
  };

  // firebase 설정
  const firebaseConfig = {
    apiKey: "AIzaSyAsVDuXDmuLEEmZGEzLXzC_JFOE9Dkv2yk",
    authDomain: "gappa-5755f.firebaseapp.com",
    projectId: "gappa-5755f",
    storageBucket: "gappa-5755f.appspot.com",
    messagingSenderId: "749380203321",
    appId: "1:749380203321:web:3aba3212b3da7ac363aee8",
    measurementId: "G-87Q4T0J8PG"
  };

  const [fcmToken, setFcmToken] = useState("");

  const app = initializeApp(firebaseConfig);
  const messaging = getMessaging(app);

  const hideOnPush = async () => {
    // 1. 알림 설정 허용인지 체크
    const permission = await subs();

    if (permission === "denied") {
      // 알림 권한이 거부된 경우의 동작
      console.log("알림 권한이 허용되지 않음");
      setPushEnabled(false);
      alert("잘못됐어요!권한허용에서실패");
    } else {
      // 알림 권한이 허용된 경우의 동작
      console.log("알림 권한이 허용됨");
      getFirebaseToken();
    }
  }

  async function subs() {
    console.log("권한 요청 중...");

    const permission = await Notification.requestPermission();
    return permission;
  }

  async function getFirebaseToken() {
    try {
      const token = await getToken(messaging, {
        vapidKey: "BEGTfGO_ZzNesa6dGfyqdv6bLEy96rCBOcsZPV36Glm4MdYmWqVBhDjxIywtut1qVKq7hD_973Q3_fseOCFhuKU",
      });

      if (token) {
        console.log("token: ", token);
        localStorage.setItem("fcmToken", token);
        if(token !== null){
          console.log("토큰이 왔다면!~@!@");
          setting(token);
        }
        return token;
      } else {
        setPushEnabled(false);
        alert("잘못됐어요!토큰가져오는게실패");
        return null;
      }
    } catch (error) {
      console.error("Error getting token: ", error);
      setPushEnabled(false);
      alert("잘못됐어요!토큰가져오는게에러뜸");
      return null;
    }
  }

  const setting = (token) => {
    const body = {
      token : token
    };
    customAxios.post("/fcm", body)
    .then((res)=>{
      console.log(res);
      setFcmToken(token);
    })
    .catch((res)=>{
      console.log(res);
      setPushEnabled(false);
      alert("잘못됐어요!토큰등록하는게실패");
    })
  }

  const reload = () => {
    window.location.reload();
  }

  const logout = () => {
    window.localStorage.removeItem("token");
    window.localStorage.removeItem("fcmToken");
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

  const hideOffPush = () => {
    customAxios.delete("/fcm")
    .then((res)=>{
      console.log(res);
      window.localStorage.removeItem("fcmToken");
    })
    .catch((res)=>{
      console.log(res);
    })
  }

  return (
    <div className={style.body}>
      <HeaderSub title={"FCM"} />
      <div className={style.btnBox}>
        <div className={style.pushSwitch + (isPushEnabled ? ' ' + style.pushEnabled : '')}>
          <div className={style.switchButton} onClick={togglePushNotification} />
        </div>
      </div>
      
      <div>
        버튼만들기
      </div>
      <button onClick={send }>보내기</button>
      <div>Fcmtoken: {fcmToken}</div>
      <button onClick={setting }>fcm토큰보내기</button>
      <button onClick={subs }>알림 권한 허용 요청</button>
      <button onClick={getFirebaseToken }>Firebase 토큰 가져오기</button>
      <button onClick={reload }>새로고침</button>
      <button onClick={logout }>로그아웃</button>
    </div>
  );
};

export default FCMtestPage;