import React from 'react';
import Headers from './Headers';
import style from './MasterBankBookPage.module.css';
const MasterBankBookPage = () => {
  const right = "다음";
  return (
    <div className={style.masterbankbookpage}>
      <Headers right={right}/>
      <div className={style.masterbankbookpages}>
        <img src="images/Check.png" alt="" />
        <span>대표 계좌 등록이 완료되었습니다.</span>
        <span>수집 완료까지 보통 1분에서 2분 정도 소요됩니다.</span>
        <span>서버상태에 따라 최대 한 시간이 걸릴 수 있습니다.</span>
      </div>
      <div>
        
      </div>
    </div>
  );
}

export default MasterBankBookPage;
