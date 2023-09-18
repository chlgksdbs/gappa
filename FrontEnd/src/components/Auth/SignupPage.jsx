import React from 'react';
import SignupForm from './SignupForm';
import style from './SignupPage.module.css';
import Headers from './Headers';
const SignupPage = () => {
  const title = "회원가입"
  return (
    <div className={style.signuppage}>
      <Headers title={title}/>
      <div className={style.ex}>
        <span>입력한 정보가 맞다면</span>
        <br />
        <span>아래 확인 버튼을 눌러주세요.</span>
      </div>
      <SignupForm />
      <button className={style.btn}>확인</button>
    </div>
  );
}

export default SignupPage;
