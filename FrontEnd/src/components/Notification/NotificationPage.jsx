import React, { useEffect, useState } from 'react';
import style from './NotificationPage.module.css';
import Header from '../Common/Header';
import Footer from '../Common/Footer';
import { useNavigate  } from 'react-router-dom';
import { customAxios } from '../api/customAxios';

const NotificationPage = () => {
  const navigate = useNavigate();

  const [notis, setNotis] = useState([]);

  const category = {
    "A" : "대출 신청",
    "R" : "대출 신청 결과",
    "C" : "대출 상환 완료",
    "P" : "대출 상환",
    "F" : "친구",
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
        navigate('/');
      } else if(category === "C") {
        navigate('/historyborrow');
      } else if(category === "P") {
        navigate('/historyborrow');
      } else if(category === "F") {
        navigate('/friends');
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
      <div onClick={deleteAll} className={style.deleteBtnBox}>
        <button>알림함 비우기</button>
      </div>
      <div className={style.notiBox}>
        {notis.map((item, index) => (
          // item.read 값이 false인 경우에만 알림 출력
          !item.read && (
            <div key={index} className={style.item}>
              <div className={style.date}>{formattingDate(item.regDate)}</div>
              <div className={style.infoBox}>
                <div className={style.detailKey}>{category[item.alarmCategory]}</div>
                <div className={style.detailValue}></div>
              </div>
              <div className={style.infoBox}>
                <div className={style.detailKey}></div>
                <div className={style.detailValue}>{item.alarmContent}</div>
              </div>
              <div className={style.btnBox}>
                <button className={style.selectBtn} onClick={() => readNoti(item.webAlarmSeq, item.alarmCategory)}>확인</button>
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