import React, { useEffect, useState } from 'react';
import style from './Header.module.css';
import { useNavigate } from 'react-router-dom';
import { customAxios } from '../api/customAxios';

const Header = ( props ) => {
  const navigate = useNavigate();
  
  let title = props.title;

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [profileImg, setProfileImg] = useState(""); // 프로필이미지
  const [name, setName] = useState(""); // 이름
  const [phone, setPhone] = useState(""); // 핸드폰번호

  useEffect(() => {
    // 토큰 가져오기
    const token = localStorage.getItem("token");

    if (token) {
      var base64Url = token.split(".")[1];
      var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      var jwtPayload = decodeURIComponent(
        atob(base64)
          .split("")
          .map(function (c) {
            return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
          })
          .join("")
      );
      const JsonPayload = JSON.parse(jwtPayload);
      const userSeq = JsonPayload.userSeq;
    
      customAxios.get(`/users/${userSeq}`)
      .then((res)=>{
        console.log(res);
        setProfileImg(res.data.data.profileImg);
        setName(res.data.data.name);
        setPhone(formatPhoneNumber(res.data.data.phone));
      })
      .catch((res)=>{
        console.log(res);
      })
    } else {
      // 토큰이 없는 경우 처리
    }
  }, []);

  // 핸드폰 번호 포맷
  const formatPhoneNumber = (phoneNumber) => {
    const formattedNumber = phoneNumber.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3');
    return formattedNumber;
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };


  return (
    <div className={style.header}>
      <div className="menuIcon" onClick={toggleSidebar} >
        <img src="/images/Menu.png" alt="" className={style.menuIcon} />
      </div>
      <div>
        <p className={style.title}>{title}</p>
      </div>
      <div className="notIcon">
        <img src="/images/Notifications.png" alt="" className={style.notIcon}/>
      </div>
      <div className={`${style.sidebar} ${isSidebarOpen ? style.open : ''}`}>
        <div className={style.sidebarLogo} onClick={() => { navigate("/profile") }}>
          <img src={"/images/" + profileImg} alt="개굴" />
        </div>
        <div className={style.sideName}>{name} 님</div>
        <div className={style.sideEmail}>{phone}</div>
        <div className={style.menus} onClick={() => { navigate("/notice") }} >공지사항</div>
        <div className={style.menus} onClick={() => { navigate("/customerservice") }} >고객센터</div>
        <div className={style.menus} onClick={() => { navigate("/qna") }} >자주묻는 질문</div>
        <div className={style.menus}>로그아웃</div>
      </div>
        {isSidebarOpen && (
          <div className={style.overlay} onClick={toggleSidebar}></div>
        )}
    </div>
  );
};

export default Header;