import React from 'react';
import style from './PinPasswordCheckPage.module.css';
import Headers from './Headers';
import { useNavigate } from 'react-router-dom';
const PinPasswordCheckPage = () => {

  const right = "완료"
  const navigate = useNavigate();
  const onClickRight = () => {
    navigate('/');
  }
  return (
    <div className={style.pinpasswordcheck}>

      <Headers right={right} onClickRight={onClickRight} />
      <img src="images/Check.png" alt="" />
      <div className={style.main}>
        <h3>간편 비밀번호 설정이 완료되었습니다.</h3>
        <span>수집완료까지 보통 1분에서 2분 정도 소요됩니다.</span>
        <span>서버상태에 따라 최대 한 시간이 걸릴 수 있습니다.</span>
      </div>
      <div className={style.joke}>
        <span>Gappa는 돈을 갚아할 때 갚아의 영어 발음입니다.</span>
        <span>껄껄껄</span>
        <img src="images/BigGappa.png" alt="" />
      </div>
    </div>
  );
}

export default PinPasswordCheckPage;
