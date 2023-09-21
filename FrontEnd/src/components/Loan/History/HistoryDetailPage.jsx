import React from 'react';
import style from './HistoryDetail.module.css';
import HeaderSub from '../../Common/HeaderSub';
import Footer from '../../Common/Footer';

const HistoryDetailPage = () => {
  const today = new Date();
  const startdate = "2023-01-01";
  const enddate = "2023-02-01";
  const finishdate = "";
  const imgURL = '/images/DonghyunKoo.png';
  const myname = "김동현";
  const username = "김용범";
  const balance = 201486;

  const formatBalance = (balance) => {
    // balance를 1,000 단위로 포맷팅하여 반환합니다.
    return balance.toLocaleString();
  };


  return (
    <div className={style.main}>
      <HeaderSub title={"상세 내역"} />
      <div className={style.detailDiv}>
        <div className={style.line} />
        <div className={style.div1}>
          <div>
            <p className={style.div1Date}>{startdate} ~ {enddate}</p>
            <div className={style.imgDiv}>
              <img src={imgURL} alt="" className={style.div1Img}/>
              <p className={style.div1Name}>{username}</p>
            </div>
            <p className={style.div1Balance}>{formatBalance(balance)}원</p>
          </div>
          <p className={style.div1Status}>연체 중</p>
        </div>
        <div className={style.line} />
        <div>
          <div className={style.div2}>
            <span>채권자</span>
            <span>{myname}</span>
          </div>
          <div className={style.div2}>
            <span>채무자</span>
            <span>{username}</span>
          </div>
        </div>
        <div className={style.line} />
        <div>
          <div className={style.div2}>
            <span>대출 실행일</span>
            <span>{startdate}</span>
          </div>
          <div className={style.div2}>
            <span>상환 예정일</span>
            <span>{enddate}</span>
          </div>
          <div className={style.div2}>
            <span>상환 완료일</span>
            <span>{finishdate}</span>
          </div>
        </div>
        <div className={style.line} />
        <div>
          <div className={style.div2}>
            <span>대출 원금</span>
            <span>200,000 원</span>
          </div>
          <div className={style.div2}>
            <span>대출 잔액</span>
            <span>200,000 원</span>
          </div>
          <div className={style.div2}>
            <span>대출 이자</span>
            <span>1,486 원</span>
          </div>
          <div className={style.div2}>
            <span>중도 상환금</span>
            <span>0 원</span>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default HistoryDetailPage;
