import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import style from './HistoryDetail.module.css';
import HeaderSub from '../../Common/HeaderSub';
import Footer from '../../Common/Footer';
import { useNavigate } from 'react-router-dom';
import { customAxios } from '../../api/customAxios';

const HistoryDetailPage = (props) => {
  const navigate = useNavigate();

  const [startdate, setStartdate] = useState("");
  const [enddate, SetEnddate] = useState("");
  const [finishdate, setFinishdate] = useState("");
  const [imgURL, setURL] = useState("");
  const [myname, setMyname] = useState("");
  console.log(myname);
  const [username, setUsername] = useState("");
  const [toUserSeq, setToUserSeq] = useState(0);
  const [fromUserSeq, setFromUserSeq] = useState(0);
  const [principal, setPrincipal] = useState(0); // 원금
  const [balance, setBalance] = useState(0); // 잔액
  const [interest, setInterest] = useState(0); // 이자
  const [redemptionMoney, setRedemptionMoney] = useState(0); // 중도상환금
  const [lateDate, setLateDate] = useState(0); // 연체일
  const [status ,setStatus] = useState(''); // 상태

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
        if (res.data.isGappa === 'X') {
          setMyname(res.data.fromUserName);
		      setUsername(res.data.toUserName);
          setIsGappa(false);
        } else {
          setMyname(res.data.toUserName);
		      setUsername(res.data.fromUserName);
          setIsGappa(true);
        }
				setToUserSeq(res.data.toUserSeq);
				setFromUserSeq(res.data.fromUserSeq);
        setURL(`/images/${res.data.profileImg}`);
		    setStartdate(res.data.startDate);
		    SetEnddate(res.data.redemptionDate);
		    setFinishdate(res.data.expiredDate);
		    setPrincipal(res.data.principal);
		    setBalance(res.data.balance);
		    setInterest(res.data.interest);
		    setRedemptionMoney(res.data.redemptionMoney);
        setLateDate(res.data.lateDate);
        setStatus(res.data.status);
      })
      .catch((res)=>{
      })
  }, []);

  const goToRepayment = () => {
    const data = {
      loanSeq: loanSeq,
      userSeq: toUserSeq,
      // userSeq: 4,
      lateDate: lateDate
    };
    navigate("/repayment", { state: data });
  }

  const goToCertificate = () => {
    const data = {
      loanSeq: loanSeq,
      toUserSeq: toUserSeq,
      fromUserSeq: fromUserSeq
    };
    navigate("/certificate", { state: data });
  }

  return (
    <div className={style.main}>
      <HeaderSub title={"상세 내역"} />
      <div className={style.body}>
        <div className={style.detailDiv}>
          <div className={style.line} />
          <div className={style.div1}>
            <div>
              <p className={style.div1Date}>{formatStartdate(startdate)} ~ {formatStartdate(enddate)}</p>
              <div className={style.imgDiv}>
                <img src={imgURL} alt="" className={style.div1Img}/>
                <p className={style.div1Name}>{username}</p>
              </div>
            </div>
            <div>
              <p className={style.div1Status}>
              {
                status === 'O' ? <span style={{ color: 'blue' }}>대출중</span> :
                status === 'D' ? <span style={{ color: 'red' }}>연체중</span> :
                status === 'C' ? <span style={{ color: 'black' }}>상환완료</span> :
                null
              }
              </p>
              <p className={style.div1Balance}>{formatBalance(balance)}원</p>
            </div>
          </div>
          {/* <div className={style.line} />
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
          </div> */}
          <div className={style.line2} />
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
          <div className={style.line2} />
          <div>
            <div className={style.div2}>
              <span>대출 원금</span>
              <span>{formatPrincipal(principal)} 원</span>
            </div>
            <div className={style.div2}>
              <span>중도 상환금</span>
              <span>(-) {formatRedemptionMoney(redemptionMoney)} 원</span>
            </div>
            <div className={style.div2}>
              <span>대출 이자</span>
              <span>(+) {formatInterest(interest)} 원</span>
            </div>
            <div className={style.line2} />
            <p></p>
            <div className={style.div2}>
              <span>대출 잔액</span>
              <span>{formatBalance(balance)} 원</span>
            </div>
            <div style={{display: "flex"}}>
              <button className={style.btnStyle1} onClick={goToCertificate}>차용증 생성</button>
              {!isGappa ? (
                <button className={style.btnStyle2} onClick={goToRepayment}>상환하기</button>
              ) : (
                null
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default HistoryDetailPage;
