import React from 'react';
import style from './Footer.module.css';

const Footer = () => {
  return (
    <div className={style.footer}>
      <img src="./images/FooterHome.png" alt="" />
      <img src="./images/FooterLoan.png" alt="" />
      <img src="./images/FooterFriends.png" alt="" />
      <img src="./images/FooterProfile.png" alt="" />
    </div>
  );
};

export default Footer;