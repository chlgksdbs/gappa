import React, { useEffect, useState } from 'react';
import HeaderSub from '../Common/HeaderSub';
import style from './PinPassword.module.css';
import { customAxios } from '../api/customAxios';

const PinPasswordVerify = ( props ) => {

  const [pin, setPin] = useState('');
  const [message, setMessage] = useState('');

  useEffect(()=>{
    if(pin.length === 6){
      pinVerify();
    }
  },[pin])

  const pinVerify = () => {
    const body = {
      pinPassword: pin
    };
    customAxios.post('/users/pin/validate', body)
    .then((res)=>{
      if (props.result) {
        props.result(true);
      }
    })
    .catch((res)=>{
      setMessage("잘못된 비밀번호 입니다.")
      setPin("");
    })
  }

  const getPinDigitClassName = (index) => {
    return pin.length > index ? style.pindigitFilled : style.pindigit;
  };

  const getMaskedPin = () => {
    return pin.replace(/\d/g, ''); // 숫자를 '*'로 대체
  };

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


  return (
    <div className={style.pinpassword}>
      <HeaderSub title={"간편 비밀번호 인증"} />
      <span>비밀번호를 입력하세요.</span>
      <span>숫자 6자리</span>
      <div className={style.checkmessage}>
        {message}
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
};

export default PinPasswordVerify;