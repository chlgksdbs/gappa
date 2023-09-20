import React from 'react';
import style from './Header.module.css';

const Header = ( props ) => {

  let title = props.title;

  return (
    <div className={style.header}>
      <div className="menuicon">
        <img src="./images/Menu.png" alt="" className={style.menuicon} />
      </div>
      <div>
        <p className={style.title}>{title}</p>
      </div>
      <div className="noticon">
        <img src="./images/Notifications.png" alt="" className={style.noticon}/>
      </div>
    </div>
  );
};

export default Header;