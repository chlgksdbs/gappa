import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import style from './FriendsPage.module.css';
import Header from '../Common/Header';
import Footer from '../Common/Footer';
import { customAxios } from '../api/customAxios';
import toast, { Toaster } from 'react-hot-toast';
import { BsPersonPlus } from "react-icons/bs"; 

const FriendsPage = () => {
  const navigate = useNavigate();

  const [phoneBook, setPhoneBook] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedFriends, setSelectedFriends] = useState([]);

  // 친구신청
  const [friendsReq, setFriendsReq] = useState([]);

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
    })
  }

  // 친구 신청 목록 조회
  useEffect(() => {
    getRequest();
  }, []);

  const getRequest = () => {
    customAxios.get("/friends/request")
    .then((res)=>{
      setFriendsReq(res.data.list);
    })
    .catch((res)=>{
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
    })
  }

  const filteredFriends = phoneBook.filter((friend) => {
    const nameMatch = friend.user_name.toLowerCase().includes(searchTerm.toLowerCase());
    const phoneMatch = friend.phone.includes(searchTerm);

    return nameMatch || phoneMatch;
  });

  const friendsRes = (seq, resType) => {
    const body ={
      request_seq : seq,
      response : resType, 
    };
    customAxios.post("/friends/response",body)
    .then((res)=>{
      if (body.response === 'T'){
        toast.success("친구 신청을 수락했어요", {
          duration: 1000,
        });
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      } else if (body.response === 'F'){
        toast.error("친구 신청을 거절했어요.", {
          duration: 1000,
        });
        setTimeout(() => {
        }, 1000);
      }

      getRequest();
    })
    .catch((res)=>{
    })
  }


  return (
    <div className={style.main}>
      <Header title={"친구 목록"}/>
      <div><Toaster /></div>
      <div className={style.body}>
        <div className={style.search}>
          <input type="text" placeholder="친구 검색" value={searchTerm} onChange={handleSearch} />
        </div>
        <div className={style.editBtn}>
          <div onClick={toggleEditMode}>
            {phoneBook.length > 0 && (
              isEditMode ? '취소' : '편집'
            )}
          </div>
          <div style={{paddingTop: "5px", marginRight: "5px"}}>
            <BsPersonPlus size="30px" color="gray" onClick={() => { navigate("/friends/add") }}/>
          </div>
        </div>
        <div className={style.friendsList}>
          {/* 친구 요청 */}
          {/* friendsReq */}
          {friendsReq.length > 0 ? 
          <>
            <p style={{fontSize: "20px", margin: "10px 0 5px 0", color: "#80CEBE", fontFamily: 'LINESeedKR-Bd'}}>친구 요청</p>
            {friendsReq.map((friendReq, index) => (
              <div key={index} className={style.friendItem}>
                <img src={"/images/" + friendReq.profile_img} alt="" className={style.friendImage}/>
                <div className={style.friendText}>{friendReq.to_user_name}</div>
                <div className={style.friendphone}>{formatPhoneNumber(friendReq.phone)}</div>
                <div className={style.friendsResBtn} onClick={() => friendsRes(friendReq.request_seq, "T")}>수락</div>
                <div className={style.friendsResBtn} onClick={() => friendsRes(friendReq.request_seq, "F")} style={{marginLeft: "8px"}}>거절</div>
              </div>
            ))}
            <div className={style.line} />
          </> : null}
          {/* 친구 리스트 */}
          <p style={{fontSize: "20px", margin: "10px 0 5px 0", color: "#80CEBE", fontFamily: 'LINESeedKR-Bd'}}>친구</p>
          {filteredFriends.map((friend, index) => (
            <div
              key={index}
              className={`${style.friendItem} ${selectedFriends.some(selectedFriend => selectedFriend.user_seq === friend.user_seq) ? style.selectedFriend : ''}`}
              onClick={() => handleFriendClick(friend)}
            >
              <img src={"/images/" + friend.profile_img} alt={friend.user_name} className={style.friendImage} />  
              <div className={style.friendText}>{friend.user_name}</div>
              <div className={style.friendphone}>{formatPhoneNumber(friend.phone)}</div>
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
            null
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default FriendsPage;
