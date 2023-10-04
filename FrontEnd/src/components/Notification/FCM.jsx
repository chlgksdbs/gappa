import React, { useEffect, useState } from 'react';
import style from './FCMPage.module.css';
import { customAxios } from '../api/customAxios';
import { getToken, getMessaging } from 'firebase/messaging';
import { initializeApp } from "firebase/app";
import toast from 'react-hot-toast';

const FCM = () => {

  // 버튼 토글
  const [isPushEnabled, setPushEnabled] = useState(false);

  

  useEffect(() => {
    const isFCM = localStorage.getItem("fcmToken");  
    if( isFCM !== null ){
      setPushEnabled(true);
    }
  }, []);


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
    } else {
      // 알림 권한이 허용된 경우의 동작
      console.log("알림 권한이 허용됨");
      setTimeout(getFirebaseToken(), 1000);
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
        setting(token);
      } else {
        setPushEnabled(false);
        return null;
      }
    } catch (error) {
      console.error("Error getting token: ", error);
      setPushEnabled(false);
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
      toast.success("푸시 알림을 받습니다", {
        duration: 1000,
      });
      setTimeout(() => {
      }, 1000);
    })
    .catch((res)=>{
      console.log(res);
      setPushEnabled(false);
    })
  }  

  // 테스트 메시지 보내는 메서드
  // const send = () => {
  //   customAxios.post("/fcm/push")
  //   .then((res)=>{
  //     console.log(res);
  //   })
  //   .catch((res)=>{
  //     console.log(res);
  //   })
  // };

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
    <div className={style.btnBox}>
      <div className={style.pushSwitch + (isPushEnabled ? ' ' + style.pushEnabled : '')} onClick={togglePushNotification} >
        <div className={style.switchButton}/>
      </div>
      
    </div>
  );
};

export default FCM;