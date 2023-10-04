import React, { useState, useEffect } from 'react';
import style from './MyCertificate.module.css';
import HeaderSub from '../Common/HeaderSub';
import Footer from '../Common/Footer';
import { useNavigate } from 'react-router-dom';
import { customAxios } from '../api/customAxios';

const MyCertificatePage = () => {
  const navigate = useNavigate();

  const [isCert, setIsCert] = useState(false);
  const expire = localStorage.getItem("expire");  

  const formattDate = (date) => {
      const dateObject = new Date(date);
      const year = dateObject.getFullYear();
      const month = dateObject.getMonth() + 1;
      const day = dateObject.getDate();
      const formattedDate = `${year}.${month < 10 ? ' 0' : ' '}${month}.${day < 10 ? ' 0' : ' '}${day}`;
      return formattedDate;
  }

  useEffect(() => {
    const isCPK = localStorage.getItem("CPK");
    const isExpire = localStorage.getItem("expire");
    if(isCPK === null || isExpire === null){
      setIsCert(false);
    } else {
      setIsCert(true);
    }
  }, []);

  const [certName, setCertName] = useState("");
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      var base64Url = token.split(".")[1];
      var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      var jwtPayload = decodeURIComponent(
        atob(base64)
          .split("")
          .map(function (c) {
            return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
          })
          .join("")
      );
      const JsonPayload = JSON.parse(jwtPayload);
      const userSeq = JsonPayload.userSeq;
    
      customAxios.get(`/users/${userSeq}`)
      .then((res)=>{
        setCertName(res.data.data.name);
      })
      .catch((res)=>{
        console.log(res);
      })
    } else {
      // 토큰이 없는 경우 처리
    }
  }, []);

  return (
    <div className={style.body}>
      <HeaderSub title={"GAP PASS"}/>
      {isCert ? (
        <div className={style.mycert}>
          <div className={style.subImgBox}>
            <img src="/images/GapPassCert.png" alt="" />
          </div>
          <div className={style.certlogoBox}>
            <img src="/images/GAPPASS.png" alt="" />
          </div>
          <div className={style.textBox}>
            <div className={style.name}>{certName}</div>
            <div className={style.detail}>이 기기에 인증서 보관중</div>
            <div className={style.detail}>{formattDate(expire) + " 만료"}</div>
          </div>
        </div>
      ):(
        <div className={style.addcert} onClick={() => { navigate("/cert/issue") }}>
          <img src="/images/Add.png" alt="" />
          <div>인증서 발급하기</div>
          <div className={style.sub}>한번 발급 받으면 유효기간 2년!</div>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default MyCertificatePage;