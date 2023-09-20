import React from 'react';
import style from './Headers.module.css';
import { useNavigate } from 'react-router-dom';
const Headers = (props) => {
  const navigate = useNavigate();
  return (
    <div className={style.header}>
      <div className={style.back}>
        <img src="images/BackBtn.png" alt="" onClick={()=>{navigate(-1)}}/>
      </div>
      <div className={style.middle}>
      <h1>{props.title}</h1>
      </div>
      <div className={style.right}>
        <h2>{props.right}</h2>
      </div>
    </div>
  );
}

export default Headers;
