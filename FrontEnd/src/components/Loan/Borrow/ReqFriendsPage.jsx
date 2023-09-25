import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import style from './ReqFriends.module.css';
import HeaderSub from '../../Common/HeaderSub';
import { customAxios } from '../../api/customAxios';

const ReqFriendPages = () => {
  const navigate = useNavigate();

  const [phoneBook, setPhoneBook] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [userSeq, setUserSeq] = useState(-1);

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

  const filteredFriends = phoneBook.filter((friend) => {
    const nameMatch = friend.name.toLowerCase().includes(searchTerm.toLowerCase());
    const phoneMatch = friend.phoneNum.includes(searchTerm);

    return nameMatch || phoneMatch;
  });

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
        <div className={style.friendsList}>
          {filteredFriends.map((friend, index) => (
            <div
              key={index}
              className={`${style.friendItem} ${userSeq===index ? style.selectedFriend : ''}`}
              onClick={() => handleFriendClick(index)}
            >
              
              <img src={friend.img} alt={friend.name} className={style.friendImage} />  
              <div className={style.friendText}>{friend.name}</div>
              <div className={style.friendText}>{formatPhoneNumber(friend.phoneNum)}</div>
            </div>
          ))}
        </div>
      </div>
      <div className={style.inputDiv} style={{height: "7.5%"}}>
        <div className={style.nextBtn} onClick={(()=>{navigate("/reqBorrow")})}>
          다음
        </div>
      </div>
    </div>
  );
};

export default ReqFriendPages;