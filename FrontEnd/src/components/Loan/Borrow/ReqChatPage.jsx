import React, { useState, useEffect, useRef } from 'react';
import style from './ReqChat.module.css';
import HeaderSub from '../../Common/HeaderSub';
import { useNavigate } from 'react-router-dom';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'


const ReqChatPage = () => {
  const navigate = useNavigate();

  const [reqStep, setReqStep] = useState(1);
  const [balance, setBalance] = useState(0);

  const currentDate = new Date();
  // currentDate를 YYYY-MM-DD 형식으로 변환합니다.
  const currentYear = currentDate.getFullYear();
  const currentMonth = String(currentDate.getMonth() + 1).padStart(2, '0');
  const currentDay = String(currentDate.getDate()).padStart(2, '0');
  const currentDateString = `${currentYear}-${currentMonth}-${currentDay}`;

  const [dateValue, onChange] = useState(new Date());
  const year = dateValue.getFullYear(); // 년도
  const month = String(dateValue.getMonth() + 1).padStart(2, '0'); // 월 (0부터 시작하므로 +1 필요)
  const day = String(dateValue.getDate()).padStart(2, '0'); // 날짜
  const dateAsString = `${year}-${month}-${day}`;
  const dateAsString2 = `${year}년 ${month}월 ${day}일`;

  const formatBalance = (balance) => {
    // balance를 1,000 단위로 포맷팅하여 반환합니다.
    return balance.toLocaleString();
  };

  const plus1Handler = (() => {
    setBalance(prevBalance => prevBalance + 100000);
  })

  const plus2Handler = (() => {
    setBalance(prevBalance => prevBalance + 50000);
  })

  const plus3Handler = (() => {
    setBalance(prevBalance => prevBalance + 10000);
  })

  const plusNumberHandler = (number) => {
    setBalance((prevBalance) => {
      // 현재 balance를 문자열로 변환하고, 누른 숫자를 문자열로 추가합니다.
      const newBalanceString = prevBalance.toString() + number.toString();
      
      // 문자열을 정수로 변환한 뒤 반환합니다.
      return parseInt(newBalanceString, 10);
    });
  }

  const backspaceHandler = () => {
    setBalance(prevBalance => {
      // 현재 balance를 문자열로 변환합니다.
      const balanceString = prevBalance.toString();
  
      // 문자열에서 가장 오른쪽 숫자를 제거합니다.
      const newBalanceString = balanceString.slice(0, -1);
  
      // 문자열이 비어있으면 0으로 처리합니다.
      if (newBalanceString === "") {
        return 0;
      }
  
      // 문자열을 정수로 변환한 뒤 반환합니다.
      return parseInt(newBalanceString, 10);
    });
  }
  

  const nextHandler = (() => {
    setReqStep(prevReqStep => prevReqStep + 1);
  })

  const [reason, setReason] = useState("");
  const [selectedReasonIndex, setSelectedReasonIndex] = useState(-1);

  const reasonClickHandler = (reasonValue, reasonIndex) => {
    setReason(reasonValue);
    setSelectedReasonIndex(reasonIndex);
  }

  const [reasonText, setReasonText] = useState("");

  const reasonHandleChange = (event) => {
    const value = event.target.value;
    setReasonText(value);
  }

  // 마지막 넘겨주기
  const reqFriendsHandler = () => {
    const data = {
      balance,
      dateAsString,
      reason,
      reasonText,
    };
    navigate("/reqfriends", { state: data });
  }

  // const [messages, setMessages] = useState([]);
  const messageContainerRef = useRef(null);

  useEffect(() => {
    // 스크롤을 최하단으로 이동
    if (messageContainerRef.current) {
      messageContainerRef.current.scrollTop = messageContainerRef.current.scrollHeight;
    }
  }, [reqStep, balance, dateAsString, reason, reasonText]);

  return (
    <div className={style.main}>
      <HeaderSub title={"대출 신청"} />
      <div className={style.body} ref={messageContainerRef}>
        {reqStep >= 1 ?
        <>
          <div className={style.chatDiv}>
            <div>
              <img src="/images/GappaChat.png" alt="" style={{height: "60px"}}/>
            </div>
            <div className={style.chatContent}>
              얼마를 빌릴거에요?
            </div>
          </div>
          <div className={style.chatBalance}>
            <div>{formatBalance(balance)}원</div>
          </div>
        </>
        : null}
        {reqStep >= 2 ?
        <>
          <div className={style.chatDiv}>
            <img src="/images/GappaChat.png" alt="" style={{height: "60px"}}/>
            <div className={style.chatContent}>
              상환일자는 언제로 할까요?
            </div>
          </div>
          
          {dateAsString !== currentDateString && dateValue > currentDate ? 
            <div className={style.chatBalance}>
              <div>{dateAsString2}</div>
            </div>
          : null}
        </>
        : null}
        {reqStep >= 3 ?
        <>
          <div className={style.chatDiv}>
            <img src="/images/GappaChat.png" alt="" style={{height: "60px"}}/>
            <div className={style.chatContent}>
              이용 카테고리를&nbsp;
              {/* <br/> */}
              선택해주세요!
            </div>
          </div>
          {/* {reason === "" ? null
          : 
            <>
              <div className={style.chatBalance}>
                <div>{reason}</div>
              </div>
            </>
          } */}
          <div className={style.reason}>
            <div onClick={() => reasonClickHandler("월세 대출", 1)}
            className={1 === selectedReasonIndex ? style.selectedReason : style.reasonItem}>
              월세 대출</div>
            <div onClick={() => reasonClickHandler("관리비 대출", 2)}
            className={2 === selectedReasonIndex ? style.selectedReason : style.reasonItem}>
              관리비 대출</div>
            <div onClick={() => reasonClickHandler("생활비 대출", 3)}
            className={3 === selectedReasonIndex ? style.selectedReason : style.reasonItem}>
              생활비 대출</div>
            <div onClick={() => reasonClickHandler("비상금 대출", 4)}
            className={4 === selectedReasonIndex ? style.selectedReason : style.reasonItem}>
              비상금 대출</div>
            <div onClick={() => reasonClickHandler("취미 생활 대출", 5)}
            className={5 === selectedReasonIndex ? style.selectedReason : style.reasonItem}>
              취미 생활 대출</div>
            <div onClick={() => reasonClickHandler("경조사비 대출", 6)}
            className={6 === selectedReasonIndex ? style.selectedReason : style.reasonItem}>
              경조사비 대출</div>
            <div onClick={() => reasonClickHandler("기타 사유", 7)}
            className={7 === selectedReasonIndex ? style.selectedReason : style.reasonItem}>
              기타 사유</div>
          </div>
        </>
        : null}
        {reqStep >= 4 ?
        <>
          <div className={style.chatDiv}>
            <img src="/images/GappaChat.png" alt="" style={{height: "80px"}}/>
            <div className={style.chatContent}>
              친구에게 요청할 대출사유를
              <br/>
              적어주세요!
            </div>
          </div>
          <div className={style.chatBalance}>
            <div style={{width: "205px"}}><input type="text" className={style.input} value={reasonText} onChange={reasonHandleChange} placeholder='대출 사유를 입력하세요'/></div>
          </div>
        </>
        : null}
      </div>
      {reqStep === 1 ?
      <div className={style.inputDiv}>
        <div>
          {
            balance > 0 && balance <= 500000
            ?
            <div className={style.nextBtn} onClick={nextHandler}>
              다음
            </div>
            :
            <div className={style.notbtn}>다음</div>
          }
          <div className={style.plusNum}>
            <div className={style.plusNumDiv} onClick={plus1Handler}>
              +10만
            </div>
            <div className={style.plusNumDiv} onClick={plus2Handler}>
              +5만
            </div>
            <div className={style.plusNumDiv} onClick={plus3Handler}>
              +1만
            </div>
          </div>
          <div className={style.pinkeypad}>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, "00", 0].map((number) => (
              <button
                key={number}
                className={style.pinkey}
                onClick={() => plusNumberHandler(number)}
              >
                {number}
              </button>
            ))}
            <button className={style.backspace}
            onClick={() => backspaceHandler()}>
              ←
            </button>
          </div>
        </div>
      </div>
      : reqStep === 2 ?
      <div className={style.inputDiv}>
        <div>
          {dateAsString !== currentDateString && dateValue > currentDate ? 
            <div className={style.nextBtn} onClick={nextHandler}>
              다음
            </div>
          : 
          <div className={style.notbtn}>다음</div>
          }
          <div className={style.calendarStyle}>
            <Calendar onChange={onChange} value={dateValue} />
          </div>
        </div>
      </div>
      : reqStep === 3 ?
      <div className={style.inputDiv} style={{height: "10%"}}>
        <div>
          {reason === "" ? 
            <div className={style.notbtn}>다음</div>
          :
            <div className={style.nextBtn} onClick={nextHandler}>
              다음
            </div>
          }
        </div>
      </div>
      : reqStep === 4 ?
      <div className={style.inputDiv} style={{height: "10%"}}>
        <div className={style.nextBtn} onClick={reqFriendsHandler}>
          다음
        </div>
      </div>
      : null}
    </div>
  );
};

export default ReqChatPage;