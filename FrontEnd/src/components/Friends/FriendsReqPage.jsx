import React from 'react';
import style from './FriendsReqPage.module.css';
import HeaderSub from '../Common/HeaderSub';
import Footer from '../Common/Footer';

const FriendsReqPage = () => {
  const 친구신청목록 = [
    {img:'/images/DonghyunKoo.png', name:'김동현', phoneNum:'01079797979'},
    {img:'/images/DonghyunKoo.png', name:'김동익', phoneNum:'01089536705'},
    {img:'/images/Add.png', name:'김용범', phoneNum:'01054545454'},
    {img:'/images/Add.png', name:'최한윤', phoneNum:'01043434343'},
    {img:'/images/Add.png', name:'조해린', phoneNum:'01079797797'},
    {img:'/images/Add.png', name:'김정훈', phoneNum:'01089532323'},
    {img:'/images/Add.png', name:'김동익', phoneNum:'01089531115'},
    {img:'/images/Add.png', name:'김동익', phoneNum:'01089536705'},
    {img:'/images/Add.png', name:'조해린', phoneNum:'01079797797'},
    {img:'/images/Add.png', name:'김정훈', phoneNum:'01089532323'},
    {img:'/images/Add.png', name:'김동익', phoneNum:'01089531115'},
    {img:'/images/Add.png', name:'김동익', phoneNum:'01089536705'},
  ]

  return (
    <div className={style.body}>
      <HeaderSub title={"친구 신청"} />
      <div className={style.reqList}>
      {친구신청목록.map((request, index) => (
        <div key={index} className={style.requestItem}>
          <img src={request.img} alt={request.name} />
          <div className={style.infoBox}>
            <div className={style.reqInfo}>
              <div className={style.reqName}>{request.name}</div>
              <div className={style.reqNum}>{request.phoneNum}</div>
            </div>
            <div className={style.reqBtn}>
              <button>수락</button>
              <button>거절</button>
            </div>
          </div>          
        </div>
      ))}
      </div>
      <Footer />
    </div>
  );
};

export default FriendsReqPage;