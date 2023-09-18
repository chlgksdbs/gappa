import React from 'react';
import style from './Profile.module.css';

const ProfilePage = () => {
  const reliability = 62; // 신뢰도
  const borrowCnt = 2; // 대출 건수
  const lendCnt = 3; // 대금 건수

  return (
    <div className={style.main}>
      <div className={style.header}>
        <img src="./images/BackBtn.png" alt=""/>
        <p className={style.title}>마이페이지</p>
      </div>
      <div className={style.profile}>
        <div className={style.profileImg}>
          <img src="./images/DonghyunKoo.png" alt=""/>
        </div>
        <div>
          <p className={style.name}>김동현</p>
          <p className={style.phone}>010-7387-7777</p>
        </div>
      </div>
      <button className={style.modBtn}>프로필 수정</button>
      <p style={{width: '85%', fontWeight: 'bold', marginBottom: '30px'}}>신뢰도</p>
      <div className={style.reliabilityTotalGauge}>
        <div className={style.reliabilityGauge} style={{ width: `${reliability}%` }}>
          <div className={style.gaugeContent}>
            <div className={style.triangle}></div>
            <div className={style.reliabilityNumber}>{reliability}%</div>
          </div>
        </div>
      </div>
      <div className={style.borrowList}>
        <p>대출 이력 {borrowCnt}건</p>
        <img src="./images/NextBtn.png" alt="" />
      </div>
      <div className={style.line} />
      <div className={style.lendList}>
        <p>대금 이력 {lendCnt}건</p>
        <img src="./images/NextBtn.png" alt="" />
      </div>
      <div className={style.line} />
      <div className={style.changeAccount}>
        <p>대표 계좌 변경</p>
        <img src="./images/NextBtn.png" alt="" />
      </div>
    </div>
  );
};

export default ProfilePage;