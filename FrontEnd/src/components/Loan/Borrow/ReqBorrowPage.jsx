import React, { useState, useEffect } from 'react';
import HeaderSub from '../../Common/HeaderSub';
// import { useNavigate } from 'react-router-dom';
import style from './ReqBorrow.module.css';
import { customAxios } from '../../api/customAxios';
import { useLocation } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import Keyboard from '../../Auth/Keyboard';

const ReqBorrowPage = () => {
  // const navigate = useNavigate();
  const location = useLocation();
  const data = location.state;

  const [isCertOpen, setIsCertOpen] = useState(false);
  const [isCertSelect, setIsCertSelect] = useState(false);
  const [imReady, setImReady] = useState(false);

  const [name, setName] = useState(""); // 내 이름
  const [name2, setName2] = useState(""); // 상대 이름
  const [bank, setBank] = useState(""); // 내 은행
  const [accountNumber, setAccountNumber] = useState(""); // 내 계좌

  const expire = localStorage.getItem("expire");

  const [certPW, setCertPW] = useState("");

  const [modalCheck, setModalCheck] = useState(false);
  const [check, setCheck] = useState("");

  const onClickPassword = (e) => {
    setModalCheck(true);
    setCheck(e);
  }

  const inputHandler = (inputValue) => {
    setCertPW(inputValue);
  }

  const modalHandelr = (inputValue) => {
    setModalCheck(inputValue);
  }

  // const formattedStartDate = data.startDate.split(" ")[0];
  // const formattedRedemptionDate = data.redemptionDate.split(" ")[0];

  const formattedStartDate2 = new Date(data.startDate).getFullYear()+"년 "
                              + String(new Date(data.startDate).getMonth() + 1).padStart(2, '0')+"월 "
                              + String(new Date(data.startDate).getDate()).padStart(2, '0')+"일";
  const formattedRedemptionDate2 = new Date(data.redemptionDate).getFullYear()+"년 "
                                  + String(new Date(data.redemptionDate).getMonth() + 1).padStart(2, '0')+"월 "
                                  + String(new Date(data.redemptionDate).getDate()).padStart(2, '0')+"일";

  const formattDate = (date) => {
    const dateObject = new Date(date);
    const year = dateObject.getFullYear();
    const month = dateObject.getMonth() + 1;
    const day = dateObject.getDate();
    const formattedDate = `${year}.${month < 10 ? ' 0' : ' '}${month}.${day < 10 ? ' 0' : ' '}${day}`;
    return formattedDate;
  }

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

  const toggleCert = () => {
    setIsCertOpen(!isCertOpen);
  }

  const [certName, setCertName] = useState("");
  useEffect(() => {
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
        setCertName(res.data.data.name);
      })
      .catch((res)=>{
      })
    } else {
      // 토큰이 없는 경우 처리
    }
  }, []);

  const selectCert = () => {
    setIsCertSelect(true);
  }

  const complete = () => {
    const body = {
      pw: certPW,
      public_key : localStorage.getItem("CPK")
    }
    customAxios.post("/certificate/encode", body)
    .then((res)=>{
      const encryptedKey = res.data.encrypted

      customAxios.post("/certificate/validate", {pw:encryptedKey})
      .then((res)=>{
        toast.success("인증되었습니다.", {
          duration: 1000,
        });
        setTimeout(() => {
          setIsCertSelect(false);
          setIsCertOpen(false);
          setImReady(true);
        }, 1000);
      })
      .catch((res)=>{
        toast.error("비밀번호가 틀렸습니다.", {
          duration: 1000,
        });
        setTimeout(() => {
          setCertPW("");
        }, 1000);
      })
    })
    .catch((res)=>{
    })
  }

  // 대출 신청 실행 로직
  const nextHandler = () => {
    customAxios.post("/loan/regist", data)
    .then((res)=>{
      toast.success("대출을 신청했습니다!", {
        duration: 1000,
      });
      setTimeout(() => {
        window.location.replace("/");
      }, 1000);
    })
    .catch((res)=>{
      toast.error("대출 신청에 실패했습니다.", {
        duration: 1000,
      });
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    })
  };

  

  return (
    <div className={style.body}>
      <HeaderSub title={"대출 신청"} />
      <div><Toaster /></div>

      { isCertSelect ? (
        <div className={style.containerPW}>
          <div className={style.mycert}>
            <div className={style.subImgBox}>
              <img src="/images/GapPassCert.png" alt="" />
            </div>
            <div className={style.certlogoBox}>
              <img src="/images/CertShield.gif" alt="" />
            </div>
            <div className={style.textBox}>
              <div className={style.name}>{certName}</div>
              <div className={style.detail}>이 기기에 인증서 보관중</div>
              <div className={style.detail}>{formattDate(expire)}</div>
            </div>
          </div>
          <div className={style.explanation}>
            인증서 비밀번호를 입력하세요
          </div>
          <div className={style.passwordBox}>
            {/* <div>
              비밀번호
            </div> */}
            {/* <div style={{width:'90vw', margin:'0 2rem'}}> */}
              <input type="password" className={style.input} name="password" value={certPW} onClick={() => onClickPassword("Pw")} readOnly />
            {/* </div> */}
          </div>
          <div className={style.btnBox}>
              <div onClick={() => complete()}>완료</div>
          </div>
          {
            modalCheck && 
            <Keyboard inputHandler={inputHandler} modalCheck={modalCheck} modalHandelr={modalHandelr}/> 
          }
        </div>
      ) : (
      <div className={style.container}>
        <div className={style.messageBox}>
          <div className={style.message}><span className={style.bold}>{name}</span> 님이 <span className={style.bold}>{name2}</span> 님에게</div>
          <div className={style.message}><span className={style.bold}>{data.principal.toLocaleString()}원</span> 을 요청합니다</div>
        </div>
        <div className={style.detailBox}>
          <div className={style.title}>요청 대출 내용</div>
          <div className={style.detail}>
            <div className={style.detailKey}>대출금</div>
            <div className={style.detailValue}>{data.principal.toLocaleString()}원</div>
          </div>
          <div className={style.detail}>
            <div className={style.detailKey}>신청일자</div>
            <div className={style.detailValue}>{formattedStartDate2}</div>
          </div>
          <div className={style.title}>요청 상환일</div>
          <div className={style.detail}>
            <div className={style.detailKey}>상환일</div>
            <div className={style.detailValue}>{formattedRedemptionDate2}</div>
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
          { imReady ? (
          <div className={style.completeBtn} onClick={nextHandler}>
            신청
          </div>
          ): (
          <div className={style.nextBtn} onClick={toggleCert}>
            서명하기
          </div>
          )}
          
        </div>
        {/* 인증서 올라오는 부분 */}
        <div className={`${style.cert} ${isCertOpen ? style.open : ''}`}>
          <div className={style.certHeader}>
            <p>인증서를 선택하세요.</p>
            <p style={{marginTop: "5px"}} onClick={toggleCert}>✖</p>
          </div>
          <div className={style.mycert} onClick={()=> selectCert()}>
            <div className={style.subImgBox}>
              <img src="/images/GapPassCert.png" alt="" />
            </div>
            <div className={style.certlogoBox}>
              <img src="/images/CertShield.gif" alt="" />
            </div>
            <div className={style.textBox}>
              <div className={style.name}>{certName}</div>
              <div className={style.detail}>이 기기에 인증서 보관중</div>
              <div className={style.detail}>{formattDate(expire)}</div>
            </div>
          </div>
        </div>
      </div>
      ) }
    </div>
  );
};

export default ReqBorrowPage;
