import React from 'react';
import style from './Profile.module.css';
import { useNavigate } from 'react-router-dom';
import HeaderSub from '../Common/HeaderSub';

const ProfilePage = () => {
  const navigate = useNavigate();

  
  let reliability = 62; // 신뢰도
  let borrowCnt = 2; // 대출 건수
  let lendCnt = 3; // 대금 건수
  let myProfile = true; // 내가 맞는지
  
  let title = myProfile ? "내 프로필" : "프로필";

  let overdueCnt = 7; // 연체 횟수
  let repaymentsCnt = 7; // 상환 횟수

  // 타인이면 userId 등의 식별자로 check
  // 아직 없음... 백 짜여지면 name, phone, profileImg 다 바꿔야함
  
  return (
    <div className={style.main}>
      {/* <div className={style.header}>
        <img src="./images/BackBtn.png" alt="" />
        <p className={style.title}>
          {myProfile ? ("내 프로필") : ("프로필")}
          </p>
      </div> */}
      <HeaderSub title={title}/>
      <div className={style.profile}>
        <div className={style.profileImg}>
          <img src="./images/DonghyunKoo.png" alt="" />
        </div>
        <div>
          <p className={style.name}>김동현</p>
          <p className={style.phone}>010-7387-7777</p>
        </div>
      </div>
      <p style={{width: '85%', fontWeight: 'bold', marginBottom: '30px'}}>신뢰도</p>
      <div className={style.reliabilityTotalGauge}>
        <div className={style.reliabilityGauge} style={{ width: `${reliability}%` }}>
          <div className={style.gaugeContent}>
            <div className={style.triangle}></div>
            <div className={style.reliabilityNumber}>{reliability}%</div>
          </div>
        </div>
      </div>
      {/* 아래 부분은 본인 여부에 따라 달라야함 */}
      {myProfile ? (
        <>
          <button className={style.modBtn} onClick={() => { navigate("/profile/edit") }}>프로필 수정</button>
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
          <div className={style.changeAccount} onClick={() => { navigate("/profile/accountedit") }}>
            <p>대표 계좌 변경</p>
            <img src="./images/NextBtn.png" alt="" />
          </div>
        </>
      ) : (
        // 유저 식별자가 있어야함
        <>
          <div className={style.profileCnt}>
            <div className={style.overdueCnt}>
              <p></p>
              연체 횟수
              <p className={style.overdueCntFont}>{overdueCnt}</p>
            </div>
            <div className={style.repaymentsCnt}>
              <p></p>
              상환 횟수
              <p className={style.repaymentsCntFont}>{repaymentsCnt}</p>
            </div>
          </div>
          <div className={style.deleteBtn}>
            친구 삭제
          </div>
        </>
      )}
    </div>
  );
};

export default ProfilePage;