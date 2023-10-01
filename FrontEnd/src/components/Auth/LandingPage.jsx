import React, { useEffect } from 'react';
import style from './LandingPage.module.css';
import { useNavigate } from 'react-router-dom';
const LandingPage = () => {

  const navigate = useNavigate();
  useEffect(()=>{
    const storedIsNewUser = localStorage.getItem("isNewUser");
    if (storedIsNewUser !== "true") {
      localStorage.setItem("isNewUser", "true");
      navigate("/branding");
    }
  },[])
  return (
    <div className={style.main}>
      <img src="./images/gappalogo.png" alt="" className={style.logo}/>
      <img src="./images/Gappa.png" alt="" className={style.gappa}/>
      <div className={style.btn}>
      <img src="./images/login.png" alt="" onClick={()=>{navigate('/login')}}/>
      <img src="./images/signup.png" alt="" onClick={()=>{navigate('/agreement')}}/>
      </div>
    </div>
  );
};

export default LandingPage;