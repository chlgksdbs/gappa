import React, { useState } from 'react';
import HeaderSub from '../Common/HeaderSub';
import style from './FriendsAddPage.module.css';

const FriendsAdd = () => {
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  // 이름 입력 핸들러
  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  // 휴대폰 번호 입력 핸들러
  const handlePhoneNumberChange = (event) => {
    setPhoneNumber(event.target.value);
  };

  // 검색 버튼 클릭 핸들러
  const handleSearch = () => {
    
  };

  return (
    <div className={style.body}>
      <HeaderSub title={"친구 추가"} />
      <div className={style.inputBox}>
        <input type="text" placeholder="이름" value={name} onChange={handleNameChange}/>
      </div>
      <div className={style.inputBox}>
        <input type="text" placeholder="휴대폰 번호" value={phoneNumber} onChange={handlePhoneNumberChange}/>
      </div>
      <div className={style.underText}>
        - 없이 숫자만 입력해주세요.
      </div>
      <div className={style.inputBtn}>
        <button onClick={handleSearch}>검색</button>
      </div>
    </div>
  );
};

export default FriendsAdd;