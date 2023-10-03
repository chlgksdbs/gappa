import React, { useState, useEffect } from 'react';
import style from './MyCertificate.module.css';
import HeaderSub from '../Common/HeaderSub';
import Footer from '../Common/Footer';
import { useNavigate } from 'react-router-dom';
// import { customAxios } from '../api/customAxios';
// import toast, { Toaster } from 'react-hot-toast';

const MyCertificatePage = () => {
  const navigate = useNavigate();

  const [isCert, setIsCert] = useState(false);


  

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
            <div className={style.name}>김동현</div>
            <div className={style.detail}>이 기기에 인증서 보관중</div>
            <div className={style.detail}>2025.01.24 만료</div>
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