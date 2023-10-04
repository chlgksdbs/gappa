import React, { useEffect, useState } from 'react';
import { customAxios } from '../api/customAxios';

import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import style from './NowTranscation.module.css';
const NowTransaction = () => {
  const [check, setCheck] = useState(false);
  const [loaning, setLoaning] = useState([{
    loanSeq: "1",
    toUser: "김동현",
    profileImg: "gappalogo.png",
    principal: "200000",
    startDate: "2023-01-01 00:00:00",
    redemptionDate: "2023-01-09 00:00:00",
    status: "O",
  },
  {
    loanSeq: "1",
    toUser: "김동현",
    profileImg: "gappalogo.png",
    principal: "200000",
    startDate: "2023-01-01 00:00:00",
    redemptionDate: "2023-01-09 00:00:00",
    status: "O",
  }
  ]);

  useEffect(() => {
    console.log(loaning)
    customAxios.get("/loan/on")
      .then((res) => {
        // console.log(res)
        setCheck(true);
        setLoaning(res.data);
      })
      .catch((res) => {
        setCheck(false);
      })
    // eslint-disable-next-line
  }, [])


  // 캐러셀 세팅
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,

  };

  function calculateRemainingDays(startDate, endDate) {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const timeDiff = end - start;
    const daysRemaining = Math.ceil(timeDiff / (1000 * 3600 * 24)); // 밀리초(ms)를 일(days)로 변환
    return daysRemaining;
  }

  const formatNumberWithCommas = (number) => {
    return Number(number).toLocaleString(); // 숫자에 천 단위 구분 기호(쉼표) 추가
  };

  return (
    <div className={style.body}>
      {check
        ?
        <Slider {...settings}>
          {loaning.map((item) => (
            <div key={item.loanSeq} className={style.map}>
              <div className={style.map} >
                <div>
                  <img src={`images/${item.profileImg}`} alt="" className={style.img} />
                </div>
                <div className={style.detail}>
                  <div className={style.mb}>
                    <span>{item.toUser}님과 거래중입니다.</span>
                  </div>
                  <div className={style.mb}>
                    <span>금액: {formatNumberWithCommas(item.principal)}원</span>
                  </div>
                  <div className={style.mb}>
                    <span>남은 일수: {calculateRemainingDays(item.startDate, item.redemptionDate)}일</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Slider>
        :
        <div className={style.no}>
          현재 거래중인 내용이 없습니다.
        </div>
      }
    </div>
  );
}

export default NowTransaction;
