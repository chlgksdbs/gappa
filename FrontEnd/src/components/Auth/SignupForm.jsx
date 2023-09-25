import { React, useState, useRef, useEffect } from 'react';
import style from './SignupPage.module.css';
import DaumPostcode from 'react-daum-postcode';
import Modal from 'react-modal';
import { useDispatch } from 'react-redux';
import { authActions } from '../../store/authslice';
import { authAxios } from '../api/customAxios';
const SignupForm = (props) => {

  //초기값 세팅
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [phoneCheckNumber, setPhoneCheckNumber] = useState("");

  const [address, setAddress] = useState("");
  const [addressNumber, setAddressNumber] = useState("");
  const [detailAddress, setDetailAdress] = useState("");
  const [finalAddress, setFinalAddress] = useState("");

  // 정보 확인
  const dispatch = useDispatch();

  //오류 메세지
  const [idMessage, setIdMessage] = useState("");
  const [passwordMessage, setPasswordMessage] = useState("");
  const [passwordConfirmMessage, setPasswordConfirmMessage] = useState("");

  //유효성 검사
  // const [idOverlap, setIdOverlap] = useState(false);
  const [openPostcode, setOpenPostcode] = useState(false);

  const [isId, setIsId] = useState(false);
  const [isPassword, setIsPassword] = useState(false);
  const [isPasswordConfirm, setIsPasswordConfirm] = useState(false);
  const [isFinalAddress, setIsFinalAddress] = useState(false);
  const [checkPhone, setCheckPhone] = useState(false);
  // const [isPhone,setIsPhone] = useState(false);
  const [pass, setPass] = useState(false);
  const [checkPhoneNumber, setCheckPhoneNumber] = useState(false);
  // 이름 입력
  const onChangeName = (e) => {
    const currentName = e.target.value;
    setName(currentName);
  }

  // 아이디 입력
  const onChangeId = (e) => {
    const currentId = e.target.value;
    setId(currentId);
    const idRegExp = /^[a-zA-z0-9]{4,12}$/;

    if (!idRegExp.test(currentId)) {
      setIdMessage("4-12사이 대소문자 또는 숫자만 입력해 주세요!");
      setIsId(false);
    } else {
      setIdMessage("");
    }
  };


  // 아이디 중복확인
  const onChangeIdOverlap = () => {
    const checkIds = {
      loginId: id,
    }
    setTimeout(() => {
      authAxios.post("/users/checkid", checkIds)
        .then((response) => {
          setIdMessage(response.data.message);
          setIsId(response.data.data.code);
          console.log(response)
        })
    }, 500);
  }


  // 비밀번호 확인
  const onChangePassword = (e) => {
    const currentPassword = e.target.value;
    setPassword(currentPassword);
    const passwordRegExp =
      /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/;
    if (!passwordRegExp.test(currentPassword)) {
      setPasswordMessage(
        "숫자+영문자+특수문자 조합으로 8자리 이상 입력해주세요!"
      );
      setIsPassword(false);
      if (isPassword) {
        if (currentPassword !== passwordConfirm) {
          setPasswordConfirmMessage("떼잉~ 비밀번호가 똑같지 않아요!");
          setIsPasswordConfirm(false);
        } else {
          setPasswordConfirmMessage("똑같은 비밀번호를 입력했습니다.");
          setIsPasswordConfirm(true);
        }
      }
    } else {
      setPasswordMessage("안전한 비밀번호 입니다.");
      setIsPassword(true);
      if (isPassword) {
        if (currentPassword !== passwordConfirm) {
          setPasswordConfirmMessage("떼잉~ 비밀번호가 똑같지 않아요!");
          setIsPasswordConfirm(false);
        } else {
          setPasswordConfirmMessage("똑같은 비밀번호를 입력했습니다.");
          setIsPasswordConfirm(true);
        }
      }
    }
  };

  // 비밀번호 확인 로직
  const onChangePasswordConfirm = (e) => {
    const currentPasswordConfirm = e.target.value;
    setPasswordConfirm(currentPasswordConfirm);
    if (isPassword) {
      if (password !== currentPasswordConfirm) {
        setPasswordConfirmMessage("떼잉~ 비밀번호가 똑같지 않아요!");
        setIsPasswordConfirm(false);
      } else {
        setPasswordConfirmMessage("똑같은 비밀번호를 입력했습니다.");
        setIsPasswordConfirm(true);
      }
    }
  };

  const onCHnagePhoneCheckNumber = (e) => {
    const currentPhoneCheckNumber = e.target.value;
    setPhoneCheckNumber(currentPhoneCheckNumber);
  }
  // 주소 입력
  const handle = {
    // 버튼 클릭 이벤트
    clickButton: () => {
      setOpenPostcode(current => !current);
    },

    // 주소 선택 이벤트
    selectAddress: (data) => {
      console.log(`
      주소: ${data.address},
      우편번호: ${data.zonecode}
      `)
      setAddress(data.address);
      setAddressNumber(data.zonecode);
      setOpenPostcode(false);
    },
  }

  // 상세주소 변경
  const onChangeDetailAddress = (e) => {
    const currentDetailAddress = e.target.value;
    setDetailAdress(currentDetailAddress);
    if (detailAddress && address && addressNumber) {
      setFinalAddress(`${address} ${addressNumber}`);
      setIsFinalAddress(true);
      console.log(finalAddress);
    } else {
      setIsFinalAddress(false);
    }
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
    console.log(value);
  };

  const phoneRef = useRef();
  // 전화번호 입력 칸
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

  const phoneCheck = () => {
    const phoneNumber = {
      phoneNumber: phone,
    }
    authAxios.post("/users/phone/send", phoneNumber)
      .then((response) => {
        console.log(response)
        setCheckPhone(true);
      })
      .catch((response) => {
        console.log(response)
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
      })
      .catch(() => {
        setCheckPhoneNumber(false);
      })
  }
  useEffect(() => {
    if (isId && isPassword && isPasswordConfirm && isFinalAddress) {
      setPass(true);
      props.sendDataToPage(pass);
      const userInfo = {
        login_Id: id,
        login_Password: password,
        phone: phone,
        name: name,
        address: finalAddress,
        addressDetail : detailAddress,
      }
      dispatch(authActions.updateUserInfo(userInfo));
    } else {
      setPass(false);
      props.sendDataToPage(pass);
    }

    // eslint-disable-next-line
  }, [isId, isPassword, isPasswordConfirm, isFinalAddress, props, pass])

  return (
    <div className={style.form}>
      <div className={style.idform}>
        <span>아이디</span>

        <br />
        <input type="text" className={style.forminput} name="ID" value={id} onChange={onChangeId} />
        <input type="button" value="중복확인" className={style.formbtn} onClick={onChangeIdOverlap} />
        {isId
          ?
          <span className={style.colorblue}>{idMessage}</span>
          :
          <span className={style.colorred}>{idMessage}</span>
        }
      </div>
      <>
        <span>이름</span>
        <input type="text" className={style.input} value={name} onChange={onChangeName} />
      </>
      <>
        <span>비밀번호</span>
        <input type="password" className={style.input} name="password" value={password} onChange={onChangePassword} />
        {isPassword
          ?
          <span className={style.colorblue}>{passwordMessage}</span>
          :
          <span className={style.colorred}>{passwordMessage}</span>
        }
      </>
      <>
        <span>비밀번호 확인</span>
        <input type="password" className={style.input} name="passwordcheck" value={passwordConfirm} onChange={onChangePasswordConfirm} />
        {isPasswordConfirm
          ?
          <span className={style.colorblue}>{passwordConfirmMessage}</span>
          :
          <span className={style.colorred}>{passwordConfirmMessage}</span>
        }
      </>
      <div className={style.phoneform}>
        <span>휴대폰 번호</span>
        <br />
        {phoneIsValid()}
        <input type="button" value="인증번호 발송" className={style.formbtn} onClick={phoneCheck} />
      </div>
      {
        checkPhone
          ?
          <div className={style.phonecheckform}>
            <h4>5분안에 입력해주세요.</h4>
            <div className={style.phoneforms}>
            <input type="number" value={phoneCheckNumber} onChange={onCHnagePhoneCheckNumber}  className={style.input}/>
            <input type="button" value="인증번호 확인" onClick={phoneCheckNumberConfirm} className={style.formbtn} />
            </div>
            {
              checkPhoneNumber
                ?
                <div>
                  인증되었습니다.
                </div>
                :
                null
            }
          </div>
          :
          null
      }
      <div className={style.adresstop}>
        <span>주소</span>
        <div className={style.idform}>
          <input type="text" value={address} className={style.input} readOnly />
          <button onClick={handle.clickButton} className={style.formbtn}>주소 찾기</button>
        </div>
        {openPostcode &&
          <Modal
            isOpen={openPostcode}
            onRequestClose={() => setOpenPostcode(false)}
            className={style.modal}
          >
            <DaumPostcode
              onComplete={handle.selectAddress}  // 값을 선택할 경우 실행되는 이벤트
              autoClose={false} // 값을 선택할 경우 사용되는 DOM을 제거하여 자동 닫힘 설정
              defaultQuery='' // 팝업을 열때 기본적으로 입력되는 검색어
            />
          </Modal>}
        <div className={style.address}>
          <span>우편번호</span>
          <span>상세주소</span>
          <input type="text" value={addressNumber} className={style.inputaddress} readOnly />
          <input type="text" className={style.input} value={detailAddress} onChange={onChangeDetailAddress} />
        </div>
      </div>
    </div>
  );
}

export default SignupForm;
