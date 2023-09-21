import React, { useState } from 'react';
import style from './AccountDetail.module.css';
import Footer from '../Common/Footer';
import HeaderSub from '../Common/HeaderSub';

const AccountDetail = () => {
  const myAccount = "카카오 3333-033-757-283";
  const money = 2500;

  const transactions = [
    { 형태: "입금", 얼마: 11000, 잔액: 11123, description: "월급", time: "2023-09-18 10:00" },
    { 형태: "입금", 얼마: 5000, 잔액: 16123, description: "용돈", time: "2023-09-19 14:30" },
    { 형태: "출금", 얼마: 3000, 잔액: 13123, description: "식비", time: "2023-09-20 12:15" }
  ];

  const [filter, setFilter] = useState("전체");

  const filteredTransactions = filter === "전체"
    ? transactions
    : transactions.filter(transaction => transaction.형태 === filter);

  return (
    <div className={style.body}>
      <HeaderSub title={"내 계좌"} />

      <div className={style.info}>
        <p className={style.title}>{myAccount}</p>
        <p className={style.title}>{money.toLocaleString()}원</p>
      </div>

      <div className={style.filter}>
        <select value={filter} onChange={e => setFilter(e.target.value)}>
          <option value="전체">전체</option>
          <option value="입금">입금</option>
          <option value="출금">출금</option>
        </select>
      </div>

      <div>
        {filteredTransactions.map((transaction, index) => (
          <div key={index} className={style.transactionBox}>
            <p className={style.transactionType}>형태: {transaction.형태}</p>
            <p className={style.transactionAmount + (transaction.형태 === '출금' ? ' ' + style.negative : '')}>얼마: {transaction.얼마}원</p>
            <p>{transaction.description}</p>
            <p>시간: {transaction.time}</p>
            <p>잔액: {transaction.잔액}원</p>
          </div>
        ))}
      </div>
      <Footer />
    </div>
  );
};

export default AccountDetail;
