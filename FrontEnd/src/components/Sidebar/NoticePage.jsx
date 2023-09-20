import React, { useState } from 'react';
import HeaderSub from '../Common/HeaderSub';
import style from './Notice.module.css';

const NoticePage = () => {
  const [notices, setNotices] = useState([
    { id: 1, title: '집가고 싶다 말 금지 종료 예정 안내', date: '9월 19일', 
    content: '집에 가고 싶다고 말하기 금지임집에 가고 싶다고 말하기 금지임', 
    isShow: false },
    { id: 2, title: '가파 캐릭터 넘나 귀여움 ㅎ~ㅎ', date: '9월 7일', 
    content: (<>
      이건
      <br />
      이건 개행
      <br />
      내용입니다
    </>), 
    isShow: false },
    // 여기에 더 많은 공지사항 추가
  ]);

  const handleNoticeClick = (id) => {
    setNotices((prevNotices) =>
      prevNotices.map((notice) =>
        notice.id === id ? { ...notice, isShow: !notice.isShow } : notice
      )
    );
  };

  return (
    <div className={style.main}>
      <HeaderSub title={"공지사항"} />
      
      {notices.map((notice) => (
        <>
          <div className={style.noticeList} key={notice.id} onClick={() => handleNoticeClick(notice.id)}>
            <div>
              <p>
                {notice.title}
              </p>
              <p style={{ fontSize: "12px" }}>{notice.date}</p>
            </div>
            <img src="/images/FoldBtn.png" alt="" style={{height:"30px", marginLeft: "auto"}}/>
          </div>
          {notice.isShow && (
            <div className={style.noticeContent}>
              <p>{notice.content}</p>
            </div>
          )}
        </>
      ))}
    </div>
  );
};

export default NoticePage;
