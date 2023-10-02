import React, { useState, useEffect } from 'react';
import style from './HomeAccount.module.css';
import { customAxios } from '../api/customAxios';
import { useNavigate } from 'react-router-dom';

const HomeAccount = () => {
  const navigate = useNavigate();

  let isExistAccount = true;
  let [accountSeq, setAccountSeq] = useState("");
  let [account, setAccount] = useState("");
  let [bank, setBank] = useState("");
  let [money, setMoney] = useState(0);

  useEffect(() => {
    customAxios.get(`/accounts/primary`)
      .then((res)=>{
        console.log(res);
        setAccountSeq(res.data.accountSeq);
        setAccount(res.data.accountNumber);
        setBank(res.data.bank);
        setMoney(res.data.balance);
      })
      .catch((res)=>{
        console.log(res);
      })

  })
  
  const accountDetailHandler = (() => {
    const data = accountSeq;
    navigate("/account", {state: data});
  })

  return (
    <div className={style.accBox} onClick={accountDetailHandler}>
      <div className={style.title}>
        내 계좌
      </div>
      {isExistAccount ? (
        <div className={style.myAcc}>
          <div>
            <span className={style.titleText} style={{paddingTop: "10px"}}>계좌번호</span>
            <span className={style.titleText} style={{paddingTop: "10px"}}>{bank}</span>
            </div>
          <div className={style.contentText}>{account}<p></p></div>
          <div className={style.titleText}>잔액</div>
          <div className={style.contentText}>{money.toLocaleString()}원</div>
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