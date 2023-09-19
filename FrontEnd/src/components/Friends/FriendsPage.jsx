import React, { useState } from 'react';
import style from './FriendsPage.module.css';
import Header from '../Home/Header';
import Footer from '../Home/Footer';

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

  // 검색어 입력 핸들러
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };
  
  const filteredFriends = phoneBook.filter((friend) => {
    // const formattedPhoneNumber = formatPhoneNumber(friend.phoneNum);
    const nameMatch = friend.name.toLowerCase().includes(searchTerm.toLowerCase());
    const phoneMatch = friend.phoneNum.includes(searchTerm);

    return nameMatch || phoneMatch;
  });

  return (
    <div className={style.body}>
      <Header />

      <div className={style.friendsBox}>

        <div className={style.search}>
          <input type="text" placeholder="친구 검색" value={searchTerm} onChange={handleSearch} />
        </div>
        <div className={style.editBtn}>
          편집
        </div>
        <div className={style.friendsList}>
          {filteredFriends.map((friend, index) => (
          <div key={index} className={style.friendItem}>
            <img src={friend.img} alt={friend.name} className={style.friendImage} />  
            <div className={style.friendText}>{friend.name}</div>
            <div className={style.friendText}>{formatPhoneNumber(friend.phoneNum)}</div>
          </div>
          ))}
        </div>

        <div className={style.editBtn}>
          
          <img src="./images/addFriend.png" alt="" />  
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default FriendsPage;