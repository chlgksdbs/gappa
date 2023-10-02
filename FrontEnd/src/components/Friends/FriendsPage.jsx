import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import style from './FriendsPage.module.css';
import Header from '../Common/Header';
import Footer from '../Common/Footer';
import { customAxios } from '../api/customAxios';

const FriendsPage = () => {
  const navigate = useNavigate();

  const [phoneBook, setPhoneBook] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedFriends, setSelectedFriends] = useState([]);

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

  // 편집 버튼 토글 핸들러
  const toggleEditMode = () => {
    setIsEditMode(!isEditMode);
    setSelectedFriends([]);
  };

  const handleFriendClick = (friend) => {
    if (isEditMode) {
      const friendIndex = selectedFriends.findIndex(selectedFriend => selectedFriend.user_seq === friend.user_seq);
      if (friendIndex !== -1) {
        const newSelectedFriends = [...selectedFriends];
        newSelectedFriends.splice(friendIndex, 1);
        setSelectedFriends(newSelectedFriends);
      } else {
        setSelectedFriends([...selectedFriends, friend]);
      }
    } else {
      const data = friend.user_seq;
      navigate("/profile",  { state: data });
    }
  };
  
  const handleCheckboxClick = (event, friend) => {
    event.stopPropagation();
    const friendIndex = selectedFriends.findIndex(selectedFriend => selectedFriend.user_seq === friend.user_seq);
    if (friendIndex !== -1) {
      const newSelectedFriends = [...selectedFriends];
      newSelectedFriends.splice(friendIndex, 1);
      setSelectedFriends(newSelectedFriends);
    } else {
      setSelectedFriends([...selectedFriends, friend]);
    }
  };

  const handleDelete = () => {
    const body = {list : selectedFriends.map(friend => ({ user_seq: friend.user_seq }))};
    customAxios.put("/friends", body)
    .then((res)=>{
      setIsEditMode(false);

    })
    .catch((res)=>{
      console.log(res)
    })
  }

  const filteredFriends = phoneBook.filter((friend) => {
    const nameMatch = friend.user_name.toLowerCase().includes(searchTerm.toLowerCase());
    const phoneMatch = friend.phone.includes(searchTerm);

    return nameMatch || phoneMatch;
  });

  return (
    <div className={style.body}>
      <Header title={"친구 목록"}/>

      <div className={style.friendsBox}>

        <div className={style.search}>
          <input type="text" placeholder="친구 검색" value={searchTerm} onChange={handleSearch} />
        </div>
        <div className={style.editBtn} onClick={toggleEditMode}>
          {phoneBook.length > 0 && (
            isEditMode ? '취소' : '편집'
          )}
        </div>

        <div className={style.friendsList}>
          {filteredFriends.map((friend, index) => (
            <div
              key={index}
              className={`${style.friendItem} ${selectedFriends.some(selectedFriend => selectedFriend.user_seq === friend.user_seq) ? style.selectedFriend : ''}`}
              onClick={() => handleFriendClick(friend)}
            >
              
              <img src={"/images/" + friend.profile_img} alt={friend.user_name} className={style.friendImage} />  
              <div className={style.friendText}>{friend.user_name}</div>
              <div className={style.friendText}>{formatPhoneNumber(friend.phone)}</div>
              {isEditMode && (
                <input
                  type="checkbox"
                  className={style.checkbox}
                  checked={selectedFriends.some(selectedFriend => selectedFriend.user_seq === friend.user_seq)}
                  onChange={(event) => handleCheckboxClick(event, friend)}
                />              
              )}
            </div>
          ))}
        </div>

        <div className={style.editBtn}>
          {isEditMode ? (
            <div className={style.deleteBtn} onClick={() => handleDelete()}>삭제</div>
          ) : (
            <div>
              <img src="/images/FriendsNoti.png" alt="" className={style.friendsIcon} onClick={() => { navigate("/friends/req") }}/>
              <img src="/images/addFriend.png" alt="" className={style.friendsIcon} onClick={() => { navigate("/friends/add") }}/>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default FriendsPage;
