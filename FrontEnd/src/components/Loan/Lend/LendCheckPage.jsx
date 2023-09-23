import React from 'react';
import style from './LendCheckPage.module.css';
import { useNavigate } from 'react-router-dom';
import HeaderSub from '../../Common/HeaderSub';

const LendCheckPage = () => {

  const navigate = useNavigate();

  return (
    <div className={style.body}>
      <HeaderSub title={"대출 요청 확인"} />
      <div className={style.container}>
        <div className={style.title}>당사자</div>
        <div className={style.detail}>
          <div className={style.detailKey}>채권자</div>
          <div className={style.detailValue}>김정훈</div>
        </div>
        <div className={style.detail}>
          <div className={style.detailKey}>채무자</div>
          <div className={style.detailValue}>김동현</div>
        </div>
        <div className={style.title}>금전 대여 내용</div>
        <div className={style.detail}>
          <div className={style.detailKey}>대여원금</div>
          <div className={style.detailValue}>50000원</div>
        </div>
        <div className={style.detail}>
          <div className={style.detailKey}>신청일자</div>
          <div className={style.detailValue}>2023-09-06</div>
        </div>
        <div className={style.detail}>
          <div className={style.detailKey}>차용일자</div>
          <div className={style.detailValue}>2023년 09월 06일</div>
        </div>
        <div className={style.title}>연체이자</div>
        <div className={style.detail}>
          <div className={style.detailKey}>이자율</div>
          <div className={style.detailValue}>20%</div>
        </div>
        <div className={style.title}>상환내용</div>
        <div className={style.detail}>
          <div className={style.detailKey}>상환일</div>
          <div className={style.detailValue}>2023년 13월 84일</div>
        </div>
        <div className={style.detail}>
          <div className={style.detailKey}>상환계좌</div>
        </div>
        <div className={style.detail}>
          <div className={style.detailKeyThin}>은행</div>
          <div className={style.detailValue}>농협</div>
        </div>
        <div className={style.detail}>
          <div className={style.detailKeyThin}>계좌번호</div>
          <div className={style.detailValue}>241-4055-02-1234</div>
        </div>
        <div className={style.detail}>
          <div className={style.detailKeyThin}>예금주</div>
          <div className={style.detailValue}>김정훈</div>
        </div>
      </div>
      <div className={style.btnBox}>
          <button onClick={()=> navigate('/lend/send')}>다음</button>
      </div>
    </div>
  );
};

export default LendCheckPage;