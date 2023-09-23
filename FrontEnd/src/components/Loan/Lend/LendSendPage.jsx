import React from 'react';
import style from './LendSendPage.module.css';
import { useNavigate } from 'react-router-dom';
import HeaderSub from '../../Common/HeaderSub';

const LendSendPage = () => {
  const navigate = useNavigate();
  const acc = "KB국민 1234-4785-4324-1212";
  const money = 50000;
  const holder = "개구리";

  return (
    <div className={style.body}>
      <HeaderSub title={"송금"} />
      <div className={style.accountInfoBox}>
        <div className={style.account}>{acc}</div>
        <div className={style.money}>{money.toLocaleString()}원</div>
        <div className={style.holder}>예금주 : {holder}</div>
      </div>
      <div className={style.detail}>
        <div className={style.detailKey}>대여원금</div>
        <div className={style.detailValue}>{money.toLocaleString()}원</div>
      </div>
      <div className={style.detail}>
        <div className={style.detailKey}>이자율</div>
        <div className={style.detailValue}>20%</div>
      </div>
      <div className={style.detail}>
        <div className={style.detailKey}>상환일</div>
        <div className={style.detailValue}>2023년 09월 08일</div>
      </div>
      <div className={style.detail}>
        <div className={style.detailKey}>상환계좌</div>
        <div className={style.detailValue}>농협</div>
      </div>
      <div className={style.detail}>
        <div className={style.detailKey}></div>
        <div className={style.detailValue}>241-4055-02-1234</div>
      </div>
      <div className={style.detail}>
        <div className={style.detailKey}></div>
        <div className={style.detailValue}>김정훈</div>
      </div>
      <div className={style.bankInput}>
        <div className={style.detailKey}>받는 분 통장 표시</div>
        <div className={style.detailValue}>김정훈</div>
      </div>
      <div className={style.btnBox}>
          <button onClick={()=> navigate('/lend/refuse')}>거절</button>
          <button onClick={()=> navigate('/lend/check')}>확인</button>
        </div>
    </div>
  );
};

export default LendSendPage;