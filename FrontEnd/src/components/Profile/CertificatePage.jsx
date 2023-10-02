import React, { useState, useEffect } from 'react';
import style from './Certificate.module.css';
import HeaderSub from '../Common/HeaderSub';
import { customAxios } from '../api/customAxios';
import toast, { Toaster } from 'react-hot-toast';

const CertificatePage = () => {
  const [accounts, setAccounts] = useState([]);
  const [selectedAccount, setSelectedAccount] = useState(null);

  const formatBalance = (balance) => {
    // balance를 1,000 단위로 포맷팅하여 반환합니다.
    return balance.toLocaleString();
  };

  const setAsRepresentative = (id) => {
    setSelectedAccount(id);
  };
  
  const nextHandler = () => {
    const requestData = {
      accountSeq: selectedAccount,
    };
    
    console.log(requestData);
    customAxios.put(`/accounts/primary`, requestData)
    .then((res)=>{
      toast.success("대표 계좌 변경 성공!", {
        duration: 1000,
      });
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    })
    .catch((error) => {
      // 오류 발생 시 처리
      console.error("대표 계좌 변경 오류:", error);
    });
    
  }

  useEffect(() => {
    customAxios.get(`/accounts`)
    .then((res)=>{
      // 서버에서 받은 데이터로 accounts 상태를 업데이트
      const updatedAccounts = res.data.map((account) => ({
        id: account.accountSeq,
        accountNumber: account.accountNumber,
        bank: account.bank,
        balance: account.balance,
        isRepresentative: account.repAccount,
      }));
      setAccounts(updatedAccounts);
      console.log(res);
    })
    .catch((res)=>{
      console.log(res);
    })
  }, []);


  return (
    <div className={style.main}>
      <HeaderSub title={"대표 계좌 변경"}/>
      <div><Toaster /></div>
      <div className={style.body}>
        {accounts.length === 0 ?
        <div className={style.noneAccountDiv}>
          <img src="/images/GappaMascot.png" alt="" style={{width: "150px"}}/>
          <p>등록된 계좌가 없어요</p>
        </div>
        :
        <>
          {/* 대표 계좌를 먼저 출력합니다. */}
          {accounts.map((account) => (
            account.isRepresentative && (
              <div
                key={account.id}
                className={`${style.accountDiv} ${selectedAccount === account.id ? style.selected : ''}`}
                onClick={() => setAsRepresentative(account.id)}
              >
                <div className={style.accountDetail1}>
                  {account.accountNumber}   <img src="/images/MainAccount.png" alt="" style={{marginLeft: "15px", height: "20px"}}/>
                </div>
                <div className={style.accountDetail2}>
                  <p>{account.bank}</p>
                  <p>{formatBalance(account.balance)}원</p>
                </div>
                <div className={style.line} />
              </div>
            )
          ))}

          {/* 그 외의 계좌들을 출력합니다. */}
          {accounts.map((account) => (
            !account.isRepresentative && (
              <div
                key={account.id}
                className={`${style.accountDiv} ${selectedAccount === account.id ? style.selected : ''}`}
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
            )
          ))}
        </>
        }
      </div>
      <div className={style.inputDiv}>
      {accounts.length === 0 ?
        null
        :
        <>
          {selectedAccount === null ?
            <div className={style.notbtn}>
              변경
            </div>
          :
            <div className={style.nextBtn} onClick={nextHandler}>
              변경
            </div>
          }
        </>
      }
      </div>
    </div>
  );
};

export default CertificatePage;