import React, { useState } from 'react';
import style from './LoginPage.module.css';
import { useNavigate } from 'react-router-dom';
import { authAxios } from '../api/customAxios';

const LoginPage = () => {
  const navigate = useNavigate();
  const [placeholderId, setPlaceholderId] = useState("아이디");
  const [placeholderPw, setPlaceholderPw] = useState("비밀번호");
  const [id, setId] = useState("");
  const [password,setPassword] = useState("");

  const putId = (e)=>{
    const idConfirm = e.target.value;
    setId(idConfirm);
  }

  const putPassword = (e) =>{
    const passwordConfirm = e.target.value;
    setPassword(passwordConfirm);
  }

  const login =() =>{
    const body ={
      loginId : id,
      loginPassword : password,
    }
    authAxios.post("/users/login", body)
    .then((res)=>{
      console.log(res)
      window.localStorage.setItem("token",res.data.token)
      window.localStorage.setItem("is_autication",true)
      window.location.replace("/")

    })
    .catch((res)=>{
      console.log(res)
    })
  }
  return (
    <div className={style.Login}>
      <div className={style.guide}>
        <span>아이디와 비밀번호를</span>
        <br />
        <span>입력하세요</span>
      </div>
      <div className={style.inputdiv}>
        <input type="text" className={style.input} placeholder={placeholderId} onClick={() => { setPlaceholderId("")}} onChange={putId} />
        <br />
        <input type="password" className={style.input} placeholder={placeholderPw} onClick={() => { setPlaceholderPw("") }} onChange={putPassword} />
        <div className={style.check}>
          <div className={style.autoLogin}>
            <input type="checkbox" name="" id=""/>
            <span>자동 로그인</span>
          </div>
          <div className={style.findidpassword}>
            <span>아이디/비밀번호 찾기</span>
            {/* navigate 연결 - 아이디,비밀번호 찾기 */}
          </div>
        </div>
        <div className={style.noid}>
          <span onClick={() => { navigate("/agreement") }}>아이디가 없으신가요?</span>
        </div>
      </div>
      <button className={style.btn} onClick={login}>로그인</button>
    </div>
  );
}

export default LoginPage;
