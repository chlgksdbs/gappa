import React, { useEffect, useState } from 'react';
import style from './LendCompletePage.module.css'
import { useNavigate } from 'react-router-dom';
import Header from '../../Common/Header';
import { customAxios } from '../../api/customAxios';

const LendCompletePage = () => {
  const navigate = useNavigate();

  const loanSeq = 16;

  const [toUser, setToUser] = useState("");
  const [fromUser, setFromUser] = useState("");
  const [principal, setPrincipal] = useState(0);
  const [myAccountNumber, setMyAccountNumber] = useState("");
  const [myBank, setMyBank] = useState("");
  const [myBalance, setMyBalance] = useState(0);
  const [yourAccountNumber, setYourAccountNumber] = useState("");
  const [yourBank, setYourBank] = useState("");

  useEffect(() => {
    getApply();
    getMyAcc();
  }, []);

  const getApply = () => {
    customAxios.get(`/loan/apply/${loanSeq}`)
    .then((res)=>{
      console.log(res);
      setToUser(res.data.toUser);
      setFromUser(res.data.fromUser);
      setPrincipal(res.data.principal);
      setYourBank(res.data.bank);
      setYourAccountNumber(res.data.accountNumber);
    })
    .catch((res)=>{
      console.log(res);
    })
  }

  const getMyAcc = () => {
    customAxios.get('/accounts/primary')
    .then((res)=>{
      console.log(res);
      setMyAccountNumber(res.data.accountNumber);
      setMyBank(res.data.bank);
      setMyBalance(res.data.balance);
    })
    .catch((res)=>{
      console.log(res);
    });
  }

  return (
    <div className={style.body}>
      <Header title={""} />
      <div className={style.container}>
        <div className={style.complete}>
          <div className={style.msg}>송금 완료!</div>
          <div className={style.money}>{principal.toLocaleString()} 원</div>
        </div>
        <div className={style.title}>상대방 계좌</div>
        <div className={style.msg}>{fromUser}</div>
        <div className={style.account}>{yourBank + " " + yourAccountNumber}</div>
        <div className={style.title}>내 계좌</div>
        <div className={style.msg}>{toUser}</div>
        <div className={style.account}>{myBank + " " + myAccountNumber}</div>
        <div className={style.detail}>
          <div className={style.detailKey}></div>
          <div className={style.detailValue}>거래 후 잔액 {myBalance.toLocaleString()} 원</div>
        </div>
      </div>
      <div className={style.btnBox}>
          <button onClick={()=> navigate('/')}>확인</button>
      </div>
    </div>
  );
};

export default LendCompletePage;