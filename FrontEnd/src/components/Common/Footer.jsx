import React from 'react';
import style from './Footer.module.css';
import { useNavigate } from 'react-router-dom';
import { HiOutlineHome } from 'react-icons/hi2';
import { RiMoneyDollarCircleLine } from 'react-icons/ri';
import { BsPeople } from 'react-icons/bs';

const Footer = () => {
  const navigate = useNavigate();
  
  return (
    <div className={style.footer}>
      {/* <img src="/images/FooterHome.png" alt="" onClick={() => { navigate("/") }}/> */}
      {/* <img src="/images/FooterLoan.png" alt="" onClick={() => { navigate("/historyborrow") }}/> */}
      {/* <img src="/images/FooterFriends.png" alt="" onClick={() => { navigate("/friends") }}/> */}
      <HiOutlineHome size="40px" onClick={() => { navigate("/") }}/>
      <RiMoneyDollarCircleLine size="40px" onClick={() => { navigate("/historyborrow") }}/>
      <BsPeople size="40px" onClick={() => { navigate("/friends") }}/>
      <img src="/images/FooterProfile.png" alt="" onClick={() => { navigate("/profile") }}/>
    </div>
  );
};

export default Footer;