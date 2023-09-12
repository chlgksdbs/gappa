import React from 'react';
import classes from './Main.module.css';

const Main = () => {
  return (
    <div className={classes.main}>
      <img src="./images/logo.png" alt="" className={classes.logo}/>
      <img src="./images/gappa.png" alt="" className={classes.gappa}/>
      <div className={classes.btn}>
      <img src="./images/login.png" alt="" />
      <img src="./images/signup.png" alt="" />
      </div>
    </div>
  );
}

export default Main;
