import React, { useEffect, useState } from 'react';
import style from './AccountDetail.module.css';
import Footer from '../Common/Footer';
import HeaderSub from '../Common/HeaderSub';
import { useLocation } from 'react-router-dom';
import { customAxios } from '../api/customAxios';

const AccountDetail = () => {
  const location = useLocation();
  const accSeq = location.state;

  const [account, setAccount] = useState("");
  const [bank, setBank] = useState("");
  const [money, setMoney] = useState(0);

  const [transaction, setTransaction] = useState([]);

  useEffect(() => {
    getMyAcc();
    getTransaction();
  }, []);

  const getMyAcc = () => {
    customAxios.get(`/accounts/primary`)
    .then((res)=>{
      console.log(res);
      setAccount(res.data.accountNumber);
      setBank(res.data.bank);
      setMoney(res.data.balance);
    })
    .catch((res)=>{
      console.log(res);
    })
  }

  const getTransaction = () => {
    const body = {
      accountSeq : accSeq
    }
    customAxios.post('/accounts/history/detail', body)
    .then((res)=>{
      console.log(res);
      setTransaction(res.data);
    })
    .catch((res)=>{
      console.log(res);
    })
  }

  //false 입금, true 출금
  const [filter, setFilter] = useState("all");

  const filteredTransaction = filter === "all"
    ? transaction.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    : transaction.filter(transaction => {
        return transaction.accountType === (filter === "true" ? true : false);
  }).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  function formatDate(dateString) {
    const options = {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    };
  
    return new Date(dateString).toLocaleString('ko-KR', options);
  }

  return (
    <div className={style.body}>
      <HeaderSub title={"내 계좌"} />

      <div className={style.info}>
        <p className={style.bank}>{bank + " " + account}</p>
        <p className={style.money}>{money.toLocaleString()}원</p>
      </div>

      <div className={style.filter}>
        <select value={filter} onChange={e => setFilter(e.target.value)}>
          <option value="all">전체</option>
          <option value="false">입금</option>
          <option value="true">출금</option>
        </select>
      </div>

      <div className={style.transactionContainer}>
        {filteredTransaction.map((transaction, index) => (
          <div key={index} className={style.transactionBox}>
            <div className={style.date}>{formatDate(transaction.createdAt)}</div>
            <div className={style.detailBox}>
              <div className={style.name}>{transaction.toUser}</div>
              <div className={style.tranMoney}>
                <div className={style.transactionAmount + (transaction.accountType === true ? ' ' + style.negative : '')}>
                  {transaction.accountType ? "-":"+"}{transaction.amount.toLocaleString()} 원
                </div>
                <div>
                  잔액 {transaction.newBalance.toLocaleString()} 원
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <Footer />
    </div>
  );
};

export default AccountDetail;
