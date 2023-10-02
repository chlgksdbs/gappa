import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import style from './HistoryLend.module.css';
import HeaderSub from '../../Common/HeaderSub';
import Footer from '../../Common/Footer';
import { customAxios } from '../../api/customAxios';

const HistoryLendPage = () => {
  const navigate = useNavigate();

  const [lends,setLends] = useState([]);

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

  const [lendFilter, setLendFilter] = useState(1); // 기본값 1로 설정

  const handleFilterChange = (filter) => {
    setLendFilter(filter);
  };

  const filteredLends = lends.filter((lend) => {
    switch (lendFilter) {
      case 2:
        return lend.isStatus === 'C';
      case 3:
        return lend.isStatus === 'O';
      case 4:
        return lend.isStatus === 'D';
      default:
        return true; // 기본값 1 또는 다른 경우는 모두 반환
    }
  });

  const goToHistoryDetail = (loan) => {
    console.log(loan);
    navigate("/historydetail", { state: { loanId: loan.id } });
  };

  useEffect(() => {    
    customAxios.get(`/loan/opp`)
      .then((res)=>{
        console.log(res);

        const updatedLends = res.data.map((lend) => ({
          id: lend.loanSeq,
          name: lend.fromUser,
          img: `/images/${lend.profileImg}`,
          restMoney: lend.restMoney,
          principal: lend.principal,
          startdate: lend.startDate,
          enddate: lend.redemptionDate,
          isStatus: lend.status,
        }));
        setLends(updatedLends);
      })
      .catch((res)=>{
        console.log(res);
      })
  }, []);

  return (
    <div className={style.main}>
      <HeaderSub title={"대금 이력"}/>
      <div style={{fontSize: "20px"}}>
        <span onClick={() => handleFilterChange(1)} style={lendFilter === 1 ? {color: 'black'} : {color: '#737373'}}>전체 내역</span>
        <span> | </span>
        <span onClick={() => handleFilterChange(2)} style={lendFilter === 2 ? {color: 'black'} : {color: '#737373'}}>상환 완료</span>
        <span> | </span>
        <span onClick={() => handleFilterChange(3)} style={lendFilter === 3 ? {color: 'black'} : {color: '#737373'}}>대출 중</span>
        <span> | </span>
        <span onClick={() => handleFilterChange(4)} style={lendFilter === 4 ? {color: 'black'} : {color: '#737373'}}>연체 중</span>
      </div>
      <p className={style.totalCnt}>총 {filteredLends.length} 건</p>
      <div className={style.body}>
      <div className={style.lendDiv}>
        {filteredLends.map((lend) => (
          <div className={style.columnDiv} key={lend.id} onClick={() => goToHistoryDetail(lend)}>
            <div>
              <p className={style.columnDate}>{formatStartdate(lend.startdate)} ~ {formatStartdate(lend.enddate)}</p>
              <div className={style.columnDiv2}>
                <img src={lend.img} alt="" className={style.columnImg}/>
                <div>
                  <p className={style.columnName}>{lend.name}</p>
                  {/* <p>{formatBalance(lend.balance)}원 / {formatBalance(lend.principal)}원</p> */}
                  <span style={{fontSize: "18px"}}>{formatBalance(lend.restMoney)}원</span>
                  <span> / </span><br/>
                  <span style={{fontSize: "14px"}}>{formatBalance(lend.principal)}원</span>
                </div>
              </div>
            </div>
            {lend.isStatus === 'C' ? (
              <div className={style.lendStatus} style={{color: "blue"}}>
                상환 완료
              </div>
            ) : lend.isStatus === 'D' ? (
              <div className={style.lendStatus} style={{color: "red"}}>
                연체 중
              </div>
            ) : lend.isStatus === 'O' ? (
              <div className={style.lendStatus} style={{color: "black"}}>
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

export default HistoryLendPage;
