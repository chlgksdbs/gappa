import React from 'react';
import Headers from './Headers';
import { useNavigate } from 'react-router-dom';
import style from './Find.module.css';
const FindCheck = () => {
  const navigate = useNavigate();
  const main = `아이디/비밀번호
  찾기`
  return (
    <div className={style.body}>
      <Headers title={main}/>
      <div className={style.idpassword}>
        <input type="button" value="아이디 찾기" onClick={() => { navigate("id") }} className={style.btn}/>
        <input type="button" value="비밀번호 찾기" onClick={() => { navigate("password") }} className={style.btn}/>
      </div>
    </div>
  );
}

export default FindCheck;
