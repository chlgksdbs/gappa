import React, { useState } from 'react';
import HeaderSub from '../Common/HeaderSub';
import style from './Notice.module.css';

const NoticePage = () => {
  const [notices, setNotices] = useState([
    { id: 1, title: 'GAPPA 서비스 서버 배포 안내', date: '9월 1일', 
    content: (<>
      1:1 개인간 맞춤 대출 서비스인 'GAPPA'가
      2023년 9월 1일부로 정상 운영 시작했습니다.
      <br />
      많은 관심 부탁드립니다. 감사합니다.
    </>),
    isShow: false },
    { id: 2, title: 'GAPPA 서비스 베타버전 운영 시작', date: '8월 21일', 
    content: (<>
      삼성청년SW아카데미 대전캠퍼스 9기 B206
      <br />
      특화 프로젝트 (7주, 2023.08.21  ~ 2023.10.06)
      <br />
      김동익, 김동현, 김용범, 김정훈, 조해린, 최한윤
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
              <p>{notice.title}</p>
              <p style={{ fontSize: "12px", marginBottom: "5px"}}>{notice.date}</p>
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
