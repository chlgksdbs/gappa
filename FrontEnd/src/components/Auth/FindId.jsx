import React, { useEffect, useState } from 'react';
import Headers from './Headers';
import style from './Find.module.css';
import { authAxios } from '../api/customAxios';

const FindId = () => {
  const [check, setCheck] = useState(false);
  const [id, setId] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [answer,setAnswer] = useState("");
  const [answers,setAnswers] = useState("");
  const confirmId = (e) => {
    const currentId = e.target.value;
    setId(currentId);

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
    } else{
      setCheck(false)
    }
  }, [id, phoneNumber])
  const getId = () => {
    const phoneNumbers = phoneNumber.slice(0, 3) + phoneNumber.slice(4, 8) + phoneNumber.slice(9, 13);
    const body = {
      "name": id,
      "phone": phoneNumbers,
    }
    authAxios.post("/users/findid", body)
      .then((res) => {
        setAnswer(res.data.data["login_id"])
        setAnswers(res.data["message"])
      })
      .catch((res) => {
        const data = res.response.data;
        setAnswer(data.message);
      })
  }
  return (
    <div className={style.body}>
      <Headers title={"아이디 찾기"} />
      <span>회원정보에 등록된 이름과 전화번호를 입력해주세요. </span>
      <div className={style.centers}>
        <div className={style.form}>
          <span className={style.gray}>이름</span>
          <input type="text" className={style.input} value={id} onChange={(e) => { confirmId(e) }} />
        </div>
        <div className={style.form}>
          <span className={style.gray}>전화번호</span>
          <input
            type="tel"
            className={style.input}
            value={phoneNumber}
            onChange={(e) => { confirmPhoneNumber(e) }} />
          <span className={style.blue}>-를 제외하고 입력해주세요.</span>

        </div>
        <div className={style.word}>
          <h3>{answers}</h3>
          <br />
          <span className={style.wordcolor}>{answer}</span>
        </div>
      </div>
        <div className={style.btndiv}>
          {check
            ?
            <input type="button" value="확인" className={style.btn} onClick={getId} />
            :
            <input type="button" value="확인" className={style.notbtn} />
          }
        </div>
    </div>
  );
}

export default FindId;
