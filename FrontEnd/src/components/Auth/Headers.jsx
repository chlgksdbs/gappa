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
        <img src={props.right} alt="" />
      </div>
    </div>
  );
}

export default Headers;
