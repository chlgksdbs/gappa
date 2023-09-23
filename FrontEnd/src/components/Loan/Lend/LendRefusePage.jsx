import React from 'react';
import HeaderSub from '../../Common/HeaderSub';
import style from './LendRefusePage.module.css';

const LendRefuse = () => {
  return (
    <div className={style.body}>
      <HeaderSub title={"대금 요청 거절"} />
      
    </div>
  );
};

export default LendRefuse;