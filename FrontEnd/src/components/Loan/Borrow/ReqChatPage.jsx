import React, { useState } from 'react';
import style from './ReqChat.module.css';
import HeaderSub from '../../Common/HeaderSub';
import { useNavigate } from 'react-router-dom';

const ReqChatPage = () => {
  const navigate = useNavigate();

  const [reqStep, setReqStep] = useState(1);
  const [balance, setBalance] = useState(0);

  const formatBalance = (balance) => {
    // balance를 1,000 단위로 포맷팅하여 반환합니다.
    return balance.toLocaleString();
  };

  const plus1Handler = (() => {
    setBalance(prevBalance => prevBalance + 100000);
  })

  const plus2Handler = (() => {
    setBalance(prevBalance => prevBalance + 50000);
  })

  const plus3Handler = (() => {
    setBalance(prevBalance => prevBalance + 10000);
  })

  const plusNumberHandler = (number) => {
    setBalance((prevBalance) => {
      // 현재 balance를 문자열로 변환하고, 누른 숫자를 문자열로 추가합니다.
      const newBalanceString = prevBalance.toString() + number.toString();
      
      // 문자열을 정수로 변환한 뒤 반환합니다.
      return parseInt(newBalanceString, 10);
    });
  }

  const backspaceHandler = () => {
    setBalance(prevBalance => {
      // 현재 balance를 문자열로 변환합니다.
      const balanceString = prevBalance.toString();
  
      // 문자열에서 가장 오른쪽 숫자를 제거합니다.
      const newBalanceString = balanceString.slice(0, -1);
  
      // 문자열이 비어있으면 0으로 처리합니다.
      if (newBalanceString === "") {
        return 0;
      }
  
      // 문자열을 정수로 변환한 뒤 반환합니다.
      return parseInt(newBalanceString, 10);
    });
  }
  

  const nextHandler = (() => {
    setReqStep(prevReqStep => prevReqStep + 1);
  })

  return (
    <div className={style.main}>
      <HeaderSub title={"대출 신청"} />
      {reqStep >= 1 ?
      <>
        <div className={style.chatDiv}>
          <img src="/images/GappaChat.png" alt="" style={{height: "80px"}}/>
          <div className={style.chatContent}>
            얼마를 빌릴거에요?
          </div>
        </div>
        <div className={style.chatBalance}>
          {formatBalance(balance)}원
        </div>
      </>
      : null}
      {reqStep >= 2 ?
      <>
        <div className={style.chatDiv}>
          <img src="/images/GappaChat.png" alt="" style={{height: "80px"}}/>
          <div className={style.chatContent}>
            상환일자는 언제로 할까요?
          </div>
        </div>
      </>
      : null}
      {reqStep >= 3 ?
      <>
      </>
      : null}
      {reqStep >= 4 ?
      <>
      </>
      : null}
      <div className={style.inputDiv}>
        
        
        {reqStep === 1 ?
        <div>
          <div className={style.nextBtn} onClick={nextHandler}>
            다음
          </div>
          <div className={style.plusNum}>
            <div className={style.plusNumDiv} onClick={plus1Handler}>
              +10만
            </div>
            <div className={style.plusNumDiv} onClick={plus2Handler}>
              +5만
            </div>
            <div className={style.plusNumDiv} onClick={plus3Handler}>
              +1만
            </div>
          </div>
          <div className={style.pinkeypad}>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, "00", 0].map((number) => (
              <button
                key={number}
                className={style.pinkey}
                onClick={() => plusNumberHandler(number)}
              >
                {number}
              </button>
            ))}
            <button className={style.backspace}
            onClick={() => backspaceHandler()}>
              ←
            </button>
          </div>
        </div>
        : reqStep === 2 ?
        <div>
          <div className={style.nextBtn} onClick={nextHandler}>
            다음
          </div>
          <div className={style.plusNum}>
            <div className={style.plusNumDiv} onClick={plus1Handler}>
              +10만
            </div>
            <div className={style.plusNumDiv} onClick={plus2Handler}>
              +5만
            </div>
            <div className={style.plusNumDiv} onClick={plus3Handler}>
              +1만
            </div>
          </div>
          <div className={style.pinkeypad}>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, "00", 0].map((number) => (
              <button
                key={number}
                className={style.pinkey}
                onClick={() => plusNumberHandler(number)}
              >
                {number}
              </button>
            ))}
            <button className={style.backspace}
            onClick={() => backspaceHandler()}>
              ←
            </button>
          </div>
        </div>
        : reqStep === 3 ?
        <>
        </>
        : reqStep === 4 ?
        <>
        </>
        : null}
      </div>
    </div>
  );
};

export default ReqChatPage;