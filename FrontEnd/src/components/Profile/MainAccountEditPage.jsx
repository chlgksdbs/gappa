import React, { useState } from 'react';
import style from './MainAccountEdit.module.css';
import HeaderSub from '../Common/HeaderSub';

const MainAccountEditPage = () => {
  const [accounts, setAccounts] = useState([
    { id: 1, accountNumber: '123-456-7890', bank: '싸피은행', balance: 100000, isRepresentative: true },
    { id: 2, accountNumber: '987-654-3210', bank: '정훈은행', balance: 50000, isRepresentative: false },
    { id: 3, accountNumber: '555-555-5555', bank: '용범은행', balance: 75000, isRepresentative: false },
    { id: 4, accountNumber: '123-456789-206', bank: '한윤은행', balance: 75000, isRepresentative: false },
    // 다른 계좌 정보 추가
  ]);

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
  };


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