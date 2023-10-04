import React, { useState, useEffect } from 'react';
import Headers from './Headers';
import style from './Find.module.css';
import { authAxios } from '../api/customAxios';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { authActions } from '../../store/authslice';
const FindPassword = () => {
  // eslint-disable-next-line 
  const [check, setCheck] = useState(false);
  const [id, setId] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [checkPhone, setCheckPhone] = useState(false);
  const [phoneMessage, setPhonemessage] = useState("");
  const [phoneCheckNumber, setPhoneCheckNumber] = useState("");
  // eslint-disable-next-line
  const [checkPhoneNumber, setCheckPhoneNumber] = useState(null);
  const [phone, setPhone] = useState("");
  // eslint-disable-next-line
  const [timeAttack, setTimeAttack] = useState(true);
  const [last, setLast] = useState("");

  const dispatch = useDispatch();


  const navigate = useNavigate();
  const confirmId = (e) => {
    const currentId = e.target.value;
    setId(currentId);

  }
  const onCHnagePhoneCheckNumber = (e) => {
    const currentPhoneCheckNumber = e.target.value;
    setPhoneCheckNumber(currentPhoneCheckNumber);
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
  const findPassword = () => {
    const body = {
      id: id,
      phone: phone,
      code: phoneCheckNumber,
    }
    const userInfo = {
      login_Id: id,
    }
    authAxios.post("/users/findpw", body)
      .then(() => {
        dispatch(authActions.updatedId(userInfo));
        navigate("/find/passwordchange")
      })
      .catch((res) => {
        const data = res.response.data
        setLast(data.message)
      })
  }

  const confirmPhoneNumber = (e) => {
    const inputPhoneNumber = e.target.value;
    // 숫자와 '-' 문자만 남기고 나머지 문자 제거
    const formattedPhoneNumber = inputPhoneNumber.replace(/[^0-9-]/g, '');

    // '-' 문자를 모두 제거
    const strippedPhoneNumber = formattedPhoneNumber.replace(/-/g, '');

    // '-' 문자를 추가하여 포맷팅
    let finalPhoneNumber = '';
    for (let i = 0; i < strippedPhoneNumber.length; i++) {
      if (i === 3 || i === 7) {
        finalPhoneNumber += '-';
      }
      finalPhoneNumber += strippedPhoneNumber[i];
    }
    setPhoneNumber(finalPhoneNumber)
  }
  useEffect(() => {
    if (id && phoneNumber) {
      setCheck(true)
    }
  }, [id, phoneNumber])
  useEffect(() => {
    setPhone(phoneNumber.slice(0, 3) + phoneNumber.slice(4, 8) + phoneNumber.slice(9, 13));
  }, [phoneNumber])
  return (
    <div className={style.body}>
      <Headers title={"비밀번호 찾기"} />
      <span>회원정보에 등록된 이름과 전화번호를 입력해주세요. </span>
      <div className={style.center}>
        <div className={style.form}>
          <span className={style.gray}>아이디</span>
          <input type="text" className={style.input} value={id} onChange={(e) => { confirmId(e) }} />
          <span className={style.blue}>대소문자를 구분해서 작성해주세요.</span>
        </div>
        <div className={style.form}>
          <span className={style.gray}>전화번호</span>
          <div className={style.phoneforms}>
            <input
              type="tel"
              className={style.input}
              value={phoneNumber}
              onChange={(e) => { confirmPhoneNumber(e) }} />
            <input type="button" value={"인증번호 발송"} className={style.formbtn} onClick={phoneCheck} />
          </div>
          <span className={style.blue}>-를 제외하고 입력해주세요.</span>
        </div>
        {
          checkPhone
            ?
            <div className={style.phonecheckform}>
              <span>{phoneMessage}</span>
              {phoneMessage === "5분 안에 입력해주세요."
                ?
                <div className={style.phoneformss}>
                  <input type="number" value={phoneCheckNumber} onChange={onCHnagePhoneCheckNumber} className={style.inputs} />
                  <input type="button" value="인증번호 확인" onClick={phoneCheckNumberConfirm} className={style.formbtn} />
                </div>
                :
                null
              }
            </div>
            :
            null
        }
        <div className={style.word}>

          <span className={style.colors}>{last}</span>

        </div>
      </div>
      <div className={style.btndiv}>
        {/* {checkPhoneNumber
            ?
            <input type="button" value="확인" className={style.btn} onClick={findPassword} />
            :
            <input type="button" value="확인" className={style.notbtn} />
          } */}
        <input type="button" value="확인" className={style.btn} onClick={findPassword} />

      </div>
    </div>
  );
}

export default FindPassword;
