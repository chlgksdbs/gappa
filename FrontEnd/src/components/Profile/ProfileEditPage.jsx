import React, { useState, useEffect } from 'react';
import style from './ProfileEdit.module.css';
import HeaderSub from '../Common/HeaderSub';
import DaumPostcode from 'react-daum-postcode';
import Modal from 'react-modal';
import { useNavigate } from 'react-router-dom';
import { customAxios } from '../api/customAxios';

const ProfileEditPage = () => {
  const navigate = useNavigate();

  const [profileImg, setProfileImg] = useState(""); // 프로필이미지
  const [name, setName] = useState(""); // 이름
  const [phone, setPhone] = useState(""); // 핸드폰번호

  const [address, setAddress] = useState("");
  const [addressNumber, setAddressNumber] = useState("");
  const [detailAddress, setDetailAdress] = useState("");
  const [finalAddress, setFinalAddress] = useState("");
  // const [isFinalAddress, setIsFinalAddress] = useState(false);
  const [openPostcode, setOpenPostcode] = useState(false);

  // 핸드폰 번호 포맷
  const formatPhoneNumber = (phoneNumber) => {
    const formattedNumber = phoneNumber.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3');
    return formattedNumber;
  };

  useEffect(() => {
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
        setProfileImg(res.data.data.profileImg);
        setName(res.data.data.name);
        setPhone(formatPhoneNumber(res.data.data.phone));
        setAddress(res.data.data.address);
        setDetailAdress(res.data.data.addressDetail);
        console.log(res);
      })
      .catch((res)=>{
        console.log(res);
      })
    } else {
      // 토큰이 없는 경우 처리
    }
  }, []);

  // 이름 입력 필드의 onChange 핸들러
  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  // 휴대폰 번호 입력 필드의 onChange 핸들러
  const handlePhoneChange = (event) => {
    setPhone(event.target.value);
  };

  const handleAddress = {
    // 버튼 클릭 이벤트
    clickButton: () => {
      setOpenPostcode(current => !current);
    },

    // 주소 선택 이벤트
    selectAddress: (data) => {
      console.log(`
      주소: ${data.address},
      우편번호: ${data.zonecode}
      `)
      setAddress(data.address);
      setAddressNumber(data.zonecode);
      setOpenPostcode(false);
    },
  }

  // 상세주소 변경
  const onChangeDetailAddress = (e) => {
    const currentDetailAddress = e.target.value;
    setDetailAdress(currentDetailAddress);
    if (detailAddress && address && addressNumber) {
      setFinalAddress(`${address} ${addressNumber} ${detailAddress}`);
      // setIsFinalAddress(true);
      console.log(finalAddress);
    } else {
      // setIsFinalAddress(false);
    }
  }

  const modUserInfo = (e) => {
    const phoneFormatted = phone.replace(/-/g, '').replace(/[^0-9]/g, '');

    const requestData = {
      phone: phoneFormatted,
      address: address,
      addressDetail: detailAddress,
    };
    
    customAxios.put(`/users`, requestData)
    .then((res) => {
      // 성공적으로 업데이트된 경우 처리
      console.log("프로필 정보가 성공적으로 업데이트되었습니다.");
      alert("프로필 업데이트 완료"); // 일단 alert로 해놨음. 바꿀 예정
      navigate("/profile");
    })
    .catch((error) => {
      // 오류 발생 시 처리
      alert("프로필 업데이트 실패"); // 일단 alert로 해놨음. 바꿀 예정
      console.error("프로필 정보 업데이트 오류:", error);
    });
  }
  
  return (
    <div className={style.main}>
      <HeaderSub title={"내 프로필 수정"}/>
      <div className={style.profileImg}>
          <img src={`/images/${profileImg}`} alt="" />
      </div>
      <div className={style.profileEdit}>
        <p className={style.detailtitle}>이름</p>
        <input type="text" value={name} className={style.input} onChange={handleNameChange} readOnly/>
        {/* <div className={style.line} /> */}
        <p className={style.detailtitle}>휴대폰 번호</p>
        <input type="text" value={phone} className={style.input} onChange={handlePhoneChange}/>
        {/* <div className={style.line} /> */}
        <div style={{display: "flex", alignItems: "center", justifyContent: "space-between"}}>
          <p className={style.detailtitle}>주소</p>
          <button onClick={handleAddress.clickButton} className={style.formbtn}>주소 검색</button>
        </div>
          <input type="text" value={address} className={style.input} readOnly/>
          {openPostcode &&
            <Modal
              isOpen={openPostcode}
              onRequestClose={() => setOpenPostcode(false)}
              className={style.modal}
            >
              <DaumPostcode
                onComplete={handleAddress.selectAddress}  // 값을 선택할 경우 실행되는 이벤트
                autoClose={false} // 값을 선택할 경우 사용되는 DOM을 제거하여 자동 닫힘 설정
                defaultQuery='' // 팝업을 열때 기본적으로 입력되는 검색어
              />
            </Modal>}
        {/* <div className={style.line} /> */}
        <p className={style.detailtitle}>상세 주소</p>
        <input type="text" value={detailAddress} className={style.input} onChange={onChangeDetailAddress}/>
        {/* <div className={style.line} /> */}
      </div>
      <button className={style.editConfirm} onClick={modUserInfo}>확인</button>
    </div>
  );
};

export default ProfileEditPage;