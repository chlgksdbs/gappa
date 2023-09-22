import React from 'react';
import style from './LendCheckPage.module.css';
import HeaderSub from '../../Common/HeaderSub';

const LendCheckPage = () => {
  return (
    <div className={style.body}>
      <HeaderSub title={"대출 요청 확인"} />
    </div>
  );
};

export default LendCheckPage;