import React, { useEffect, useState } from 'react';
import style from './LendSendPage.module.css';
import { useNavigate, useLocation } from 'react-router-dom';
import HeaderSub from '../../Common/HeaderSub';
import { customAxios } from '../../api/customAxios';
import toast, { Toaster } from 'react-hot-toast';
import Keyboard from '../../Auth/Keyboard';

const LendSendPage = () => {
  const navigate = useNavigate();

  const location = useLocation();
  const loanSeq = location.state.loanSeq;

  const [toUser, setToUser] = useState("");
  const [fromUser, setFromUser] = useState("");
  const [principal, setPrincipal] = useState(0);
  const [redemptionDate, setRedemptionDate] = useState("");
  const [myAccountNumber, setMyAccountNumber] = useState("");
  const [myBank, setMyBank] = useState("");
  const [yourAccountNumber, setYourAccountNumber] = useState("");
  const [yourBank, setYourBank] = useState("");

  const [isCertOpen, setIsCertOpen] = useState(false);
  const [isCertSelect, setIsCertSelect] = useState(false);
  const [imReady, setImReady] = useState(false);
  const [certPW, setCertPW] = useState("");
  const [modalCheck, setModalCheck] = useState(false);
  const [check, setCheck] = useState("");

  const [certName, setCertName] = useState("");
  const expire = localStorage.getItem("expire");

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


  useEffect(() => {
    getApply();
    getMyAcc();
  }, []);

  const getApply = () => {
    customAxios.get(`/loan/apply/${loanSeq}`)
    .then((res)=>{
      setToUser(res.data.toUser);
      setFromUser(res.data.fromUser);
      setPrincipal(res.data.principal);
      setRedemptionDate(res.data.redemptionDate);
      setYourBank(res.data.bank);
      setYourAccountNumber(res.data.accountNumber);
    })
    .catch((res)=>{
    })
  }

  const getMyAcc = () => {
    customAxios.get('/accounts/primary')
    .then((res)=>{
      setMyAccountNumber(res.data.accountNumber);
      setMyBank(res.data.bank);
    })
    .catch((res)=>{
    });
  }

  const selectCert = () => {
    setIsCertSelect(true);
  }

  const toggleCert = () => {
    setIsCertOpen(!isCertOpen);
  }

  const lendStart = () => {
    const body = {
      loanSeq : loanSeq
    };
    customAxios.post('/loan/money/lend', body)
    .then((res)=>{
      navigate('/lend/complete', { state: { loanSeq: loanSeq}});
    })
    .catch((res)=>{
    });
  }

  // 날짜 포매팅 메서드
  const formattingDate = (date) => {
    var inputDate = new Date(date);
    var options = { year: 'numeric', month: 'long', day: 'numeric' };
    var formattedDate = inputDate.toLocaleDateString('ko-KR', options);
    return formattedDate;
  }

  const formattDate = (date) => {
    const dateObject = new Date(date);
    const year = dateObject.getFullYear();
    const month = dateObject.getMonth() + 1;
    const day = dateObject.getDate();
    const formattedDate = `${year}.${month < 10 ? ' 0' : ' '}${month}.${day < 10 ? ' 0' : ' '}${day}`;
    return formattedDate;
  }

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


  return (
    <div className={style.body}>
      <HeaderSub title={"송금"} />
      <div><Toaster /></div>
      { isCertSelect ? (
        <div className={style.containerPW}>
          <div className={style.mycert}>
            <div className={style.subImgBox}>
              <img src="/images/GapPassCert.png" alt="" />
            </div>
            <div className={style.certlogoBox}>
              <img src="/images/GAPPASS.png" alt="" />
            </div>
            <div className={style.textBox}>
              <div className={style.name}>{certName}</div>
              <div className={style.detailcert}>이 기기에 인증서 보관중</div>
              <div className={style.detailcert}>{formattDate(expire)}</div>
            </div>
          </div>
          <div className={style.explanation}>
            인증서 비밀번호를 입력하세요
          </div>
          <div className={style.passwordBox}>
            <div>
              비밀번호
            </div>
            <div>
              <input type="password" className={style.input} name="password" value={certPW} onClick={() => onClickPassword("Pw")} readOnly />
            </div>
          </div>
          <div className={style.btnBoxCert}>
              <div onClick={() => complete()}>완료</div>
          </div>
          {
            modalCheck && 
            <Keyboard inputHandler={inputHandler} modalCheck={modalCheck} modalHandelr={modalHandelr}/> 
          }
        </div>
      ) : (
      <div className={style.accountInfoBox}>
        <div className={style.account}>{yourBank + " " +yourAccountNumber}</div>
        <div className={style.money}>{principal.toLocaleString()} 원</div>
        <div className={style.holder}>예금주 : {fromUser}</div>
        <div className={style.detail}>
          <div className={style.detailKey}>대여원금</div>
          <div className={style.detailValue}>{principal.toLocaleString()} 원</div>
        </div>
        <div className={style.detail}>
          <div className={style.detailKey}>이자율</div>
          <div className={style.detailValue}>20%</div>
        </div>
        <div className={style.detail}>
          <div className={style.detailKey}>상환일</div>
          <div className={style.detailValue}>{formattingDate(redemptionDate)}</div>
        </div>
        <div className={style.detail}>
          <div className={style.detailKey}>상환계좌</div>
          <div className={style.detailValue}>{myBank}</div>
        </div>
        <div className={style.detail}>
          <div className={style.detailKey}></div>
          <div className={style.detailValue}>{myAccountNumber}</div>
        </div>
        <div className={style.detail}>
          <div className={style.detailKey}></div>
          <div className={style.detailValue}>{toUser}</div>
        </div>
        <div className={style.bankInput}>
          <div className={style.detailKey}>받는 분 통장 표시</div>
          <div className={style.detailValue}>{toUser}</div>
        </div>
        <div className={style.btnBox}>
          { imReady ? (
            <div className={style.completeBtn} onClick={lendStart}>
              송금하기
            </div>
            ): (
            <div className={style.nextBtn} onClick={toggleCert}>
              서명하기
            </div>
          )}
        </div>

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
              <img src="/images/GAPPASS.png" alt="" />
            </div>
            <div className={style.textBox}>
              <div className={style.name}>{certName}</div>
              <div className={style.detailcert}>이 기기에 인증서 보관중</div>
              <div className={style.detailcert}>{formattDate(expire)}</div>
            </div>
          </div>
        </div>
      </div>
      ) }
    </div>
  );
};

export default LendSendPage;