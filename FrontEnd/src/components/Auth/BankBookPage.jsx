import React, { useState } from 'react';
import Headers from './Headers';
import style from './BankBookPage.module.css';
const BankBookPage = () => {
  const title = "대표 계좌 선택";

  function Book({ banknumber, bankname, money, index, clickedItems, onClick }) {
    // 클릭 상태에 따라 스타일을 동적으로 설정
    const itemStyle = {
      backgroundColor: clickedItems[index] ? 'lightblue' : 'white',
    };
    return (
      <div className={style.all}>
        {/* <div className={style.bankbooksize}> */}
        <div className={style.bankbooklist} style={itemStyle} onClick={() => onClick(index)}>
          <div className={style.imgstyle}>
            <img src="images/Ssafy.png" alt="" />
          </div>
          <div>
            <span>{banknumber}</span>
            <br />
            <br />
            <span className={style.bankcolor}>{bankname}</span>
          </div>
          <div>
            <br />
            <br />
            <span>{money} 원</span>
          </div>
        </div>
        <hr />
        {/* </div> */}
      </div>
    );
  }


  const bankBookData = [
    {
      banknumber: 12345678900123,
      bankname: "싸피 은행",
      money: "1,110,000",
    },
    {
      banknumber: 12345678900123,
      bankname: "싸피 은행",
      money: "1,110,000"
    },
    {
      banknumber: 12345678900123,
      bankname: "싸피 은행",
      money: "1,110,000"
    },
    {
      banknumber: 12345678900123,
      bankname: "싸피 은행",
      money: "1,110,000"
    },
    {
      banknumber: 12345678900123,
      bankname: "싸피 은행",
      money: "1,110,000"
    },
    {
      banknumber: 12345678900123,
      bankname: "싸피 은행",
      money: "1,110,000"
    },
  ]
  const [pass, setPass] = useState(false);

  // 클릭 상태를 저장할 배열 생성 및 초기값 설정
  const [clickedItems, setClickedItems] = useState(Array(bankBookData.length).fill(false));

  // 클릭 이벤트 핸들러
  const handleItemClick = (index) => {

    // 클릭된 항목의 상태를 변경
    const updatedClickedItems = Array(bankBookData.length).fill(false);
    updatedClickedItems[index] = !clickedItems[index];

    // 클릭된 항목의 개수를 세기
    const clickedCount = updatedClickedItems.filter((item) => item).length;

    setPass(clickedCount === 1);
    setClickedItems(updatedClickedItems);
  };

  return (
    <div className={style.bankbook}>
      <Headers title={title} />
      <div className={style.bankbookstyle}>
        {bankBookData.map((data, index) =>
        (<Book
          banknumber={data.banknumber}
          bankname={data.bankname}
          money={data.money}
          key={index}
          index={index}
          clickedItems={clickedItems} // 클릭 상태 배열 전달
          onClick={handleItemClick} // 클릭 이벤트 핸들러 전달
        />))}
        <span>다음에 하기</span>
      </div>
      {pass
        ?
        <button className={style.btn}>확인</button>
        :
        <button className={style.notbtn}>확인</button>
      }
    </div>
  );
}

export default BankBookPage;
