import React, { useState, useEffect } from 'react';
import style from './MainAccountEdit.module.css';
import HeaderSub from '../Common/HeaderSub';
import { customAxios } from '../api/customAxios';

const MainAccountEditPage = () => {
  const [accounts, setAccounts] = useState([]);

  const representativeAccount = accounts.find((account) => account.isRepresentative);
  const otherAccounts = accounts.filter((account) => !account.isRepresentative);

  const formatBalance = (balance) => {
    // balance를 1,000 단위로 포맷팅하여 반환합니다.
    return balance.toLocaleString();
  };

  const setAsRepresentative = (id) => {
    setAccounts((prevAccounts) => {
      const updatedAccounts = prevAccounts.map((account) => ({
        ...account,
        isRepresentative: account.id === id,
      }));
      return updatedAccounts;
    });
    // put 요청

    const requestData = {
      accountSeq: id,
    };

    console.log(requestData.accountSeq);

    customAxios.post(`/accounts/primary`, requestData)
    .then((res)=>{
      console.log("대표 계좌 설정 완료");
    })
    .catch((error) => {
      // 오류 발생 시 처리
      console.error("대표 계좌 변경 오류:", error);
    });
  };

  useEffect(() => {
    // 토큰 가져오기
    const token = localStorage.getItem("token");

    if (token) {
      var base64Url = token.split(".")[1];
      var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      var jwtPayload = decodeURIComponent(
        atob(base64)
          .split("")
          .map(function (c) {
            return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
          })
          .join("")
      );
      const JsonPayload = JSON.parse(jwtPayload);
      const userSeq = JsonPayload.userSeq;
    
      customAxios.get(`/accounts/${userSeq}`)
      .then((res)=>{
        // 서버에서 받은 데이터로 accounts 상태를 업데이트
        const updatedAccounts = res.data.map((account) => ({
          id: account.accountSeq,
          accountNumber: account.accountNumber,
          bank: account.bank,
          balance: account.balance,
          isRepresentative: account.reqAccount,
        }));
        setAccounts(updatedAccounts);
        console.log(res);
      })
      .catch((res)=>{
        console.log(res);
      })

    } else {
      // 토큰이 없는 경우 처리
    }
  }, []);


  return (
    <div className={style.main}>
      <HeaderSub title={"대표 계좌 변경"}/>

      {/* 대표 계좌를 먼저 출력합니다. */}
      {representativeAccount && (
        <div
          key={representativeAccount.id}
          className={style.accountDiv}
          onClick={() => setAsRepresentative(representativeAccount.id)}
        >
          <div className={style.accountDetail1}>
            {representativeAccount.accountNumber}   <img src="/images/MainAccount.png" alt="" style={{marginLeft: "15px", height: "20px"}}/>
          </div>
          <div className={style.accountDetail2}>
            <p>{representativeAccount.bank}</p>
            <p>{formatBalance(representativeAccount.balance)}원</p>
          </div>
          <div className={style.line} />
        </div>
      )}

      {/* 그 외의 계좌들을 출력합니다. */}
      {otherAccounts.map((account) => (
        <div
          key={account.id}
          className={style.accountDiv}
          onClick={() => setAsRepresentative(account.id)}
        >
          <div className={style.accountDetail1}>
            {account.accountNumber}
          </div>
          <div className={style.accountDetail2}>
            <p>{account.bank}</p>
            <p>{formatBalance(account.balance)}원</p>
          </div>
          <div className={style.line} />
        </div>
      ))}
    </div>
  );
};

export default MainAccountEditPage;