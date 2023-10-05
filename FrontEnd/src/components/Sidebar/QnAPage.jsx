import React, { useState } from 'react';
import HeaderSub from '../Common/HeaderSub';
import style from './QnA.module.css';

const QnAPage = () => {

  const [qnas, setQnas] = useState([
    { id: 1, title: 'GAPPA에서 제공하는 서비스는 무엇인가요?', 
    content: '개인 간의 대출 서비스를 제공합니다.', isShow: false },
    { id: 2, title: '돈 빌려간 친구가 돈을 안갚아요. 어떻게 해야하나요?',
    content: 'GAPPA에서 실행한 대출이라면 상세보기 화면에서 차용증 출력이 가능합니다. 전자서명이 된 차용증을 이용해 대출 사실을 증빙하여 돈을 받아낼 수 있습니다.', isShow: false },
    { id: 3, title: '대출 이자는 얼마인가요?',
    content: '연 이자율 20%입니다.', isShow: false },
    { id: 4, title: '최대 대출 금액은 얼마인가요?',
    content: '최대 50만원 입니다.', isShow: false },
    { id: 5, title: '신뢰도는 무엇인가요?',
    content: '신뢰도는 신용점수와 같은 지표로 생각하시면 됩니다.', isShow: false },
  ]);

  const handleNoticeClick = (id) => {
    setQnas((prevQnas) =>
      prevQnas.map((qna) =>
        qna.id === id ? { ...qna, isShow: !qna.isShow } : qna
      )
    );
  };

  return (
    <div className={style.main}>
      <HeaderSub title={"자주 묻는 질문"}/>
      <div className={style.body}>
        <h2 className={style.qnaTitle}>무엇을 도와드릴까요?</h2>
        
        {qnas.map((qna) => (
          <>
            <div className={style.qnaList} key={qna.id} onClick={() => handleNoticeClick(qna.id)}>
            <img src="/images/Q.png" alt="" style={{height:"20px", marginRight: "auto"}}/>
              <div>
                <p>
                  {qna.title}
                </p>
              </div>
              <img src="/images/FoldBtn.png" alt="" style={{height:"30px", marginLeft: "auto", transform: "rotate(-90deg)"}}/>
            </div>
            {qna.isShow && (
              <div className={style.qnaContent}>
                <p>{qna.content}</p>
              </div>
            )}
          </>
        ))}
      </div>
    </div>
  );
};

export default QnAPage;