import { React, useState, useRef } from 'react';
import style from './SignupPage.module.css';
import DaumPostcode from 'react-daum-postcode';
import Modal from 'react-modal';

const SignupForm = () => {
  const [openPostcode, setOpenPostcode] = useState(false);
  const [address, setAddress] = useState("");
  const [addressNumber, setAddressNumber] = useState("");
  const [phone, setPhone] = useState("");


  const phoneRef = useRef();
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

    phoneRef.current.value = result;
    setPhone(e.target.value);
    console.log(phone);
  };

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

  return (
    <div className={style.form}>
      <div className={style.idform}>
        <span>아이디</span>
        <br />
        <input type="text" className={style.forminput} />
        <input type="button" value="중복확인" className={style.formbtn} />
      </div>
      <>
        <span>이름</span>
        <input type="text" className={style.input} />
      </>
      <div className={style.phoneform}>
        <span>휴대폰 번호</span>
        <br />
        {phoneIsValid()}
        <input type="button" value="인증번호 발송" className={style.formbtn} />
      </div>
      <div>
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
          <input type="text" className={style.input} />
        </div>
      </div>
      <>
        <span>비밀번호</span>
        <input type="password" className={style.input} />
      </>
      <>
        <span>비밀번호 확인</span>
        <input type="password" className={style.input} />
      </>
    </div>
  );
}

export default SignupForm;
