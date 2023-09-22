import React, { useEffect, useState } from 'react';
import Headers from './Headers';
import style from './PinPassword.module.css';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { authActions } from '../../store/authslice';
const PinPassword = () => {
  const title = "간편 비밀번호 설정"
  const [pin, setPin] = useState('');
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
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

  useEffect(()=>{
    if(pin.length === 6){
      dispatch(authActions.updatedUserPin({pin_Password : pin}));
      navigate("/pinpasswordconfirm");
    }
  },[pin,dispatch,navigate])

  return (
    <div className={style.pinpassword}>
      <Headers title={title} />
      <span>비밀번호를 입력하세요.</span>
      <span>숫자 6자리</span>
      <div className={style.checkmessage}>

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

export default PinPassword;
