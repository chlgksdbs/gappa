import React, { useEffect, useState } from 'react';
import style from './NotificationPage.module.css';
import Header from '../Common/Header';
import Footer from '../Common/Footer';
import { useNavigate  } from 'react-router-dom';
import { customAxios } from '../api/customAxios';
import {AiOutlineDelete} from 'react-icons/ai'
import {BiRightArrowAlt} from "react-icons/bi";

const NotificationPage = () => {
  const navigate = useNavigate();

  const [notis, setNotis] = useState([]);
  const [condition, setCondition] = useState(true);
  
  useEffect(() => {
    for (var i = 0 ; i < notis.length ; i++){
      if(notis[i].read === false) {
        setCondition(false);
        break;
      }
    }
  }, [notis]);

  const category = {
    "A" : "대출 신청",
    "R" : "대출 신청 결과",
    "C" : "대출 상환 완료",
    "P" : "대출 상환",
    "F" : "친구",
    "Q" : "친구요청",
  }

  useEffect(() => {
    getNoti();
  }, []);

  const getNoti = () => {
    customAxios.get('/users/alarm')
    .then((res) => {
      console.log(res);
      setNotis(res.data.data);
    })
    .catch((res) => { 
      console.log(res);
    });
  };

  const deleteAll = () => {
    customAxios.put('/users/alarm/all')
    .then((res) => {
      console.log(res);
      window.location.reload();
    })
    .catch((res) => { 
      console.log(res);
      window.location.reload();
    });
  };

  const readNoti = (seq, category) => {
    const body = {
      webAlarmSeq : seq
    }

    customAxios.put('/users/alarm/single', body)
    .then((res) => {
      console.log(res);
      if(category === "A"){
        navigate('/lend/list');
      } else if(category === "R") {
        window.location.reload();
      } else if(category === "C") {
        navigate('/historyborrow');
      } else if(category === "P") {
        navigate('/historyborrow');
      } else if(category === "F") {
        navigate('/friends');
      } else if(category === "Q") {
        navigate('/friends/req');
      }
    })
    .catch((res) => { 
      console.log(res);
      window.location.reload();
    });
  }

  const formattingDate = (date) => {
    var inputDate = new Date(date);
    var options = { year: 'numeric', month: 'long', day: 'numeric' };
    var formattedDate = inputDate.toLocaleDateString('ko-KR', options);
    return formattedDate;
  };
  

  return (
    <div className={style.body}>
      <Header title={"알림함"} />
      {condition ? (
        <div className={style.noneAccountDiv}>
        <img src="/images/GappaMascot.png" alt="" style={{width: "150px"}}/>
        <p>텅 비어 있어요..</p>
      </div>
      ):(<div onClick={deleteAll} className={style.deleteBtnBox}>
        {/* <button>알림함 비우기</button> */}
        {/* <AiOutlineDelete /> */}
        모두 삭제
      </div>
      )}
      <div className={style.notiBox}>
        {notis.map((item, index) => (
          // item.read 값이 false인 경우에만 알림 출력
          !item.read && (
            <div key={index} className={style.item}>
              {/* <div className={style.date}>{formattingDate(item.regDate)}</div> */}
                <div className={style.detailKey}>{category[item.alarmCategory]}</div>
              <div className={style.infoBox}>
                <div className={style.detailValue}></div>
              </div>
              <div className={style.infoBox}>
                {/* <div className={style.detailKey}></div> */}
                <div className={style.detailValue}>{item.alarmContent}</div>
              </div>
              <div style={{width:'100%', display:'flex', justifyContent:'space-between'}}>
                <div className={style.date}>{formattingDate(item.regDate)}</div>
                <div onClick={() => readNoti(item.webAlarmSeq, item.alarmCategory)}>< BiRightArrowAlt /></div>
              {/* <div className={style.btnBox}>
                <button className={style.selectBtn}>확인</button>
              </div> */}
              
              </div>
            </div>
          )
          ))}
      </div>
      <Footer />
    </div>
  );
};

export default NotificationPage;