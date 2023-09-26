import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import style from './HistoryBorrow.module.css';
import HeaderSub from '../../Common/HeaderSub';
import Footer from '../../Common/Footer';
import { customAxios } from '../../api/customAxios';

const HistoryBorrowPage = () => {
  const navigate = useNavigate();

  const [borrows,setBorrows] = useState([]);

  const formatBalance = (balance) => {
    // balance를 1,000 단위로 포맷팅하여 반환합니다.
    return balance.toLocaleString();
  };

  const formatStartdate = (startdate) => {
    // 날짜 문자열을 Date 객체로 파싱
    const date = new Date(startdate);
  
    // 년, 월, 일 추출
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // 월은 0부터 시작하므로 +1 필요, 두 자리로 패딩
    const day = String(date.getDate()).padStart(2, '0'); // 두 자리로 패딩
  
    // YYYY-MM-DD 형식으로 반환
    return `${year}-${month}-${day}`;
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

  const goToHistoryDetail = (borrow) => {
    navigate("/historydetail", { state: { loanId: borrow.id } });
  };

  useEffect(() => {    
    customAxios.get(`/loan`)
      .then((res)=>{
        console.log(res);

        const updatedBorrows = res.data.map((borrow) => ({
          id: borrow.loanSeq,
          name: borrow.toUser,
          img: `/images/${borrow.profileImg}`,
          balance: borrow.principal,
          startdate: borrow.startDate,
          enddate: borrow.redemptionDate,
          isStatus: borrow.status,
        }));
        setBorrows(updatedBorrows);
      })
      .catch((res)=>{
        console.log(res);
      })
  }, []);

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
            <div className={style.columnDiv} key={borrow.id} onClick={() => goToHistoryDetail(borrow)}>
              <div>
                <p className={style.columnDate}>{formatStartdate(borrow.startdate)} ~ {formatStartdate(borrow.enddate)}</p>
                <div className={style.columnDiv2}>
                  <img src={borrow.img} alt="" className={style.columnImg}/>
                  <div>
                    <p className={style.columnName}>{borrow.name}</p>
                    <p>{formatBalance(borrow.balance)}원</p>
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
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default HistoryBorrowPage;
