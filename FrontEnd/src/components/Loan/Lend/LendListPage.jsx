import React, { useEffect, useState } from 'react';
import style from './LendListPage.module.css';
import Header from '../../Common/Header';
import { customAxios } from '../../api/customAxios';
import { useNavigate  } from 'react-router-dom';
import Footer from '../../Common/Footer';
import {AiOutlineMail} from "react-icons/ai";
import {BiRightArrowAlt} from "react-icons/bi";

const LendListPage = () => {
  const navigate = useNavigate();

  const [applyList, setApplyList] = useState([]);
  const [isEmpty, setIsEmpty] = useState(true);

  useEffect(() => {
    getApplyList();
  }, []);

  const getApplyList = () => {
    customAxios.get('/loan/apply')
    .then((res)=>{
      const sortedList = res.data.sort((a, b) => new Date(b.startDate) - new Date(a.startDate));
      setApplyList(sortedList);
      setIsEmpty(false);
    })
    .catch((res)=>{
      setIsEmpty(true);
    })
  }

  const handleItemClick = (seq) => {
    navigate('/lend', { state: { loanSeq: seq}})
  }

  const formattingDate = (date) => {
    var inputDate = new Date(date);
    var options = { year: 'numeric', month: 'long', day: 'numeric' };
    var formattedDate = inputDate.toLocaleDateString('ko-KR', options);
    return formattedDate;
  }


  return (
    <div className={style.body}>
      <Header title={'대출 요청 확인 (' + applyList.length + '건)'}/>
      { isEmpty ? (
        <div className={style.container}>
          <div className={style.noneAccountDiv}>
            <img src="/images/GappaMascot.png" alt="" style={{width: "150px"}}/>
            <p>텅 비어 있어요..</p>
          </div>
        </div>
      ) : (
        <div className={style.container}>
        {applyList.map((item, index) => (
          <div className={style.item} key={index} onClick={() => handleItemClick(item.loanSeq)}>
            <div style={{display:'flex', justifyContent:'flex-start', padding:'auto 0'}}>
              <AiOutlineMail />
              <div className={style.subTitle}>&nbsp; 대출 신청이 들어왔어요</div>
            </div>
            <div className={style.infoBox}>
              <div className={style.detailKey}>{item.fromUser}님이 {item.principal.toLocaleString()}원을 대출 신청 했어요!</div>
            </div>
            <div className={style.btnBox}>
              <div className={style.date}>{formattingDate(item.startDate)}</div>
              {/* <button className={style.selectBtn} onClick={() => handleItemClick(item.loanSeq)}>자세히 보기</button> */}
            <div style={{alignItems:'right'}}>< BiRightArrowAlt /></div>
            </div>
          </div>
        ))}
      </div>
      )}
      
      <Footer />
    </div>
  );
};

export default LendListPage;