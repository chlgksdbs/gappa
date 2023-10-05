import React, { useState, useEffect } from 'react';
import style from './HomeAccount.module.css';
import { customAxios } from '../api/customAxios';
import { useNavigate } from 'react-router-dom';

const HomeAccount = () => {
  const navigate = useNavigate();

  let [isExistAccount, setIsExistAccount] = useState(false);
  let [accountSeq, setAccountSeq] = useState(0);
  let [account, setAccount] = useState("");
  let [bank, setBank] = useState("");
  let [money, setMoney] = useState(0);

  useEffect(() => {
    customAxios.get(`/accounts/primary`)
      .then((res)=>{
        if (res.data.accountSeq > 0) {
          setAccountSeq(res.data.accountSeq);
          setAccount(res.data.accountNumber);
          setBank(res.data.bank);
          setMoney(res.data.balance);
          setIsExistAccount(true);
        }
      })
      .catch((res)=>{
      })

  })
  
  const accountDetailHandler = (() => {
    const data = accountSeq;
    navigate("/account", {state: data});
  })

  return (
    <div className={style.accBox}>
      <div className={style.title}>
        내 계좌
      </div>
      {isExistAccount ? (
        <div className={style.myAcc}>
          <div>
            <span className={style.titleText} style={{paddingTop: "10px"}}>대표계좌</span>
            <span className={style.titleText} style={{paddingTop: "10px"}}>{bank}</span>
          </div>
          <div className={style.contentText}>{account}<p></p></div>
          <div className={style.titleText}>잔액</div>
          <div className={style.contentText} style={{fontSize: "1.8rem"}}>{money.toLocaleString()}원</div>
          <div className={style.subTitles} style={{display:'flex'}}>
            <div className={style.accountHistory} onClick={accountDetailHandler}>
              계좌이용내역
            </div>
            <div></div>
            <div className={style.accountChange} onClick={() => navigate("/profile/accountedit")}>
              대표계좌변경
            </div>
          </div>
        </div>
      ) : (
        <div className={style.myAcc}>
          <img src="./images/Add.png" alt="" />
          <p style={{marginBottom: "0", fontSize: "20px"}}>계좌 등록하기</p>
        </div>
      )}
    </div>
  );
};

export default HomeAccount;