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

  useEffect(() => {
    getApplyList();
  }, []);

  const getApplyList = () => {
    customAxios.get('/loan/apply')
    .then((res)=>{
      console.log(res);
      const sortedList = res.data.sort((a, b) => new Date(b.startDate) - new Date(a.startDate));
      setApplyList(sortedList);
    })
    .catch((res)=>{
      console.log(res);
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
      <div className={style.container}>
        {applyList.map((item, index) => (
          <div className={style.item} key={index}>
            <div style={{display:'flex', justifyContent:'flex-start', padding:'auto 0'}}>
              <AiOutlineMail />
              <div className={style.subTitle}>&nbsp; 대출 신청이 들어왔어요!</div>
            </div>
            {/* <div className={style.infoBox}>
              <div className={style.detailKey}>{item.fromUser}</div>
              <div className={style.detailValue}>님에게서</div>
            </div>
            <div className={style.infoBox}>
              <div className={style.detailKey}>{item.principal}</div>
              <div className={style.detailValue}>원의 대출 신청이 들어왔어요!</div>
            </div> */}
            <div className={style.infoBox}>
              <div className={style.detailKey}>{item.fromUser}님이 {item.principal}원을 대출 신청 했어요!</div>
            </div>
            <div className={style.btnBox}>
              <div className={style.date}>{formattingDate(item.startDate)}</div>
              {/* <button className={style.selectBtn} onClick={() => handleItemClick(item.loanSeq)}>자세히 보기</button> */}
            <div onClick={() => handleItemClick(item.loanSeq)} style={{alignItems:'right'}}>< BiRightArrowAlt /></div>
            </div>
          </div>
        ))}
      </div>
      <Footer />
    </div>
  );
};

export default LendListPage;