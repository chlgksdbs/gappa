import React, { useState, useEffect } from 'react';
import style from './Repayment.module.css';
import HeaderSub from '../../Common/HeaderSub';
import { customAxios } from '../../api/customAxios';
import { useLocation } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import PinPasswordVerify from '../../Auth/PinPasswordVerify';

const RepaymentPage = () => {
  const location = useLocation();
  const data = location.state;

  const [imgURL, setURL] = useState("");
  const [username, setUsername] = useState("");
  const [userphone, setUserphone] = useState("");
  const [balance, setBalance] = useState(0);
  // const [lateDate, setLateDate] = useState(0);
  const lateDate = data.lateDate;
  
  const [redemption, setRedemption] = useState(0);

  const [showPin, setShowPin] = useState(false);
  
  const plus1Handler = (() => {
    setRedemption(balance);
  })

  const plus2Handler = () => {
    const newRedemption = redemption + 100000;
    setRedemption(newRedemption > balance ? balance : newRedemption);
  };
  
  const plus3Handler = () => {
    const newRedemption = redemption + 50000;
    setRedemption(newRedemption > balance ? balance : newRedemption);
  };
  
  const plus4Handler = () => {
    const newRedemption = redemption + 10000;
    setRedemption(newRedemption > balance ? balance : newRedemption);
  };

  const VerifyHandler = (status) => {
    if(status === true){
      setShowPin(false);
      repayment();
    }
  }

  // const [accountSeq, setAccountSeq] = useState("");
  // const [account, setAccount] = useState("");
  const [bank, setBank] = useState("");
  const [money, setMoney] = useState(0);

  const formatBalance = (balance) => {
    // balance를 1,000 단위로 포맷팅하여 반환합니다.
    return balance.toLocaleString();
  };

  // 핸드폰 번호 포맷
  const formatPhoneNumber = (phoneNumber) => {
    const formattedNumber = phoneNumber.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3');
    return formattedNumber;
  };

  useEffect(() => {
    customAxios.get(`/users/${data.userSeq}`)
    .then((res)=>{
      setURL(`/images/${res.data.data.profileImg}`);
      setUsername(res.data.data.name);
      setUserphone(formatPhoneNumber(res.data.data.phone));
    })
    .catch((res)=>{
    })

    customAxios.get(`/loan/history/${data.loanSeq}`)
    .then((res)=>{
      setBalance(res.data.balance);
    })
    .catch((res)=>{
    })

    customAxios.get(`/accounts/primary`)
    .then((res)=>{
      setBank(res.data.bank);
      setMoney(res.data.balance);
    })
    .catch((res)=>{
    })
  })

  const repaymentHandler = () => {
    setShowPin(true);
  }

  const repayment = () => {
    const repaymentData = { 
      loanSeq: data.loanSeq,
      amount: redemption
    }
    customAxios.post("/loan/money/redemption", repaymentData)
    .then((res)=>{
      toast.success("상환 했습니다.", {
        duration: 1000,
      });
      setTimeout(() => {
        window.location.replace("/historyborrow");
      }, 1000);
    })
    .catch((res)=>{
      toast.error("상환에 실패했습니다.", {
        duration: 1000,
      });
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    })
  }

  return (
    <>
      { showPin ? (
        <div>
          <PinPasswordVerify result={VerifyHandler}/>
        </div>
      ) : (
      <div className={style.main}>
      <HeaderSub title={"대출 상환"}/>
      <div><Toaster /></div>
      <div className={style.body}>
        <div className={style.title}>
          대출내역
        </div>
        <div className={style.columnDiv}>
          <img src={imgURL} alt='' className={style.columnImg}/>
          <div>
            <p className={style.columnName}>{username}</p>
            <p>{userphone}</p>
          </div>
          <div>
            <p>{formatBalance(balance)} 원</p>
            <p>연체 {lateDate}일</p>
          </div>
        </div>
        <div className={style.repayment}>
          <div className={style.mainAccount}>
            <div style={{fontFamily: 'LINESeedKR-Bd'}}>내 대표계좌</div>
            <p className={style.mainAccountDiv}>{bank} | 잔액 {formatBalance(money)} 원</p>
          </div>
          <div className={style.repaymentDiv}>
            <div style={{fontFamily: 'LINESeedKR-Bd'}}>
              상환 금액
            </div>
            <div className={style.repaymentBtnDiv}>
              <div className={style.plusBtn} onClick={plus1Handler}>전액</div>
              <div className={style.plusBtn} onClick={plus2Handler}>10만</div>
              <div className={style.plusBtn} onClick={plus3Handler}>5만</div>
              <div className={style.plusBtn} onClick={plus4Handler}>1만</div>
            </div>
            <div className={style.repaymentSpan}>
              <span>금액</span>
              <span>{formatBalance(redemption)} 원</span>
            </div>
          </div>
        </div>
      </div>
      <div className={style.inputDiv}>
        <div className={style.nextBtn} onClick={repaymentHandler}>
          상환하기
        </div>
      </div>
    </div>
    )}
  </>
  );
};

export default RepaymentPage;