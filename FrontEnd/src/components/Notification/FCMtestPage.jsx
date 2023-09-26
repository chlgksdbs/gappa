import React, { useState } from 'react';
import HeaderSub from '../Common/HeaderSub';
import { customAxios } from '../api/customAxios';

const FCMtestPage = () => {
  const initialToken = localStorage.getItem("fcmToken");
  const [Fcmtoken] = useState(initialToken);

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