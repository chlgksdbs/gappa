import React, { useState, useEffect } from 'react';
import style from './Profile.module.css';
import { useNavigate } from 'react-router-dom';
import HeaderSub from '../Common/HeaderSub';
import { customAxios } from '../api/customAxios';
import { useLocation } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';

const ProfilePage = () => {
  const navigate = useNavigate();

  const location = useLocation();
  const locdata = location.state;

  const [profileImg, setProfileImg] = useState(""); // 프로필이미지
  const [name, setName] = useState(""); // 이름
  const [phone, setPhone] = useState(""); // 핸드폰번호
  const [reliability, setReliability] = useState(50); // 신뢰도
  const [myProfile, setMyProfile] = useState(true); // 내가 맞는지
  const [borrowCnt, setBorrowCnt] = useState(0); // 대출 건수
  const [lendCnt, setLendCnt] = useState(0); // 대금 건수
  const [status, setStatus] = useState(""); // 상태
  
  const [overdueCnt, setOverdueCnt] = useState(-1); // 연체 횟수
  const [repaymentsCnt, setRepaymentsCnt] = useState(-1); // 상환 횟수
  
  let title = myProfile ? "내 프로필" : "프로필";
  
  // 핸드폰 번호 포맷
  const formatPhoneNumber = (phoneNumber) => {
    const formattedNumber = phoneNumber.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3');
    return formattedNumber;
  };

  useEffect(() => {
    if (locdata == null){ // 나 일 경우
      // 토큰 가져오기
      const token = localStorage.getItem("token");
  
      if (token) {
        var base64Url = token.split(".")[1];
        var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
        var jwtPayload = decodeURIComponent(
          atob(base64)
            .split("")
            .map(function (c) {
              return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
            })
            .join("")
        );
        const JsonPayload = JSON.parse(jwtPayload);
        const userSeq = JsonPayload.userSeq;
      
        customAxios.get(`/users/${userSeq}`)
        .then((res)=>{
          console.log(res);
          setProfileImg(res.data.data.profileImg);
          setName(res.data.data.name);
          setPhone(formatPhoneNumber(res.data.data.phone));
          setReliability(res.data.data.creditScore);
          setMyProfile(res.data.data.isMyProfile);
          setBorrowCnt(res.data.data.borrowCnt);
          setLendCnt(res.data.data.lendCnt);
        })
        .catch((res)=>{
          console.log(res);
        })
  
      } else {
        // 토큰이 없는 경우 처리
      }
    } else { // 남 일 경우
      customAxios.get(`/users/${locdata}`)
      .then((res)=>{
        console.log(res);
        setProfileImg(res.data.data.profileImg);
        setName(res.data.data.name);
        setPhone(formatPhoneNumber(res.data.data.phone));
        setReliability(res.data.data.creditScore);
        setMyProfile(res.data.data.isMyProfile);
        setOverdueCnt(res.data.data.overdueCnt);
        setRepaymentsCnt(res.data.data.repaymentCnt);
        setStatus(res.data.data.status);
      })
      .catch((res)=>{
        console.log(res);
      })
    }
  }, [locdata]);

  // 친구 삭제
  const handleDelete = () => {
    const body = { list: [{ user_seq: locdata }]};
    customAxios.put("/friends", body)
    .then((res)=>{
      toast.success("친구를 삭제했습니다!", {
        duration: 1000,
      });
      setTimeout(() => {
        window.location.replace("/friends");
      }, 1000);
      console.log(res);
    })
    .catch((res)=>{
      toast.error("친구삭제에 실패했습니다.", {
        duration: 1000,
      });
      setTimeout(() => {
        window.location.replace("/profile");
      }, 1000);
      console.log(res);
    })
  }
  
  return (
    <div className={style.main}>
      <HeaderSub title={title}/>
      <div><Toaster /></div>
      <div className={style.profile}>
        <div className={style.profileImg}>
          <img src={`./images/${profileImg}`} alt="" />
        </div>
        <div>
          <p className={style.name}>
            {name}
            {myProfile ? null : (
              <div>
                {status === 'C' ? (
                  <div className={style.statusBox} style={{backgroundColor: "rgba(128, 206, 190, 0.3)", color: "blue"}}>대출가능</div>
                ) : status === 'O' ? (
                  <div className={style.statusBox} style={{backgroundColor: "rgba(255, 138, 0, 0.3", color: "orange"}}>진행 중</div>
                ) : status === 'D' ? (
                  <div className={style.statusBox} style={{backgroundColor: "rgba(242, 130, 130, 0.3)", color: "red"}}>연체 중</div>
                ) : null}
              </div>
            )}
          </p>
          <p className={style.phone}>{phone}</p>
        </div>
      </div>
      <p style={{width: '85%', fontSize:'18px', fontWeight: 'bold', marginBottom: '5px'}}>신뢰도</p>
      <div className={style.reliabilityTotalGauge}>
        <div className={style.reliabilityGauge} style={{ width: `${reliability}%` }}>
          <div className={style.gaugeContent}>
            <div className={style.triangle}></div>
            <div className={style.reliabilityNumber}>{reliability}%</div>
          </div>
        </div>
      </div>
      {/* 아래 부분은 본인 여부에 따라 달라야함 */}
      {myProfile ? (
        <>
          <button className={style.modBtn} onClick={() => { navigate("/profile/edit") }}>프로필 수정</button>
          <div className={style.listDiv} onClick={() => { navigate("/historyborrow") }}>
            <p>대출 이력 {borrowCnt}건</p>
            <img src="./images/NextBtn.png" alt="" />
          </div>
          <div className={style.line} />
          <div className={style.listDiv} onClick={() => { navigate("/historylend") }}>
            <p>대금 이력 {lendCnt}건</p>
            <img src="./images/NextBtn.png" alt="" />
          </div>
          <div className={style.line} />
          <div className={style.listDiv} onClick={() => { navigate("/profile/accountedit") }}>
            <p>대표 계좌 변경</p>
            <img src="./images/NextBtn.png" alt="" />
          </div>
          <div className={style.line} />
          <div className={style.listDiv} onClick={() => { navigate("/mycertificate") }}>
            <p>GAP PASS 관리</p>
            <img src="./images/NextBtn.png" alt="" />
          </div>
        </>
      ) : (
        // 유저 식별자가 있어야함
        <>
          <div className={style.profileCnt}>
            <div className={style.overdueCnt}>
              <p></p>
              연체 횟수
              <p className={style.overdueCntFont}>{overdueCnt}</p>
            </div>
            <div className={style.repaymentsCnt}>
              <p></p>
              상환 횟수
              <p className={style.repaymentsCntFont}>{repaymentsCnt}</p>
            </div>
          </div>
          <div className={style.deleteBtn} onClick={handleDelete}>
            친구 삭제
          </div>
        </>
      )}
    </div>
  );
};

export default ProfilePage;