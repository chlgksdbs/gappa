import React, { useState } from 'react';
import style from './Header.module.css';

const Header = ( props ) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  let title = props.title;

  const myName = "김동익";
  const myEmail = "w8h0412@naver.com";

  return (
    <div className={style.header}>
      <div className="menuIcon" onClick={toggleSidebar} >
        <img src="./images/Menu.png" alt="" className={style.menuIcon} />
      </div>
      <div>
        <p className={style.title}>{title}</p>
      </div>
      <div className="notIcon">
        <img src="./images/Notifications.png" alt="" className={style.notIcon}/>
      </div>
      <div className={`${style.sidebar} ${isSidebarOpen ? style.open : ''}`}>
        <div className={style.sidebarLogo}>
          <img src="./images/GappaMascot.png" alt="개굴" />
        </div>
        <div className={style.sideName}>{myName} 님</div>
        <div className={style.sideEmail}>{myEmail}</div>
        <div className={style.menus}>공지사항</div>
        <div className={style.menus}>고객센터</div>
        <div className={style.menus}>자주묻는 질문</div>
        <div className={style.menus}>로그아웃</div>
      </div>
        {isSidebarOpen && (
          <div className={style.overlay} onClick={toggleSidebar}></div>
        )}
    </div>
  );
};

export default Header;