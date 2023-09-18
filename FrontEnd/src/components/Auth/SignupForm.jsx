import React from 'react';
import style from './SignupPage.module.css';

const SignupForm = () => {
  return (
    <div className={style.form}>
      <div>
        <span>아이디</span>
        <br />
        <input type="text" />
        <input type="button" value="중복확인"/>
      </div>
      <>
        <span>이름</span>
        <input type="text" />
      </>
      <>
        <span>통신사</span>
        <input list="phone" name="" id="" />
        <datalist id="phone">
          <option value="SKT" />
          <option value="LG U+" />
          <option value="KT" />
          <option value="알뜰폰" />
        </datalist>
      </>
      <div>
        <span>휴대폰 번호</span>
        <br />
        <input type="text" />
        <input type="button" value="인증번호 발송" />
      </div>
      <>
        <span>비밀번호</span>
        <input type="text" />
      </>
      <>
        비밀번호 확인
        <input type="text" />
      </>
    </div>
  );
}

export default SignupForm;
