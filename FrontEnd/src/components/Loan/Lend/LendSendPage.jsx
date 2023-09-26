import React, { useEffect, useState } from 'react';
import style from './LendSendPage.module.css';
import { useNavigate } from 'react-router-dom';
import HeaderSub from '../../Common/HeaderSub';
import { customAxios } from '../../api/customAxios';
import PinPasswordVerify from '../../Auth/PinPasswordVerify';

const LendSendPage = () => {
  const navigate = useNavigate();

  const loanSeq = 16;

  const [showPinPasswordVerify, setShowPinPasswordVerify] = useState(false);

  const [toUser, setToUser] = useState("");
  const [fromUser, setFromUser] = useState("");
  const [principal, setPrincipal] = useState(0);
  const [redemptionDate, setRedemptionDate] = useState("");
  const [myAccountNumber, setMyAccountNumber] = useState("");
  const [myBank, setMyBank] = useState("");
  const [yourAccountNumber, setYourAccountNumber] = useState("");
  const [yourBank, setYourBank] = useState("");

  const handleSendButtonClick = () => {
    setShowPinPasswordVerify(true);
  }

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
      setRedemptionDate(res.data.redemptionDate);
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
    })
    .catch((res)=>{
      console.log(res);
    });
  }

  const lendStart = () => {
    const body = {
      loanSeq : loanSeq
    };
    customAxios.post('/loan/money/lend', body)
    .then((res)=>{
      console.log(res);
      navigate('/lend/complete');
    })
    .catch((res)=>{
      console.log(res);
    });
  }

  // 날짜 포매팅 메서드
  const formattingDate = (date) => {
    var inputDate = new Date(date);
    var options = { year: 'numeric', month: 'long', day: 'numeric' };
    var formattedDate = inputDate.toLocaleDateString('ko-KR', options);
    return formattedDate;
  }

  const returnPinVerify = (status) => {
    if(status === true) {
      lendStart();
    }
  }

  return (
    <div>
      {showPinPasswordVerify ? (
        <PinPasswordVerify result={returnPinVerify} />
      ) : (
      <div className={style.body}>
        <HeaderSub title={"송금"} />
        <div className={style.accountInfoBox}>
          <div className={style.account}>{yourBank + " " +yourAccountNumber}</div>
          <div className={style.money}>{principal.toLocaleString()} 원</div>
          <div className={style.holder}>예금주 : {fromUser}</div>
        </div>
        <div className={style.detail}>
          <div className={style.detailKey}>대여원금</div>
          <div className={style.detailValue}>{principal.toLocaleString()} 원</div>
        </div>
        <div className={style.detail}>
          <div className={style.detailKey}>이자율</div>
          <div className={style.detailValue}>20%</div>
        </div>
        <div className={style.detail}>
          <div className={style.detailKey}>상환일</div>
          <div className={style.detailValue}>{formattingDate(redemptionDate)}</div>
        </div>
        <div className={style.detail}>
          <div className={style.detailKey}>상환계좌</div>
          <div className={style.detailValue}>{myBank}</div>
        </div>
        <div className={style.detail}>
          <div className={style.detailKey}></div>
          <div className={style.detailValue}>{myAccountNumber}</div>
        </div>
        <div className={style.detail}>
          <div className={style.detailKey}></div>
          <div className={style.detailValue}>{toUser}</div>
        </div>
        <div className={style.bankInput}>
          <div className={style.detailKey}>받는 분 통장 표시</div>
          <div className={style.detailValue}>{toUser}</div>
        </div>
        <div className={style.btnBox}>
          <button onClick={()=> navigate('/lend/refuse')}>거절</button>
          <button onClick={handleSendButtonClick}>송금</button>
        </div>
      </div>
      )}
    </div>
  );
};

export default LendSendPage;