import React from 'react';
import style from './HomePage.module.css';

import HomeAccount from './HomeAccount';
import Header from './Header';
import Footer from './Footer';

const HomePage = () => {
  return (
    <div className={style.body}>
      <Header />
      <HomeAccount />
      <div className={style.loan}>
        <div className={style.loandiv}>
          대출 신청
          <img src="./images/Bankroll.png" alt="" />
        </div>
        <div className={style.loandiv}>
          대출 확인
          <img src="./images/History.png" alt="" />
        </div>
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