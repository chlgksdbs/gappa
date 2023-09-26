import React from 'react';
import style from './HomePage.module.css';
import { useNavigate } from 'react-router-dom';
import HomeAccount from './HomeAccount';
import Header from '../Common/Header';
import Footer from '../Common/Footer';

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className={style.body}>
      <Header />
      <HomeAccount />
      <div className={style.loan}>
        <img src="./images/HomeDivBtn1.png" alt="" onClick={() => navigate("/reqagreement")}/>
        <img src="./images/HomeDivBtn2.png" alt="" />
        <img src="./images/HomeDivBtn3.png" alt="" />
        <img src="./images/HomeDivBtn4.png" alt="" />
        <img src="./images/HomeDivBtn5.png" alt="" />
        <img src="./images/HomeDivBtn6.png" alt="" />
      </div>

      <div className={style.historyBox}>
        <div className={style.history}>
          현재 거래중인 친구가 없어요!
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default HomePage;