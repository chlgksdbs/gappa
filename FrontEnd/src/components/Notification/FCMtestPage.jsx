import React from 'react';
import HeaderSub from '../Common/HeaderSub';
import { customAxios } from '../api/customAxios';

const FCMtestPage = () => {

  const setting = () => {
    const Fcmtoken = localStorage.getItem("fcmToken");
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
      <button onClick={setting }>fcm토큰보내기</button>
    </div>
  );
};

export default FCMtestPage;