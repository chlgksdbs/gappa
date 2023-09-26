import React from 'react';
import style from './NotificationPage.module.css';
import Header from '../Common/Header';
import Footer from '../Common/Footer';

const NotificationPage = () => {
  return (
    <div className={style.body}>
      <Header title={"알림함"} />
      <div className={style.notiBox}>
        <div className={style.notiItem}>
          ㅋㅋ
        </div>
        <div className={style.notiItem}>
          ㅋㅋ
        </div>
        <div className={style.notiItem}>
          ㅋㅋ
        </div>
        <div className={style.notiItem}>
          ㅋㅋ
        </div>
        <div className={style.notiItem}>
          ㅋㅋ
        </div>
        <div className={style.notiItem}>
          ㅋㅋ
        </div>
        <div className={style.notiItem}>
          ㅋㅋ
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default NotificationPage;