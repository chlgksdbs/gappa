import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import style from './HistoryDetail.module.css';
import HeaderSub from '../../Common/HeaderSub';
import Footer from '../../Common/Footer';
import { customAxios } from '../../api/customAxios';

const HistoryDetailPage = (props) => {
  const today = new Date();
  const [startdate, setStartdate] = useState("");
  const [enddate, SetEnddate] = useState("");
  const [finishdate, setFinishdate] = useState("");
  const imgURL = '/images/DonghyunKoo.png';
  const [myname, setMyname] = useState("");
  const [username, setUsername] = useState("");
  const [principal, setPrincipal] = useState(0); // 원금
  const [balance, setBalance] = useState(0); // 잔액
  const [interest, setInterest] = useState(0); // 이자
  const [redemptionMoney, setRedemptionMoney] = useState(0); // 중도상환금

  const location = useLocation();
  const loanSeq = location.state.loanId;

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

  useEffect(() => {
    customAxios.get(`/loan/history/${loanSeq}`)
      .then((res)=>{
        console.log(res);

				setMyname(res.data.toUserName);
		    setUsername(res.data.fromUserName);
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
            <p className={style.div1Date}>{startdate} ~ {enddate}</p>
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
          <div className={style.div2}>
            <span>채권자</span>
            <span>{myname}</span>
          </div>
          <div className={style.div2}>
            <span>채무자</span>
            <span>{username}</span>
          </div>
        </div>
        <div className={style.line} />
        <div>
          <div className={style.div2}>
            <span>대출 실행일</span>
            <span>{startdate}</span>
          </div>
          <div className={style.div2}>
            <span>상환 예정일</span>
            <span>{enddate}</span>
          </div>
          <div className={style.div2}>
            <span>상환 완료일</span>
            <span>{finishdate}</span>
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
