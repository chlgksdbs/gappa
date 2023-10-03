import React, { useState, useRef, useEffect } from 'react';
import html2pdf from 'html2pdf.js';
import style from './Certificate.module.css';
import { customAxios } from '../api/customAxios';
import { useLocation } from 'react-router-dom';
import { numberToKorean, numberToKoreanChunk } from './koreanConverter';



const CertificatePage = () => {
  const location = useLocation();
  const data = location.state; // {loanSeq: 15, toUserSeq: 4, fromUserSeq: 6}
  
  // 채권자 toUser
  const [toUserName, setToUserName] = useState(""); // 이름
  const [toUserPhone, setToUserPhone] = useState(""); // 핸드폰번호
  const [toUserAddress, setToUserAddress] = useState(""); // 주소
  const [toUserDetailAddress, setToUserDetailAddress] = useState(""); // 상세주소
  const [toUserBank, setToUserBank] = useState(""); // 대표은행명
  const [toUserAccountNumber, setToUserAccountNumber] = useState(""); // 대표계좌번호

  // 채무자 fromUser
  const [fromUserName, setFromUserName] = useState(""); // 이름
  const [fromUserPhone, setFromUserPhone] = useState(""); // 핸드폰번호
  const [fromUserAddress, setFromUserAddress] = useState(""); // 주소
  const [fromUserDetailAddress, setFromUserDetailAddress] = useState(""); // 상세주소

  // 채권
  const [startDate, setStartDate] = useState(""); // 실행일
  const [redemptionDate, setRedemptionDate] = useState(""); // 상환예정일
  const [principal, setPrincipal] = useState(""); // 대출원금

  // 핸드폰 번호 포맷
  const formatPhoneNumber = (phoneNumber) => {
    const formattedNumber = phoneNumber.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3');
    return formattedNumber;
  };

  const formatPrincipal = (principal) => {
    // principal를 1,000 단위로 포맷팅하여 반환합니다.
    return principal.toLocaleString();
  };

  const formattedAmount = (principal) => {
    // principal를 한글로 반환합니다.
    return numberToKorean(principal);
  };

  const formatStartdate = (startdate) => {
    // 날짜 문자열을 Date 객체로 파싱
    if (startdate) {
      const date = new Date(startdate);
      // 년, 월, 일 추출
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0'); // 월은 0부터 시작하므로 +1 필요, 두 자리로 패딩
      const day = String(date.getDate()).padStart(2, '0'); // 두 자리로 패딩
    
      // YYYY-MM-DD 형식으로 반환
      return `${year}년 ${month}월 ${day}일`;
    } else {
      return null;
    }
  };
    
  useEffect(() => {
    // 채권자
    customAxios.get(`/users/${data.toUserSeq}`)
      .then((res)=>{
        setToUserName(res.data.data.name);
        setToUserPhone(formatPhoneNumber(res.data.data.phone));
        setToUserAddress(res.data.data.address);
        setToUserDetailAddress(res.data.data.addressDetail);
      })
      .catch((res)=>{
        console.log(res);
      })
    
    // 내가 채권자일때 대표계좌 조회 -> userSeq로 대표계좌 조회하는 api로 바꿔야함
    // customAxios.get(`/accounts/primary`)
    //   .then((res)=>{
    //     console.log(res);
    //     setToUserBank(res.data.bank);
    //     setToUserAccountNumber(res.data.accountNumber);
    //   })
    //   .catch((res)=>{
    //     console.log(res);
    //   })

    // 채권자 대표계좌 조회
    const body = {
      userSeq : data.toUserSeq
    }
    customAxios.post(`/accounts/others/primary`, body)
      .then((res) => {
        console.log(res);
        setToUserBank(res.data.bank);
        setToUserAccountNumber(res.data.accountNumber);
      })
    
    // 채무자
    customAxios.get(`/users/${data.fromUserSeq}`)
    .then((res)=>{
      setFromUserName(res.data.data.name);
      setFromUserPhone(formatPhoneNumber(res.data.data.phone));
      setFromUserAddress(res.data.data.address);
      setFromUserDetailAddress(res.data.data.addressDetail);
    })
    .catch((res)=>{
      console.log(res);
    })

    // 채무자
    customAxios.get(`/loan/history/${data.loanSeq}`)
    .then((res)=>{
      setStartDate(res.data.startDate);
      setRedemptionDate(res.data.redemptionDate);
      setPrincipal(res.data.principal);
    })
    .catch((res)=>{
      console.log(res);
    })
  },[])

  // pdf 저장 로직
  const contentRef = useRef();
  const handleGeneratePdf = () => {
    const content = contentRef.current;

    if (content) {
      const set = {
        margin: 10, // 여백을 원하는 값으로 조정
        filename: 'certificate.pdf',
      }
      html2pdf(content, set);
    }
  };

  return (
    <div className={style.main}>
      <div ref={contentRef}>
        {/* PDF로 저장할 내용 */}
        <div className={style.line} />
        <div className={style.header}>
          <span>차</span>
          <span>용</span>
          <span>증</span>
        </div>
        <div className={style.nemoStyle}>
          <p>■ 차 용 일 : {formatStartdate(startDate)}</p>
          <p>■ 차 용 액 : 금 <span>{formattedAmount(principal)}원</span> 원정 <span>(₩ {formatPrincipal(principal)} )</span></p>
        </div>
        <p>1. 위 금액을 채무자가 채권자로부터 <span>{formatStartdate(startDate)}</span> 틀림없이 차용하였으며,
        아래와 같이 이행할 것을 확약한다.</p>
        <table className={style.tableStyle}>
          <tbody>
            <tr>
              <td className={style.cellStyle1}>원금변제기</td>
              <td className={style.cellStyle2}>{formatStartdate(startDate)}</td>
              <td className={style.cellStyle1}>이 자 율</td>
              <td className={style.cellStyle2}>20 %</td>
            </tr>
          </tbody>
        </table>
        <br />
        <p>2. 채무변제방법</p>
        <p>원금과 이자는 지정일자에 채권자의 주소지에 지참ㆍ지불하거나 아래의 예금계좌로 송금하여 변제한다.</p>
        <table className={style.tableStyle}>
          <tbody>
            <tr>
              <td className={style.cellStyle1}>은 행</td>
              <td className={style.cellStyle2}>{toUserBank}</td>
              <td className={style.cellStyle1}>계좌번호</td>
              <td className={style.cellStyle2}>{toUserAccountNumber}</td>
              <td className={style.cellStyle1}>예 금 주</td>
              <td className={style.cellStyle2}>{toUserName}</td>
            </tr>
          </tbody>
        </table>
        <br />
        <p>3. 대출 상환이 상환예정일까지 이루어지지않았다면, 채무자의 대표계좌에서 자동 송금된다.</p>
        <p>4. 다음과 같은 경우에는 최고 없이 당연히 기한의 이익을 상실하고 잔존 채무금 전부를 즉시 지급한다.</p>
        <p>① 채무자 및 연대보증인이 타의 채권자로부터 가압류 강제집행을 받거나 파산 화해신청을 받을 때</p>
        <p>② 기타 이 약정 조항의 위반할 때</p>
        <p>5. 위 채권을 담보하거나 추심에 필요한 비용은 채무자가 부담한다.</p>
        <p>6. 위 채권에 관한 소는 채권자 주소지에서 한다.</p>
        <p>7. 위 채권에 대한 서명은 공인인증서를 통한 전자서명으로 대체한다.</p>
        <p className={style.dateStyle}>{formatStartdate(startDate)}</p>
        <div className={style.whoDiv}>
          <p>채 권 자</p>
          <div>
            <p>주  소 : {toUserAddress} {toUserDetailAddress}</p>
            <p>연락처 : {toUserPhone}</p>
            <p>성  명 : {toUserName}</p>
          </div>
        </div>
        <div className={style.whoDiv}>
          <p>채 무 자</p>
          <div>
            <p>주  소 : {fromUserAddress} {fromUserDetailAddress}</p>
            <p>연락처 : {fromUserPhone}</p>
            <p>성  명 : {fromUserName}</p>
          </div>
        </div>
        <div className={style.line} />
      </div>
      <button className={style.btnStyle} onClick={handleGeneratePdf}>PDF로 저장하기</button>
    </div>
  );
};

export default CertificatePage;