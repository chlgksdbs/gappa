import { React, useState, useRef, useEffect } from 'react';
import style from './CertIssuePage.module.css';
import HeaderSub from '../Common/HeaderSub';
import Footer from '../Common/Footer';
import { useNavigate } from 'react-router-dom';
import { authAxios, customAxios } from '../api/customAxios';
import Keyboard from '../Auth/Keyboard';
import toast, { Toaster } from 'react-hot-toast';

const CertIssuePage = () => {
  const [step, setStep] = useState(1);

  const nextStep = () => {
    setStep(step+1);
  }

  return (
    <div className={style.body}>
      <HeaderSub title={"인증서 발급"} />
      <Toaster />
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
              <span>본인확인 휴대폰 인증 약관(필수)</span>
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
        {/* <div style={{fontSize: '20px'}}>휴대폰 번호</div> */}
        <div className={style.phoneNum}>
          <div className={style.phoneNumInput}>{phoneIsValid()}</div>
          <div onClick={phoneCheck} className={style.formbtn}>인증번호 발송</div>
        </div>
      </div>
      {
        checkPhone
          ?
          <div className={style.phonecheckform}>
            <div style={{marginBottom:'.5rem', color:'#2a2adf'}}>{phoneMessage}</div>
            {phoneMessage === "5분 안에 입력해주세요."
              ?
              <div className={style.phoneNum}>
                <div className={style.phoneNumInput}><input type="number" value={phoneCheckNumber} onChange={onChangePhoneCheckNumber} className={style.forminput} /></div>
                <div onClick={phoneCheckNumberConfirm} className={style.formbtn}>인증번호 확인</div>
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

const Step3 = ( props ) => {

  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [isPassword, setIsPassword] = useState(false);
  const [isPasswordConfirm, setIsPasswordConfirm] = useState(false);
  const [passwordMessage, setPasswordMessage] = useState("");
  const [passwordConfirmMessage, setPasswordConfirmMessage] = useState("");
  
  const [modalCheck, setModalCheck] = useState(false);
  const [check, setCheck] = useState("");

  const onClickPassword = (e) => {
    setModalCheck(true);
    setCheck(e);
  }

  const inputHandler = (inputValue) => {
    if(check === "Pw"){
      setPassword(inputValue);
    } else if(check === "PwC"){
      setPasswordConfirm(inputValue);
    }
  }

  const modalHandelr = (inputValue) => {
    setModalCheck(inputValue);
  }

  useEffect(() => {
    const passwordRegExp =
      /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/;
    if (!passwordRegExp.test(password)) {
      setPasswordMessage(
        "숫자+영문자+특수문자 조합으로 8자리 이상 입력해주세요!"
      );
      setIsPassword(false);
      if (isPassword) {
        if (password !== passwordConfirm) {
          setPasswordConfirmMessage("비밀번호가 일치하지 않습니다.");
          setIsPasswordConfirm(false);
        } else {
          setPasswordConfirmMessage("비밀번호가 일치합니다.");
          setIsPasswordConfirm(true);
        }
      }
    } else {
      setPasswordMessage("안전한 비밀번호 입니다.");
      setIsPassword(true);
      if (isPassword) {
        if (password !== passwordConfirm) {
          setPasswordConfirmMessage("비밀번호가 일치하지 않습니다.");
          setIsPasswordConfirm(false);
        } else {
          setPasswordConfirmMessage("비밀번호가 일치합니다.");
          setIsPasswordConfirm(true);
        }
      }
    }

    setPasswordConfirm(passwordConfirm);
    if (isPassword) {
      if (password !== passwordConfirm) {
        setPasswordConfirmMessage("비밀번호가 일치하지 않습니다.");
        setIsPasswordConfirm(false);
      } else {
        setPasswordConfirmMessage("비밀번호가 일치합니다.");
        setIsPasswordConfirm(true);
      }

    };
    // eslint-disable-next-line
  }, [password, passwordConfirm]);

  const navigate = useNavigate();

  const certIssuance = () => {
    const body = {
      pw : password
    }
    customAxios.post('/certificate/issuance', body)
    .then((res)=>{
      localStorage.setItem("CPK", res.data.publicKey);
      const today = new Date();
      const twoYearsLater = new Date(today);
      twoYearsLater.setFullYear(today.getFullYear() + 2);
      localStorage.setItem("expire", twoYearsLater);

      toast.success("성공", {
        duration: 1000
      });
      setTimeout(() => {
        navigate("/mycertificate");      
      }, 1000);
      
    })
    .catch((res)=>{
    })
  }

  return (
    <div className={style.stepBox}>
      <div className={style.title}>
        인증서 비밀번호 설정
      </div>
      <div className={style.explanation}>
        인증에 사용할 비밀번호를 설정하세요
      </div>
      <div className={style.passwordBox}>
        <div className={style.pwtitle}>
          비밀번호
        </div>
        <div className={style.pwform}>
        <input type="password" className={style.pwinput} name="password" value={password} onClick={() => onClickPassword("Pw")} readOnly />
        <br/>
        {isPassword
          ?
          <div className={style.colorblue}>{passwordMessage}</div>
          :
          <div className={style.colorred}>{passwordMessage}</div>
        }
        </div>
        <div className={style.pwtitle}>
          비밀번호 확인
        </div>
        <div className={style.pwform}>
          <input type="password" className={style.pwinput} name="passwordcheck" value={passwordConfirm} onClick={() => onClickPassword("PwC")} readOnly />
          <br/>
          {isPasswordConfirm
            ?
            <div className={style.colorblue}>{passwordConfirmMessage}</div>
            :
            <div className={style.colorred}>{passwordConfirmMessage}</div>
          }
        </div>
      </div>
      <div className={style.btnBox}>
        {
          isPasswordConfirm
            ?
            <div className={style.goodbtn} onClick={() => certIssuance()}>완료</div>
            :
            <div className={style.notbtn}>완료</div>
        }
      </div>
      {
        modalCheck && 
        <Keyboard inputHandler={inputHandler} modalCheck={modalCheck} modalHandelr={modalHandelr}/> 
      }
    </div>
  );
};

export default CertIssuePage;