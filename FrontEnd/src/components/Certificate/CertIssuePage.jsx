import { React, useState, useRef, useEffect } from 'react';
import style from './CertIssuePage.module.css';
import HeaderSub from '../Common/HeaderSub';
import Footer from '../Common/Footer';
import { useNavigate } from 'react-router-dom';
import { authAxios } from '../api/customAxios';

const CertIssuePage = () => {
  const [step, setStep] = useState(1);

  const nextStep = () => {
    setStep(step+1);
  }

  return (
    <div className={style.body}>
      <HeaderSub title={"인증서 발급"} />
      {step === 1 && <Step1 nextStep={nextStep}/>}
      {step === 2 && <Step2 nextStep={nextStep}/>}
      {step === 3 && <Step3 nextStep={nextStep}/>}
      <Footer />
    </div>
  );
};

const Step1 = ( props ) => {
  const [allCheck, setAllCheck] = useState(false);
  const [memberCheck, setMemberCheck] = useState(false);
  const [serviceCheck, setServiceCheck] = useState(false);
  const [phoneCheck, setPhoneCheck] = useState(false);
  const [checkPoint, setCheckPoint] = useState(false);


  useEffect(() => {
    if (memberCheck && serviceCheck && phoneCheck === true) {
      setCheckPoint(true);
    }
    else {
      setCheckPoint(false);
    }
    // eslint-disable-next-line
  }, [allCheck, memberCheck, serviceCheck, phoneCheck])

  const allCheckHandler = (() => {
    if (allCheck === true) {

      setAllCheck(!allCheck);
      setMemberCheck(false);
      setServiceCheck(false);
      setPhoneCheck(false);
    }
    else {
      setAllCheck(!allCheck);
      setMemberCheck(true);
      setServiceCheck(true);
      setPhoneCheck(true);
    }
  })

  const memberCheckHandler = (() => {
    setMemberCheck(!memberCheck);
    if (serviceCheck && phoneCheck === true) {
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
    if (memberCheck && phoneCheck === true) {
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
    if (serviceCheck && memberCheck === true) {
      if (allCheck === false) {
        setAllCheck(true);
      }
      else {
        setAllCheck(false);
      }
    }
  })

  return (
    <div className={style.stepBox}>
      <div className={style.title}>
        약관동의
      </div>
      <div className={style.explanation}>
        GAP PASS 서비스 이용을 위해 약관동의가 필요합니다.
      </div>
      <div className={style.agree}>
          <div className={style.agreeall}>
            <span>필수약관 전체동의</span>
            <input
              type="checkbox"
              name="전체 동의"
              id=""
              checked={allCheck}
              onChange={(e) => allCheckHandler(e)} />
          </div>
          <div className={style.agreeone}>
            <div>
              <span>개인정보 필수 수집 이용 동의(필수)</span>
              <img src="/images/NextBtn.png" alt="" />
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
              <img src="/images/NextBtn.png" alt="" />
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
              <span>통신사, 본인확인 휴대폰 인증 약관(필수)</span>
              <img src="/images/NextBtn.png" alt="" />
            </div>
            <input
              type="checkbox"
              name="통신사, 본인확인 휴대폰 인증 약관"
              id=""
              checked={phoneCheck}
              onChange={(e) => phoneCheckHandler(e)} />
          </div>

          <div className={style.fakeAgree}>
            ※ 상기 서비스 이용 약관 동의는 모의로 진행되며, 
            대출 약관 동의 내용은 법적 효력을 갖지 않습니다.
          </div>
        </div>
        <div className={style.btnBox}>
          {
            checkPoint
              ?
              <div className={style.goodbtn} onClick={() => props.nextStep()}>다음</div>
              :
              <div className={style.notbtn}>다음</div>
          }
        </div>
    </div>
  );
};

const Step2 = ( props ) => {
  const [phone, setPhone] = useState("");
  const [checkPhone, setCheckPhone] = useState(false);
  const [timeAttack,setTimeAttack] = useState(true);
  const [phoneCheckNumber, setPhoneCheckNumber] = useState("");
  const [checkPhoneNumber, setCheckPhoneNumber] = useState(false);
  const [phoneMessage, setPhonemessage] = useState("");

  const phoneRef = useRef();

  const phoneCheck = () => {
    const phoneNumber = {
      phoneNumber: phone,
    }
    authAxios.post("/users/phone/send", phoneNumber)
    .then((response) => {
        setTimeAttack(false);
        setTimeout(() => {
          setTimeAttack(true);
        }, 5000);
        setCheckPhone(true);
        setPhonemessage("5분 안에 입력해주세요.")
      })
      .catch((response) => {
        setCheckPhone(true);
        setPhonemessage("제대로 된 번호를 입력해주세요.")
      })
  }

  const phoneCheckNumberConfirm = () => {
    const confirmData = {
      phoneNumber: phone,
      code: phoneCheckNumber
    }
    authAxios.post("/users/phone/check", confirmData)
      .then(() => {
        setCheckPhoneNumber(true);
        setPhonemessage("인증되었습니다.")
      })
      .catch(() => {
        // setCheckPhoneNumber(false);
        setPhonemessage("인증 실패했습니다.")
      })
  }

  const onChangePhoneCheckNumber = (e) => {
    const currentPhoneCheckNumber = e.target.value;
    setPhoneCheckNumber(currentPhoneCheckNumber);
  }

  // 휴대폰 번호 자동 하이폰 생성
  const autoHypenPhone = (e) => {
    const value = phoneRef.current.value.replace(/\D+/g, "");
    const phoneLength = 11;

    let result;
    result = "";

    for (let i = 0; i < value.length && i < phoneLength; i++) {
      switch (i) {
        case 3:
          result += "-";
          break;
        case 7:
          result += "-";
          break;
        default:
          break;
      }

      result += value[i];
    }

    setPhone(value);
    phoneRef.current.value = result;
  };

  const phoneIsValid = () => {
    return (
      <input
        type="tel"
        name="user-phone"
        ref={phoneRef}
        placeholder=""
        onChange={autoHypenPhone}
        className={style.forminput}
      />

    );
  };

  return (
    <div className={style.stepBox}>
      <div className={style.title}>
        본인 확인
      </div>
      <div className={style.explanation}>
        회원정보에 등록된 전화번호를 입력해 주세요
      </div>

      <div className={style.phoneform}>
        <span>휴대폰 번호</span>
        <br />
        {phoneIsValid()}
        { timeAttack
        ?
          <input type="button" value="인증번호 발송" className={style.formbtn} onClick={phoneCheck} />
          :
          <input type="button" value="인증번호 발송" className={style.frombtnx}/>
        }
      </div>
      {
        checkPhone
          ?
          <div className={style.phonecheckform}>
            <span>{phoneMessage}</span>
            {phoneMessage === "5분 안에 입력해주세요."
              ?
              <div className={style.phoneforms}>
                <input type="number" value={phoneCheckNumber} onChange={onChangePhoneCheckNumber} className={style.input} />
                <input type="button" value="인증번호 확인" onClick={phoneCheckNumberConfirm} className={style.formbtn} />
              </div>
              :
              null
            }
          </div>
          :
          null
      }
      <div className={style.btnBox}>
          {
            checkPhoneNumber
              ?
              <div className={style.goodbtn} onClick={() => props.nextStep()}>다음</div>
              :
              <div className={style.notbtn}>다음</div>
          }
        </div>
    </div>
  );
};

const Step3 = () => {
  return (
    <div>
      <h2>세번째 단계: 비밀번호 설정</h2>
      {/* 비밀번호 설정 컴포넌트를 여기에 추가 */}
    </div>
  );
};

export default CertIssuePage;