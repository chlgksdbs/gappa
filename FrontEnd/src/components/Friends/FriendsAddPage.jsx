import React, { useState } from 'react';
import HeaderSub from '../Common/HeaderSub';
import style from './FriendsAddPage.module.css';
import { customAxios } from '../api/customAxios';

const FriendsAdd = () => {
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isResultOpen, setIsResultOpen] = useState(false);
  const [isResult, setIsResult] = useState(false);
  const [canReq, setCanReq] = useState(false);
  const [resMsg, setResMsg] = useState("");
  const [resUser, setResUser] = useState({});

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
    
    const body ={
      name : name,
      phone : phoneNumber,
    };
    customAxios.post("/friends/user", body)
    .then((res)=>{
      const resDataUser = res.data.user;

      if(res.data.status === "N"){
        setIsResult(false);
        setCanReq(false);
      } else if(res.data.status === "C"){
        setIsResult(true);
        setCanReq(true);
        setResUser(resDataUser);
      } else {
        setIsResult(true);
        setCanReq(false);
        setResUser(resDataUser);
        setResMsg(res.data.message);
      }
      setIsResultOpen(true);
    })
    .catch((res)=>{
    })
  };

  // 친구 신청
  const handlefriendsReq = () => {
    const body ={
      to_user : resUser.user_seq,
    };
    customAxios.post("/friends", body)
    .then((res)=>{
      setIsResultOpen(false);
      setIsResult(false)
      setCanReq(false);
      setResMsg("");
      setResUser({});
      setName("");
      setPhoneNumber("");
    })
    .catch((res)=>{
    })
  }

  const toggleSearch = () => {
    setIsResultOpen(!isResultOpen);
    setIsResult(false);
    setCanReq(false);
    setResMsg("");
    setResUser({});
    setName("");
    setPhoneNumber("");
  };

  return (
    <div className={style.body}>
      <HeaderSub title={"친구 추가"} />
      <div className={style.inputBox}>
        <input type="text" placeholder="이름" value={name} onChange={handleNameChange}/>
      </div>
      <div className={style.inputBox}>
        <input type="tel" placeholder="휴대폰 번호" value={phoneNumber} onChange={handlePhoneNumberChange}/>
      </div>
      <div className={style.underText}>
        - 없이 숫자만 입력해주세요.
      </div>
      <div className={style.inputBtn}>
        <button onClick={handleSearch}>검색</button>
      </div>
      {isResultOpen && (
        isResult ? (
        <div className={style.resultBox}>
          <div className={style.infoBox}>
            <div className={style.infoImgBox}>
              <img src={"/images/" + resUser.profile_img} alt="개굴" />
            </div>
            <div className={style.infoUserBox}>
              <div className={style.infoName}>{resUser.user_name}</div>
              <div className={style.infoNumber}>{resUser.phone}</div>
            </div>
          </div>
          { canReq ? (
            <div className={style.resultBtnBox}>
              <div className={style.resultBtn}>
                <button onClick={handlefriendsReq}>친구신청</button>
              </div>
            </div>
          ): (
            <div className={style.resMsg}>
              {resMsg}
            </div>
          )}
        </div>
        ) : (
          <div className={style.resultBox}>
            등록 되지 않은 유저 입니다
          </div>
        )
      )}
      {isResultOpen && (
        <div className={style.overlay} onClick={toggleSearch}></div>
      )}
    </div>
  );
};

export default FriendsAdd;