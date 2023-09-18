import React from 'react';
import style from './SignupPage.module.css';

const SignupForm = () => {
  return (
    <div className={style.form}>
      <div className={style.idform}>
        <span>아이디</span>
        <br />
        <input type="text" className={style.forminput}/>
        <input type="button" value="중복확인" className={style.formbtn}/>
      </div>
      <>
        <span>이름</span>
        <input type="text" className={style.input} />
      </>
      <>
        <span>통신사</span>
        <select className={style.input}>
          <option value="SKT">SKT</option>
          <option value="KT">KT</option>
          <option value="LG U+">LG U+</option>
          <option value="알뜰폰">알뜰폰</option>
        </select>
      </>
      <div className={style.phoneform}>
        <span>휴대폰 번호</span>
        <br />
        <input type="text" className={style.forminput}/>
        <input type="button" value="인증번호 발송" className={style.formbtn}/>
      </div>
      <>
        <span>비밀번호</span>
        <input type="text" className={style.input} />
      </>
      <>
        비밀번호 확인
        <input type="text" className={style.input} />
      </>
    </div>
  );
}

export default SignupForm;
