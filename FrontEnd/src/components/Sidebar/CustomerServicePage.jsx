import React from 'react';
import HeaderSub from '../Common/HeaderSub';
import style from './CustomerService.module.css';

const CustomerServicePage = () => {
  return (
    <div className={style.main}>
      <HeaderSub title={"GAPPA 고객센터 안내"}/>
      <div className={style.guide}>
        <div className={style.guidedetail}>
          <span>채팅 | </span>
          <span>평일 : 08:00 ~ 22:00</span>
        </div>
        <div className={style.guidedetail}>
          <span>통화 | </span>
          <span>평일 : 08:00 ~ 22:00</span>
        </div>
        <div className={style.guidedetail}>
          <span></span>
          <span>토요일 : 09:00 ~ 18:00</span>
        </div>
        <div className={style.guidedetail}>
          <span></span>
          <span>일요일, 공휴일 : 휴무</span>
        </div> 
      </div>

      <div className={style.serviceBtn}>
        <div className={style.serviceBtnContainer}>
          <p></p>
          <img src="/images/emailBtn.png" alt="" style={{width: "50px"}}/>
          <p>채팅 상담</p>
        </div>
        <div className={style.serviceBtnContainer}>
          <p></p>
          <img src="/images/callBtn.png" alt=""  style={{width: "50px"}}/>
          <p>전화 상담</p>
        </div>
      </div>
    </div>
  );
};

export default CustomerServicePage;