import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import HeaderSub from '../../Common/HeaderSub';
import style from './HistoryBorrow.module.css';
import Footer from '../../Common/Footer';

const HistoryBorrowPage = () => {
  const navigate = useNavigate();

  const [borrows] = useState([
    { id: 1, name: '김동익', img: '/images/DonghyunKoo.png',
    balance: 200000, startdate: '2023-01-01', enddate: '2023-02-01', isStatus: 'C'},
    { id: 2, name: '김정훈',img: '/images/DonghyunKoo.png',
    balance: 100000, startdate: '2023-02-02', enddate: '2023-03-01', isStatus: 'C'},
    { id: 3, name: '김용범',img: '/images/DonghyunKoo.png',
    balance: 200000, startdate: '2023-08-02', enddate: '2023-09-01', isStatus: 'O'},
    { id: 4, name: '김동현',img: '/images/DonghyunKoo.png',
    balance: 200000, startdate: '2023-08-01', enddate: '2023-10-01', isStatus: 'D'},
    // 다른 계좌 정보 추가
  ]);

  const formatBalance = (balance) => {
    // balance를 1,000 단위로 포맷팅하여 반환합니다.
    return balance.toLocaleString();
  };

  const [borrowFilter, setBorrowFilter] = useState(1); // 기본값 1로 설정

  const handleFilterChange = (filter) => {
    setBorrowFilter(filter);
  };

  const filteredBorrows = borrows.filter((borrow) => {
    switch (borrowFilter) {
      case 2:
        return borrow.isStatus === 'C';
      case 3:
        return borrow.isStatus === 'O';
      case 4:
        return borrow.isStatus === 'D';
      default:
        return true; // 기본값 1 또는 다른 경우는 모두 반환
    }
  });

  const goToHistoryDetail = () => {
    navigate("/historydetail");
    // 이때 lend.id 값을 백으로 넘겨주고 받는 행위가 일어나야함
  };

  return (
    <div className={style.main}>
      <HeaderSub title={"대출 이력"}/>
      <div style={{fontSize: "20px"}}>
        <span onClick={() => handleFilterChange(1)} style={borrowFilter === 1 ? {color: 'black'} : {color: '#737373'}}>전체 내역</span>
        <span> | </span>
        <span onClick={() => handleFilterChange(2)} style={borrowFilter === 2 ? {color: 'black'} : {color: '#737373'}}>상환 완료</span>
        <span> | </span>
        <span onClick={() => handleFilterChange(3)} style={borrowFilter === 3 ? {color: 'black'} : {color: '#737373'}}>대출 중</span>
        <span> | </span>
        <span onClick={() => handleFilterChange(4)} style={borrowFilter === 4 ? {color: 'black'} : {color: '#737373'}}>연체 중</span>
      </div>
      <p className={style.totalCnt}>총 {filteredBorrows.length} 건</p>
      <div className={style.body}> 
        <div className={style.borrowDiv}>
          {filteredBorrows.map((borrow) => (
            <div className={style.columnDiv} key={borrow.id} onClick={() => goToHistoryDetail()}>
              <div>
                <p className={style.columnDate}>{borrow.startdate} ~ {borrow.enddate}</p>
                <div className={style.columnDiv2}>
                  <img src={borrow.img} alt="" className={style.columnImg}/>
                  <div>
                    <p className={style.columnName}>{borrow.name}</p>
                    <p>{formatBalance(borrow.balance)}원</p>
                  </div>
                </div>
              </div>
              {borrow.isStatus === 'C' ? (
                <div className={style.borrowStatus} style={{color: "blue"}}>
                  상환 완료
                </div>
              ) : borrow.isStatus === 'D' ? (
                <div className={style.borrowStatus} style={{color: "red"}}>
                  연체 중
                </div>
              ) : borrow.isStatus === 'O' ? (
                <div className={style.borrowStatus} style={{color: "black"}}>
                  대출 중
                </div>
              ) : null}
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default HistoryBorrowPage;
