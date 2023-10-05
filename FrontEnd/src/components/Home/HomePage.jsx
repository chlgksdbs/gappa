import React from 'react';
import style from './HomePage.module.css';
import { useNavigate } from 'react-router-dom';
import HomeAccount from './HomeAccount';
import Header from '../Common/Header';
import Footer from '../Common/Footer';
import NowTransaction from './NowTransaction';
import toast, { Toaster } from 'react-hot-toast';

const HomePage = () => {
  const navigate = useNavigate();

  const reqBorrow = () => {
    const isCPK = localStorage.getItem("CPK");
    const isExpire = localStorage.getItem("expire");
    if(isCPK === null || isExpire === null){
      toast.error("인증서 발급이 필요합니다", {
        duration: 1000,
      });
      setTimeout(() => {
        navigate("/mycertificate")
      }, 1000);
    } else {
      navigate("/reqagreement")
    }
  }

  return (
    <div className={style.main}>
      <Header />
      <Toaster />
      <div className={style.body}>
        <HomeAccount/>
        <div className={style.loan}>
          <div className={style.quickMenu}>퀵메뉴</div>
          <div className={style.imgDiv}>
            <img src="/images/HomeDivBtn1.png" alt="" onClick={reqBorrow}/>
            <img src="/images/HomeDivBtn2.png" alt="" onClick={() => navigate("/historylend")}/>
            <img src="/images/HomeDivBtn3.png" alt="" onClick={() => navigate("/historyborrow")}/>
            <img src="/images/HomeDivBtn4.png" alt="" onClick={() => navigate("/historyborrow")}/>
            <img src="/images/HomeDivBtn5.png" alt="" onClick={() => navigate("/mycertificate")}/>
            <img src="/images/HomeDivBtn6.png" alt="" onClick={() => navigate("/lend/list")}/>
          </div>
        </div>

        <div className={style.historyBox}>
          <div className={style.history}>
            <NowTransaction/>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default HomePage;