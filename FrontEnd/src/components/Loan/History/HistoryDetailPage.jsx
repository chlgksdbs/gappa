import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import style from './HistoryDetail.module.css';
import HeaderSub from '../../Common/HeaderSub';
import Footer from '../../Common/Footer';
import { customAxios } from '../../api/customAxios';

const HistoryDetailPage = (props) => {
  const [startdate, setStartdate] = useState("");
  const [enddate, SetEnddate] = useState("");
  const [finishdate, setFinishdate] = useState("");
  const [imgURL, setURL] = useState("");
  const [myname, setMyname] = useState("");
  const [username, setUsername] = useState("");
  const [principal, setPrincipal] = useState(0); // 원금
  const [balance, setBalance] = useState(0); // 잔액
  const [interest, setInterest] = useState(0); // 이자
  const [redemptionMoney, setRedemptionMoney] = useState(0); // 중도상환금

  const location = useLocation();
  const loanSeq = location.state.loanId;

  const [isGappa, setIsGappa] = useState(true);

  const formatPrincipal = (principal) => {
    // principal를 1,000 단위로 포맷팅하여 반환합니다.
    return principal.toLocaleString();
  };

  const formatBalance = (balance) => {
    // balance를 1,000 단위로 포맷팅하여 반환합니다.
    return balance.toLocaleString();
  };

  const formatInterest = (interest) => {
    // interest를 1,000 단위로 포맷팅하여 반환합니다.
    return interest.toLocaleString();
  };

  const formatRedemptionMoney = (redemptionMoney) => {
    // redemptionMoney를 1,000 단위로 포맷팅하여 반환합니다.
    return redemptionMoney.toLocaleString();
  };

  const formatStartdate = (startdate) => {
    // 날짜 문자열을 Date 객체로 파싱
    if (startdate) {
      const date = new Date(startdate);
      // 년, 월, 일 추출
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0'); // 월은 0부터 시작하므로 +1 필요, 두 자리로 패딩
      const day = String(date.getDate()).padStart(2, '0'); // 두 자리로 패딩
    
      // YYYY-MM-DD 형식으로 반환
      return `${year}-${month}-${day}`;
    } else {
      return null;
    }
  };

  useEffect(() => {
    customAxios.get(`/loan/history/${loanSeq}`)
      .then((res)=>{
        console.log(res);

        if (res.data.isGappa === "X") {
          setMyname(res.data.fromUserName);
		      setUsername(res.data.toUserName);
          setIsGappa(true);
        } else {
          setMyname(res.data.toUserName);
		      setUsername(res.data.fromUserName);
          setIsGappa(false);
        }
				
        setURL(`/images/${res.data.profileImg}`);
		    setStartdate(res.data.startDate);
		    SetEnddate(res.data.redemptionDate);
		    setFinishdate(res.data.expiredDate);
		    setPrincipal(res.data.principal);
		    setBalance(res.data.balance);
		    setInterest(res.data.interest);
		    setRedemptionMoney(res.data.redemptionMoney);
      })
      .catch((res)=>{
        console.log(res);
      })
  }, []);

  return (
    <div className={style.main}>
      <HeaderSub title={"상세 내역"} />
      <div className={style.detailDiv}>
        <div className={style.line} />
        <div className={style.div1}>
          <div>
            <p className={style.div1Date}>{formatStartdate(startdate)} ~ {formatStartdate(enddate)}</p>
            <div className={style.imgDiv}>
              <img src={imgURL} alt="" className={style.div1Img}/>
              <p className={style.div1Name}>{username}</p>
            </div>
            <p className={style.div1Balance}>{formatBalance(balance)}원</p>
          </div>
          <p className={style.div1Status}>연체 중</p>
        </div>
        <div className={style.line} />
        <div>
          {isGappa ? 
          <>
            <div className={style.div2}>
              <span>채권자</span>
              <span>{myname}</span>
            </div>
            <div className={style.div2}>
              <span>채무자</span>
              <span>{username}</span>
            </div>
          </>
          :
          <>
            <div className={style.div2}>
              <span>채권자</span>
              <span>{username}</span>
            </div>
            <div className={style.div2}>
              <span>채무자</span>
              <span>{myname}</span>
            </div>
          </> }
        </div>
        <div className={style.line} />
        <div>
          <div className={style.div2}>
            <span>대출 실행일</span>
            <span>{formatStartdate(startdate)}</span>
          </div>
          <div className={style.div2}>
            <span>상환 예정일</span>
            <span>{formatStartdate(enddate)}</span>
          </div>
          <div className={style.div2}>
            <span>상환 완료일</span>
            <span>{formatStartdate(finishdate)}</span>
          </div>
        </div>
        <div className={style.line} />
        <div>
          <div className={style.div2}>
            <span>대출 원금</span>
            <span>{formatPrincipal(principal)} 원</span>
          </div>
          <div className={style.div2}>
            <span>대출 잔액</span>
            <span>{formatBalance(balance)} 원</span>
          </div>
          <div className={style.div2}>
            <span>대출 이자</span>
            <span>{formatInterest(interest)} 원</span>
          </div>
          <div className={style.div2}>
            <span>중도 상환금</span>
            <span>{formatRedemptionMoney(redemptionMoney)} 원</span>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default HistoryDetailPage;
