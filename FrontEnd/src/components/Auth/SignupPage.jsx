import React, { useState } from 'react';
import SignupForm from './SignupForm';
import style from './SignupPage.module.css';
import Headers from './Headers';
// import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { authAxios } from '../api/customAxios';

const SignupPage = () => {
  const title = "회원가입"
  // const navigate = useNavigate();
  const userInfo = useSelector(state => state.auth);
  // const [signupAPIData, setSignupAPIData] = useState("");

  const [pass, setPass] = useState(false);
  const handlePass = (data) => {
    setPass(data);
  }

  const signupAPIData = {
    "loginId": userInfo.login_Id,
    "loginPassword": userInfo.login_Password,
    "phone": userInfo.phone,
    "name": userInfo.name,
    "address": userInfo.address
  }

  const signupData = () => {
    setTimeout(() => {
      
    }, 100);
    authAxios.post('/users/signup', signupAPIData)
      .then((response) => {
        console.log(response)
        window.localStorage.setItem('token', response.data.data.token )
        window.location.replace("/bankbook");
        // navigate("/bankbook");
      })
      .catch((response) => {
        console.log(response)
      })
  }
  return (
    <div className={style.signuppage}>
      <Headers title={title} />
      <div className={style.ex}>
        <span>입력한 정보가 맞다면</span>
        <br />
        <span>아래 확인 버튼을 눌러주세요.</span>
      </div>
      <SignupForm sendDataToPage={handlePass} />
      {pass
        ?
        <button className={style.btn} onClick={signupData}>확인</button>
        :
        <button className={style.notbtn}>확인</button>
      }
    </div>
  );
}

export default SignupPage;
