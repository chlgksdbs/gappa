import React, { useEffect, useState } from 'react';
import Headers from './Headers';
import style from './PinPassword.module.css';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import { useNavigate } from 'react-router-dom';
import { customAxios } from '../api/customAxios';
const PinPasswordConfirm = () => {
  const title = "간편 비밀번호 확인"
  // const right = "다음"
  const [alert, setAlert] = useState("");
  const [isAlert, setIsAlert] = useState(false)
  const [pin, setPin] = useState('');

  const navigate = useNavigate();
  const userInfo = useSelector(state => state.auth);

  const handlePinClick = (number) => {
    if (pin.length < 6) {
      setPin(pin + number);
    }
  };

  const handleBackspaceClick = () => {
    if (pin.length > 0) {
      setPin(pin.slice(0, -1));
    }
  };

  const getMaskedPin = () => {
    return pin.replace(/\d/g, ''); // 숫자를 '*'로 대체
  };

  const getPinDigitClassName = (index) => {
    return pin.length > index ? style.pindigitFilled : style.pindigit;
  };

  useEffect(() => {
    if (pin.length > 5) {
      const body = { 'pinPassword': pin }
      console.log(body);
      customAxios.post("/users/pin/check", body)
        .then((res) => {
          console.log(res.message);
          setAlert("비밀번호 확인되었습니다.");
          setTimeout(() => {
            navigate("/pinpasswordcheck");
          }, 700);
        })
        .catch((e) => {
          console.log(e.message);
          setAlert("비밀번호가 일치하지 않습니다");
          setPin("");
          setIsAlert(false);
        })
    }
  }, [pin, userInfo.pin_Password, isAlert, navigate])
  return (
    <div className={style.pinpassword}>
      <Headers title={title} />
      <span>다시 한번 입력하세요.</span>
      <span>숫자 6자리</span>
      <div className={style.checkmessage}>
        <span>{alert}</span>
      </div>
      <div className={style.pininputcontainer}>
        <div className={style.pindisplay}>
          {Array.from({ length: 6 }, (_, index) => (
            <div
              key={index}
              className={getPinDigitClassName(index)}
            >
              {pin.length > index ? getMaskedPin()[index] : ''}
            </div>
          ))}
        </div>
        <div className={style.pinkeypad}>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, "", 0].map((number) => (
            <button
              key={number}
              onClick={() => handlePinClick(number)}
              className={style.pinkey}
            >
              {number}
            </button>
          ))}
          <button onClick={handleBackspaceClick} className={style.backspace}>
            ←
          </button>
        </div>
      </div>
    </div>
  );
}

export default PinPasswordConfirm;
