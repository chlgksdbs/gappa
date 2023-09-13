import React from 'react';
import style from './Footer.module.css'

const Footer = () => {
  return (
    <div className={style.footer}>
      <img src="./images/footer_home.png" alt="" />
      <img src="./images/footer_loan.png" alt="" />
      <img src="./images/footer_friends.png" alt="" />
      <img src="./images/footer_profile.png" alt="" />
    </div>
  );
};

export default Footer;