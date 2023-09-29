import React, { useState, useEffect } from 'react';
import HeaderSub from '../../Common/HeaderSub';
import { useNavigate } from 'react-router-dom';
import style from './ReqBorrow.module.css';
import { customAxios } from '../../api/customAxios';
import { useLocation } from 'react-router-dom';

const ReqBorrowPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const data = location.state;

  const [name, setName] = useState(""); // 내 이름
  const [name2, setName2] = useState(""); // 상대 이름
  const [bank, setBank] = useState(""); // 내 은행
  const [accountNumber, setAccountNumber] = useState(""); // 내 계좌

  const formattedStartDate = data.startDate.split(" ")[0];
  const formattedRedemptionDate = data.redemptionDate.split(" ")[0];


  useEffect(() => {
    // 토큰 가져오기
    const token = localStorage.getItem("token");

    if (token) {
      var base64Url = token.split(".")[1];
      var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      var jwtPayload = decodeURIComponent(
        atob(base64)
          .split("")
          .map(function (c) {
            return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
          })
          .join("")
      );
      const JsonPayload = JSON.parse(jwtPayload);
      const userSeq = JsonPayload.userSeq;
    
      customAxios.get(`/users/${userSeq}`)
      .then((res)=>{
        setName(res.data.data.name);
      })
      .catch((res)=>{
        console.log(res);
      })

      customAxios.get(`/users/${data.toUser}`)
      .then((res)=>{
        setName2(res.data.data.name);
      })

      customAxios.get(`/accounts/primary`)
      .then((res)=>{
        setBank(res.data.bank);
        setAccountNumber(res.data.accountNumber);
      })

    } else {
      // 토큰이 없는 경우 처리
    }
  }, [data.toUser]);

  const nextHandler = () => {
    console.log(data);
    customAxios.post("/loan/regist", data)
    .then((res)=>{
      console.log(res);
      alert("대출을 신청했습니다.");
      navigate('/');
    })
    .catch((res)=>{
      console.log(res);
    })
  };

  console.log(data);

  return (
    <div className={style.body}>
      <HeaderSub title={"대출 신청"} />
      <div className={style.container}>
        <div className={style.messageBox}>
          <div className={style.message}><span className={style.bold}>{name}</span> 님이 <span className={style.bold}>{name2}</span> 님에게</div>
          <div className={style.message}><span className={style.bold}>{data.principal}원</span> 을 요청했어요</div>
        </div>
        <div className={style.detailBox}>
          <div className={style.title}>요청 대출 내용</div>
          <div className={style.detail}>
            <div className={style.detailKey}>대출금</div>
            <div className={style.detailValue}>{data.principal}원</div>
          </div>
          <div className={style.detail}>
            <div className={style.detailKey}>신청일자</div>
            <div className={style.detailValue}>{formattedStartDate}</div>
          </div>
          <div className={style.title}>요청 상환일</div>
          <div className={style.detail}>
            <div className={style.detailKey}>상환일</div>
            <div className={style.detailValue}>{formattedRedemptionDate}</div>
          </div>
          <div className={style.title}>대표 계좌</div>
          <div className={style.detail}>
            <div className={style.detailKey}>은행</div>
            <div className={style.detailValue}>{bank}</div>
          </div>
          <div className={style.detail}>
            <div className={style.detailKey}>계좌번호</div>
            <div className={style.detailValue}>{accountNumber}</div>
          </div>
          <div className={style.detail}>
            <div className={style.detailKey}>예금주</div>
            <div className={style.detailValue}>{name}</div>
          </div>
        </div>
        <div className={style.inputDiv}>
          <div className={style.nextBtn} onClick={nextHandler}>
            신청
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReqBorrowPage;
