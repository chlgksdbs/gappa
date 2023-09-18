import React from 'react';
import SignupForm from './SignupForm';
import style from './SignupPage.module.css';

const SignupPage = () => {
  return (
    <div className={style.signuppage}>
      <div>
        <img src="" alt="" />
      </div>
      <div className={style.ex}>
        <span>입력한 정보가 맞다면</span>
        <br />
        <span>아래 확인 버튼을 눌러주세요.</span>
      </div>
      <SignupForm />
      <button className={style.btn}>로그인</button>
    </div>
  );
}

export default SignupPage;
