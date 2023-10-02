import React, { useEffect, useState } from 'react';
import style from './FriendsReqPage.module.css';
import HeaderSub from '../Common/HeaderSub';
import Footer from '../Common/Footer';
import { customAxios } from '../api/customAxios';
// import { useNavigate } from 'react-router-dom';

const FriendsReqPage = () => {
  // const navigate = useNavigate();

  const [friendsReq, setFriendsReq] = useState([]);

  useEffect(() => {
    getRequest();
  }, []);

  // 친구 신청 목록 조회
  const getRequest = () => {
    customAxios.get("/friends/request")
    .then((res)=>{
      console.log(res)
      setFriendsReq(res.data.list);
    })
    .catch((res)=>{
      console.log(res)
    })
  }

  // 친구 신청 응답
  const friendsRes = (seq, resType) => {
    const body ={
      request_seq : seq,
      response : resType, 
    };
    customAxios.post("/friends/response",body)
    .then((res)=>{
      getRequest();
    })
    .catch((res)=>{
      console.log(res);
    })
  }

  return (
    <div className={style.body}>
      <HeaderSub title={"친구 신청"} />
      <div className={style.reqList}>
      {friendsReq.map((request, index) => (
        <div key={index} className={style.requestItem}>
          <img src={"/images/" + request.profile_img} alt={request.to_user_name} />
          <div className={style.infoBox}>
            <div className={style.reqInfo}>
              <div className={style.reqName}>{request.to_user_name}</div>
              <div className={style.reqNum}>{request.phone}</div>
            </div>
            <div className={style.reqBtn}>
              <button onClick={() => friendsRes(request.request_seq, "F")}>거절</button>
              <button onClick={() => friendsRes(request.request_seq, "T")}>수락</button>
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