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
        const updatedBorrows = res.data.map((borrow) => ({
          id: borrow.loanSeq,
          name: borrow.toUser,
          img: `/images/${borrow.profileImg}`,
          restMoney: borrow.restMoney,
          principal: borrow.principal,
          startdate: borrow.startDate,
          enddate: borrow.redemptionDate,
          isStatus: borrow.status,
        }));
        setBorrows(updatedBorrows);
      })
      .catch((res)=>{
      })
  }, []);

  return (
    <div className={style.main}>
      <HeaderSub title={"대출 이력"}/>
      <div className={style.body}>
        <div style={{fontSize: "20px", textAlign: "center"}}>
          <span onClick={() => handleFilterChange(1)} style={borrowFilter === 1 ? {color: 'rgb(96, 207, 185)', fontWeight:'bolder'} : {color: '#737373'}}>전체</span>
          <span style={{color:'lightgray'}}>&nbsp;&nbsp; | &nbsp;&nbsp;</span>
          <span onClick={() => handleFilterChange(2)} style={borrowFilter === 2 ? {color: 'rgb(96, 207, 185)', fontWeight:'bolder'} : {color: '#737373'}}>상환완료</span>
          <span style={{color:'lightgray'}}>&nbsp;&nbsp; | &nbsp;&nbsp;</span>
          <span onClick={() => handleFilterChange(3)} style={borrowFilter === 3 ? {color: 'rgb(96, 207, 185)', fontWeight:'bolder'} : {color: '#737373'}}>대출중</span>
          <span style={{color:'lightgray'}}>&nbsp;&nbsp; | &nbsp;&nbsp;</span>
          <span onClick={() => handleFilterChange(4)} style={borrowFilter === 4 ? {color: 'rgb(96, 207, 185)', fontWeight:'bolder'} : {color: '#737373'}}>연체중</span>
        </div>
        <p className={style.totalCnt}>총 {filteredBorrows.length} 건</p>
        <div className={style.borrowDiv}>
          {filteredBorrows.map((borrow) => (
            <div className={style.columnDiv} key={borrow.id} onClick={() => goToHistoryDetail(borrow)}>
              <div>
                <p className={style.columnDate}>{formatStartdate(borrow.startdate)} ~ {formatStartdate(borrow.enddate)}</p>
                <div className={style.columnDiv2}>
                  <img src={borrow.img} alt="" className={style.columnImg}/>
                  <div style={{margin:'auto 0'}}>
                    <p className={style.columnName} style={{fontFamily: 'LINESeedKR-Bd'}}>{borrow.name}</p>
                    <span style={{fontSize: "15px"}}>{formatBalance(borrow.restMoney)}</span>
                    <span> / </span>
                    <span style={{fontSize: "13px", color: "gray"}}>{formatBalance(borrow.principal)} 원</span>
                  </div>
                </div>
              </div>
              {borrow.isStatus === 'C' ? (
                <div className={style.borrowStatus} style={{color: "black"}}>
                  상환완료
                </div>
              ) : borrow.isStatus === 'D' ? (
                <div className={style.borrowStatus} style={{color: "red"}}>
                  연체중
                </div>
              ) : borrow.isStatus === 'O' ? (
                <div className={style.borrowStatus} style={{color: "blue"}}>
                  대출중
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
