import React, { useState } from 'react';
import HeaderSub from '../Common/HeaderSub';
import style from './QnA.module.css';

const QnAPage = () => {

  const [qnas, setQnas] = useState([
    { id: 1, title: '갚아에서 거래 가능한 상품은 무엇인가요?', 
    content: '개인 간의 대출이 가능합니다.', isShow: false },
    { id: 2, title: '돈 떼이면 어떻게 하나요?',
    content: '경찰서에 가야합니다.', isShow: false },
    { id: 3, title: '친구랑 싸우면 도와주시나요??',
    content: 'ㅈㅅ', isShow: false },
    { id: 4, title: '이 질문은 영국에서 돌아.. 100번째..',
    content: '익 하하하하하하', isShow: false },
    { id: 5, title: '갓파 쿠의 여름방학',
    content: '갓 파 쿠~', isShow: false },
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
  );
};

export default QnAPage;