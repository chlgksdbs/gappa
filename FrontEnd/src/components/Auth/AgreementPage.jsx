import React, { useEffect, useState } from 'react';
import Headers from './Headers';
import style from './AgreementPage.module.css';
import { useNavigate } from 'react-router-dom';
const AgreementPage = () => {
  const title = "회원가입"
  const [allCheck, setAllCheck] = useState(false);
  const [memberCheck, setMemberCheck] = useState(false);
  const [serviceCheck, setServiceCheck] = useState(false);
  const [bankCheck, setBankCheck] = useState(false);
  const [phoneCheck, setPhoneCheck] = useState(false);
  const [checkPoint, setCheckPoint] = useState(false);

  const navigate = useNavigate();

  const allCheckHandler = (() => {
    if (allCheck === true) {

      setAllCheck(!allCheck);
      setMemberCheck(false);
      setServiceCheck(false);
      setBankCheck(false);
      setPhoneCheck(false);
    }
    else {
      setAllCheck(!allCheck);
      setMemberCheck(true);
      setServiceCheck(true);
      setBankCheck(true);
      setPhoneCheck(true);
    }
  })

  const memberCheckHandler = (() => {
    setMemberCheck(!memberCheck);
    if (serviceCheck && bankCheck && phoneCheck === true) {
      if (allCheck === false) {
        setAllCheck(true);
      }
      else {
        setAllCheck(false);
      }
    }
  })

  const serviceCheckHandler = (() => {
    setServiceCheck(!serviceCheck);
    if (memberCheck && bankCheck && phoneCheck === true) {
      if (allCheck === false) {
        setAllCheck(true);
      }
      else {
        setAllCheck(false);
      }
    }
  })

  const bankCheckHandler = (() => {
    setBankCheck(!bankCheck);
    if (serviceCheck && memberCheck && phoneCheck === true) {
      if (allCheck === false) {
        setAllCheck(true);
      }
      else {
        setAllCheck(false);
      }
    }
  })

  const phoneCheckHandler = (() => {
    setPhoneCheck(!phoneCheck);
    if (serviceCheck && bankCheck && memberCheck === true) {
      if (allCheck === false) {
        setAllCheck(true);
      }
      else {
        setAllCheck(false);
      }
    }
  })





  useEffect(() => {
    if (memberCheck && serviceCheck && bankCheck && phoneCheck === true) {
      setCheckPoint(true);
      console.log(checkPoint)
    }
    else {
      setCheckPoint(false);
    }
    // eslint-disable-next-line
  }, [allCheck, memberCheck, serviceCheck, bankCheck, phoneCheck])




  return (
    <div className={style.agreement}>
      <Headers title={title} />
      <img src="images/Gappalogo.png" alt="" className={style.gappalogo} />
      <br />
      <div className={style.welcome}>
        <span>GAPPA에 오신 것을 환영합니다.</span>
        <span>아래 동의를 통해 GAPPA를 시작해보세요!</span>
      </div>
      <div className={style.agree}>
        <div className={style.agreeall}>
          <span>전체 동의</span>
          <input
            type="checkbox"
            name="전체 동의"
            id=""
            checked={allCheck}
            onChange={(e) => allCheckHandler(e)} />
        </div>
        <hr />
        <div className={style.agreeone}>
          <div>
            <span>개인정보 필수 수집 이용 동의(필수)</span>
            <img src="images/NextBtn.png" alt="" />
          </div>
          <input
            type="checkbox"
            name="개인정보 필수 수집 이용 동의(필수)"
            id=""
            checked={memberCheck}
            onChange={(e) => memberCheckHandler(e)} />
        </div>
        <div className={style.agreeone}>
          <div>
            <span>서비스 이용 약관(필수)</span>
            <img src="images/NextBtn.png" alt="" />
          </div>
          <input
            type="checkbox"
            name="서비스 이용 약관(필수)"
            id=""
            checked={serviceCheck}
            onChange={(e) => serviceCheckHandler(e)} />
        </div>
        <div className={style.agreeone}>
          <div>
            <span>금융결제원 / 계좌통합조회 약관(필수)</span>
            <img src="images/NextBtn.png" alt="" />
          </div>
          <input
            type="checkbox"
            name="금융결제원 / 계좌통합조회 약관"
            id=""
            checked={bankCheck}
            onChange={(e) => bankCheckHandler(e)} />
        </div>
        <div className={style.agreeone}>
          <div>
            <span>통신사, 본인확인 휴대폰 인증 약관(필수)</span>
            <img src="images/NextBtn.png" alt="" />
          </div>
          <input
            type="checkbox"
            name="통신사, 본인확인 휴대폰 인증 약관"
            id=""
            checked={phoneCheck}
            onChange={(e) => phoneCheckHandler(e)} />
        </div>
        <div className={style.buttondiv}>
          {
            checkPoint
              ?
              <div className={style.goodbtn} onClick={() => navigate("/signup")}>다음</div>
              :
              <div className={style.notbtn}>다음</div>
          }
        </div>
      </div>
    </div>
  );
}

export default AgreementPage;
