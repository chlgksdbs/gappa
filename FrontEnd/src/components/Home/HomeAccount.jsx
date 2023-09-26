import React from 'react';
import style from './HomeAccount.module.css';

const HomeAccount = () => {
  let isExistAccount = true;
  let account = "카카오 3333-033-757-283"
  let money = 314159265358979
  
  return (
    <div className={style.accBox}>
      <div className={style.title}>
        내 계좌
      </div>
      {isExistAccount ? (
        <div className={style.myAcc}>
          <div>계좌번호</div>
          <div>{account}<p></p></div>
          <div>잔액</div>
          <div>{money.toLocaleString()}원</div>
        </div>
      ) : (
        <div className={style.myAcc}>
          <img src="./images/Add.png" alt="" />
          계좌 등록하기
        </div>
      )}
    </div>
  );
};

export default HomeAccount;