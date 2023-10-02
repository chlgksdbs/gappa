import React from 'react';
import style from './HomePage.module.css';
import { useNavigate } from 'react-router-dom';
import HomeAccount from './HomeAccount';
import Header from '../Common/Header';
import Footer from '../Common/Footer';

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className={style.main}>
      <Header />
      <div className={style.body}>
        <HomeAccount/>
        <div className={style.loan}>
          <div className={style.quickMenu}>퀵메뉴</div>
          <div className={style.imgDiv}>
            <img src="./images/HomeDivBtn1.png" alt="" onClick={() => navigate("/reqagreement")}/>
            <img src="./images/HomeDivBtn2.png" alt="" onClick={() => navigate("/historylend")}/>
            <img src="./images/HomeDivBtn3.png" alt="" onClick={() => navigate("/historyborrow")}/>
            <img src="./images/HomeDivBtn4.png" alt="" onClick={() => navigate("/historyborrow")}/>
            <img src="./images/HomeDivBtn5.png" alt="" onClick={() => navigate("/friends")}/>
            <img src="./images/HomeDivBtn6.png" alt="" onClick={() => navigate("/lend/list")}/>
          </div>
        </div>

        <div className={style.historyBox}>
          <div className={style.history}>
            현재 거래중인 친구가 없어요!
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default HomePage;