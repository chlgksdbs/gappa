import React, { useEffect, useState } from 'react';
import style from './LendListPage.module.css';
import Header from '../../Common/Header';
import { customAxios } from '../../api/customAxios';
import { useNavigate  } from 'react-router-dom';

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
      setApplyList(res.data);
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
      <Header title={'내게 온 대출 요청 (' + applyList.length + '건)'}/>
      <div className={style.container}>
        {applyList.map((item, index) => (
          <div className={style.item} key={index}>
            <div className={style.date}>{formattingDate(item.startDate)}</div>
            <div className={style.infoBox}>
              <div className={style.detailKey}>{item.fromUser}</div>
              <div className={style.detailValue}>님에게서</div>
            </div>
            <div className={style.infoBox}>
              <div className={style.detailKey}>{item.principal}</div>
              <div className={style.detailValue}>원의 대출 신청이 들어왔어요!</div>
            </div>
            
            <div className={style.btnBox}>
              <button className={style.selectBtn} onClick={() => handleItemClick(item.loanSeq)}>자세히 보기</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LendListPage;