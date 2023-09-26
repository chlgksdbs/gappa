import React, { useEffect } from 'react';
import Headers from './Headers';
import style from './MasterBankBookPage.module.css';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { customAxios } from '../api/customAxios';

const MasterBankBookPage = () => {
  const right = "다음";
  const navigate = useNavigate();
  const userInfo = useSelector(state => state.auth);

  const onClickRight = () =>{
    navigate("/pinpassword");
  }
  useEffect(()=>{
    customAxios.get("/accounts/primary")
    .then((res)=>{
      console.log(res)
    })
  })
  return (
    <div className={style.masterbankbookpage}>
      <Headers right={right} onClickRight={onClickRight}/>
        <img src="images/Check.png" alt="" />
      <div className={style.masterbankbookpages}>
        <h3>대표 계좌 등록이 완료되었습니다.</h3>
        <span>수집 완료까지 보통 1분에서 2분 정도 소요됩니다.</span>
        <span>서버상태에 따라 최대 한 시간이 걸릴 수 있습니다.</span>
      </div>
      <div className={style.masterbankbook}>
        <div className={style.img}>
          <img src={userInfo.bank_Img} alt="" />
        </div>
        <div className={style.bank}>
          <span>{userInfo.account_Number}</span>
          <span className={style.bankword}>{userInfo.bank}</span>
        </div>
        <div className={style.master}>
          <span>대표</span>
        </div>
      </div>
    </div>
  );
}

export default MasterBankBookPage;
