import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import style from './ReqFriends.module.css';
import HeaderSub from '../../Common/HeaderSub';
import { customAxios } from '../../api/customAxios';
import { useLocation } from 'react-router-dom';

const ReqFriendPages = () => {
  const navigate = useNavigate();

  const [phoneBook, setPhoneBook] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [userSeq, setUserSeq] = useState(-1);
  const [fromUser, setFromUser] = useState(0);

  const currentDate = new Date();
  // currentDate를 YYYY-MM-DD 형식으로 변환합니다.
  const currentYear = currentDate.getFullYear();
  const currentMonth = String(currentDate.getMonth() + 1).padStart(2, '0');
  const currentDay = String(currentDate.getDate()).padStart(2, '0');
  const currentDateString = `${currentYear}-${currentMonth}-${currentDay}`;

  useEffect(() => {
    getFriends();
  }, []);

  // 친구 목록 조회
  const getFriends = () => {
    customAxios.get("/friends")
    .then((res)=>{
      setPhoneBook(res.data.list);
    })
    .catch((res)=>{
      console.log(res)
    })
  }

  const formatPhoneNumber = (phoneNumber) => {
    const formattedPhoneNumber = `${phoneNumber.slice(0, 3)}-${phoneNumber.slice(3, 7)}-${phoneNumber.slice(7, 11)}`;
    return formattedPhoneNumber;
  };

  // 검색어 입력 핸들러
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleFriendClick = (index) => {
    setUserSeq(index);
  };

  const location = useLocation();
  const { balance, dateAsString, reason, reasonText } = location.state || {};

  const filteredFriends = phoneBook.filter((friend) => {
    const nameMatch = friend.user_name.toLowerCase().includes(searchTerm.toLowerCase());
    const phoneMatch = friend.phone.includes(searchTerm);

    return nameMatch || phoneMatch;
  });

  const nextHandler = () => {
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
      setFromUser(JsonPayload.userSeq);
      console.log(JsonPayload.userSeq);
      console.log(fromUser);


      const data = {
        fromUser: parseInt(JsonPayload.userSeq, 10),
        toUser: phoneBook[userSeq].user_seq,
        principal: balance,
        loanReasonCategory: reason,
        loanOtherReason: reasonText,
        startDate: currentDateString + " 09:00:00",
        redemptionDate: dateAsString + " 09:00:00",
      };
      navigate("/reqBorrow", { state: data });
    }
  }

  return (
    <div className={style.body}>
      <HeaderSub/>
      <div className={style.headerStyle}>
        누구에게 대출을 신청할까요?
      </div>
      <div className={style.friendsBox}>
        <div className={style.search}>
          <input type="text" placeholder="친구 검색" value={searchTerm} onChange={handleSearch} />
        </div>
        {phoneBook.length === 0 ? 
        <>
          친구가 없습니다.
        </>
        :
        <div className={style.friendsList}>
          {filteredFriends.map((friend, index) => (
            <div
            key={index}
            className={`${style.friendItem} ${userSeq===index ? style.selectedFriend : ''}`}
            onClick={() => handleFriendClick(index)}
            >
              
              <img src={"/images/" + friend.profile_img} alt={friend.user_name} className={style.friendImage} />  
              <div className={style.friendText}>{friend.user_name}</div>
              <div className={style.friendText}>{formatPhoneNumber(friend.phone)}</div>
            </div>
          ))}
        </div>
        } 
      </div>
      <div className={style.inputDiv}>
        {userSeq === -1 ? 
        <div className={style.notBtn}>
          다음
        </div>
        :
        <div className={style.nextBtn} onClick={nextHandler}>
          다음
        </div>
        }
      </div>
    </div>
  );
};

export default ReqFriendPages;