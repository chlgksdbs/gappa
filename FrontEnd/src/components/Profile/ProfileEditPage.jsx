import React from 'react';
import style from './ProfileEdit.module.css';
import { useNavigate } from 'react-router-dom';

const ProfileEditPage = () => {
  const navigate = useNavigate();

  const name = "김동현";
  const phone = "010-7387-7808";
  const address = "대전광역시 유성구 덕명동 600-9";
  const address_detail = "미학 303호";

  
  return (
    <div className={style.main}>
      <div className={style.header}>
        <img src="../../../images/BackBtn.png" alt="" onClick={() => { navigate("/profile") }}/>
        <p className={style.title}>내 프로필 수정</p>
      </div>
      <div className={style.profileImg}>
        <img src="../../../images/DonghyunKoo.png" alt="" />
      </div>
      <div className={style.profileEdit}>
        <p>이름</p>
        <input type="text" value={name} className={style.input}/>
        <div className={style.line} />
        <p>휴대폰 번호</p>
        <input type="text" value={phone} className={style.input}/>
        <div className={style.line} />
        <p>주소</p>
        <input type="text" value={address} className={style.input}/>
        <div className={style.line} />
        <p>상세 주소</p>
        <input type="text" value={address_detail} className={style.input}/>
        <div className={style.line} />
      </div>
      <button className={style.editConfirm}>확인</button>      
    </div>
  );
};

export default ProfileEditPage;