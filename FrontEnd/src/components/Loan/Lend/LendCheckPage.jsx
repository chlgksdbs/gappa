import React, { useEffect, useState } from 'react';
import style from './LendCheckPage.module.css';
import { useNavigate } from 'react-router-dom';
import HeaderSub from '../../Common/HeaderSub';
import { customAxios } from '../../api/customAxios';


const LendCheckPage = () => {
  const navigate = useNavigate();

  const loanSeq = 9;

  const [toUser, setToUser] = useState("");
  const [fromUser, setFromUser] = useState("");
  const [principal, setPrincipal] = useState(0);
  const [startDate, setStartDate] = useState("");
  const [redemptionDate, setRedemptionDate] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [bank, setBank] = useState("");

  useEffect(() => {
    getApply();
    getMyAcc();
  }, []);

  const getApply = () => {
    customAxios.get(`/loan/apply/${loanSeq}`)
    .then((res)=>{
      console.log(res);
      setToUser(res.data.toUser);
      setFromUser(res.data.fromUser);
      setPrincipal(res.data.principal);
      setStartDate(res.data.startDate);
      setRedemptionDate(res.data.redemptionDate);
    })
    .catch((res)=>{
      console.log(res);
    })
  }

  const getMyAcc = () => {
    customAxios.get('/accounts/primary')
    .then((res)=>{
      console.log(res);
      setAccountNumber(res.data.accountNumber);
      setBank(res.data.bank);
    })
    .catch((res)=>{
      console.log(res);
    })
  }

  // 날짜 포매팅 메서드
  const today = new Date();
  const formattingDate = (date) => {
    var inputDate = new Date(date);
    var options = { year: 'numeric', month: 'long', day: 'numeric' };
    var formattedDate = inputDate.toLocaleDateString('ko-KR', options);
    return formattedDate;
  }

  return (
    <div className={style.body}>
      <HeaderSub title={"대출 요청 확인"} />
      <div className={style.container}>
        <div className={style.title}>당사자</div>
        <div className={style.detail}>
          <div className={style.detailKey}>채권자</div>
          <div className={style.detailValue}>{toUser}</div>
        </div>
        <div className={style.detail}>
          <div className={style.detailKey}>채무자</div>
          <div className={style.detailValue}>{ fromUser }</div>
        </div>
        <div className={style.title}>금전 대여 내용</div>
        <div className={style.detail}>
          <div className={style.detailKey}>대여원금</div>
          <div className={style.detailValue}>{principal.toLocaleString()} 원</div>
        </div>
        <div className={style.detail}>
          <div className={style.detailKey}>신청일자</div>
          <div className={style.detailValue}>{formattingDate(startDate)}</div>
        </div>
        <div className={style.detail}>
          <div className={style.detailKey}>차용일자</div>
          <div className={style.detailValue}>{formattingDate(today)}</div>
        </div>
        <div className={style.title}>연체이자</div>
        <div className={style.detail}>
          <div className={style.detailKey}>이자율</div>
          <div className={style.detailValue}>20%</div>
        </div>
        <div className={style.title}>상환내용</div>
        <div className={style.detail}>
          <div className={style.detailKey}>상환일</div>
          <div className={style.detailValue}>{formattingDate(redemptionDate)}</div>
        </div>
        <div className={style.detail}>
          <div className={style.detailKey}>상환 받는 계좌</div>
        </div>
        <div className={style.detail}>
          <div className={style.detailKeyThin}>은행</div>
          <div className={style.detailValue}>{bank}</div>
        </div>
        <div className={style.detail}>
          <div className={style.detailKeyThin}>계좌번호</div>
          <div className={style.detailValue}>{accountNumber}</div>
        </div>
        <div className={style.detail}>
          <div className={style.detailKeyThin}>예금주</div>
          <div className={style.detailValue}>{toUser}</div>
        </div>
      </div>
      <div className={style.btnBox}>
          <button onClick={()=> navigate('/lend/send')}>다음</button>
      </div>
    </div>
  );
};

export default LendCheckPage;