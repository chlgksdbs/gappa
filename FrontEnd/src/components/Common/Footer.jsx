import React from 'react';
import style from './Footer.module.css';
import { useNavigate, useLocation } from 'react-router-dom';
import { HiOutlineHome } from 'react-icons/hi2';
import { RiMoneyDollarCircleLine } from 'react-icons/ri';
import { BsPeople } from 'react-icons/bs';

const Footer = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  
  return (
    <div className={style.footer}>
      {/* <img src="/images/FooterHome.png" alt="" onClick={() => { navigate("/") }}/> */}
      {/* <img src="/images/FooterLoan.png" alt="" onClick={() => { navigate("/historyborrow") }}/> */}
      {/* <img src="/images/FooterFriends.png" alt="" onClick={() => { navigate("/friends") }}/> */}
      <HiOutlineHome
        className={location.pathname === '/' ? style.activeIconStyle : style.iconStyle}
        onClick={() => { navigate("/") }}/>
      <RiMoneyDollarCircleLine
        className={location.pathname === '/historyborrow' ? style.activeIconStyle : style.iconStyle}
        onClick={() => { navigate("/historyborrow") }}/>
      <BsPeople 
        className={location.pathname === '/friends' ? style.activeIconStyle : style.iconStyle}
        onClick={() => { navigate("/friends") }}/>
      <img src="/images/FooterProfile.png" alt=""
        className={location.pathname === '/profile' ? style.activeIconStyle : style.iconStyle}
        onClick={() => { navigate("/profile") }}/>
    </div>
  );
};

export default Footer;