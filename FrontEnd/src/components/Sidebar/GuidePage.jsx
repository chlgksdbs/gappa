import React from 'react';
import style from './GuidePage.module.css';
import HeaderSub from '../Common/HeaderSub';

const GuidePage = () => {
  return (
    <div className={style.body}>
      <HeaderSub title={"푸시알림 가이드"} />
      <div className={style.pushguide}>
        <div className={style.title}>
          푸시알림 활성화를 위해서는 <br/>다음과 같은 절차가 필요합니다.
          <hr/>
        </div>
        <div>
          <img className={style.guideImg}src="/images/push1.jpg" alt="" />
          <div className={style.sub}>1. 알림 설정 버튼을 활성화 하면<br /> 알림권한 허용요청이 나타납니다.</div>
          <div className={style.sub}>2. 해당 요청을 승인하면 <br />푸시알림이 활성화 됩니다.</div>
        </div>
        <hr />
      
        <div className={style.title}>
          📱 안드로이드<br /> Chrome 모바일 환경에서 정상작동합니다.
        </div>
        <hr/>
        <div className={style.title}>
          🍎 iOS <br />크롬 또는 Safari 환경에서 개별 설정이 필요합니다.
          <div>
            <img className={style.guideImg}src="/images/guide1.jpg" alt="" />
            <div className={style.sub}>1. 공유 버튼을 클릭합니다.</div>
            <br />
            <img className={style.guideImg}src="/images/guide2.jpg" alt="" />
            <div className={style.sub}>2. 홈 화면에 추가 버튼을 클릭합니다.</div>
            <br />
            <img className={style.guideImg}src="/images/guide3.jpg" alt="" />
            <div className={style.sub}>3. 이름을 확인/설정하고 추가 버튼을 클릭합니다.</div>
            <br />
            <img className={style.guideImg}src="/images/guide4.jpg" alt="" />
            <div className={style.sub}>4. 생성된 아이콘을 통해 서비스를 이용해주세요!</div>
          </div>
        </div>
        <hr />
        <div className={style.blank}></div>
      </div>
    </div>
  );
};

export default GuidePage;