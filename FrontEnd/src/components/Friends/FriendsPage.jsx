import React, { useState } from 'react';
import style from './FriendsPage.module.css';
import Header from '../Common/Header';
import Footer from '../Common/Footer';

const FriendsPage = () => {
  const phoneBook = [
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

  const formatPhoneNumber = (phoneNumber) => {
    const formattedPhoneNumber = `${phoneNumber.slice(0, 3)}-${phoneNumber.slice(3, 7)}-${phoneNumber.slice(7, 11)}`;
    return formattedPhoneNumber;
  };

  const [searchTerm, setSearchTerm] = useState('');
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedFriendIndices, setSelectedFriendIndices] = useState([]);

  // 검색어 입력 핸들러
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  // 편집 버튼 토글 핸들러
  const toggleEditMode = () => {
    setIsEditMode(!isEditMode);
    setSelectedFriendIndices([]);
  };

  const handleFriendClick = (index) => {
    if (isEditMode) {
      if (selectedFriendIndices.includes(index)) {
        setSelectedFriendIndices(selectedFriendIndices.filter((i) => i !== index));
      } else {
        setSelectedFriendIndices([...selectedFriendIndices, index]);
      }
    }
  };
  
  const handleCheckboxClick = (event, index) => {
    event.stopPropagation();
    if (selectedFriendIndices.includes(index)) {
      setSelectedFriendIndices(selectedFriendIndices.filter((i) => i !== index));
    } else {
      setSelectedFriendIndices([...selectedFriendIndices, index]);
    }
  };

  const filteredFriends = phoneBook.filter((friend) => {
    const nameMatch = friend.name.toLowerCase().includes(searchTerm.toLowerCase());
    const phoneMatch = friend.phoneNum.includes(searchTerm);

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
          {isEditMode ? '취소' : '편집'}
        </div>

        <div className={style.friendsList}>
          {filteredFriends.map((friend, index) => (
            <div
              key={index}
              className={`${style.friendItem} ${selectedFriendIndices.includes(index) ? style.selectedFriend : ''}`}
              onClick={() => handleFriendClick(index)}
            >
              
              <img src={friend.img} alt={friend.name} className={style.friendImage} />  
              <div className={style.friendText}>{friend.name}</div>
              <div className={style.friendText}>{formatPhoneNumber(friend.phoneNum)}</div>
              {isEditMode && (
                <input
                  type="checkbox"
                  className={style.checkbox}
                  checked={selectedFriendIndices.includes(index)}
                  onClick={(event) => handleCheckboxClick(event, index)}
                />
              )}
            </div>
          ))}
        </div>

        <div className={style.editBtn}>
          {isEditMode ? (
            <div className={style.deleteBtn}>삭제</div>
          ) : (
            <img src="./images/addFriend.png" alt="" />
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default FriendsPage;