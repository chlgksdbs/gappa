import React, { useEffect, useState } from 'react';
import style from './ReqAgreement.module.css';
import HeaderSub from '../../Common/HeaderSub';
import { useNavigate } from 'react-router-dom';

const ReqAgreementPage = () => {
  const navigate = useNavigate();

  const [agreeCheck, setAgreeCheck] = useState(true);

  const [allCheck, setAllCheck] = useState(false);
  const [memberCheck, setMemberCheck] = useState(false);
  const [serviceCheck, setServiceCheck] = useState(false);
  const [bankCheck, setBankCheck] = useState(false);
  const [phoneCheck, setPhoneCheck] = useState(false);
  const [checkPoint, setCheckPoint] = useState(false);

  const agreeCheckHandler = (() => {
    setAgreeCheck(false);
  })

  const allCheckHandler = (() => {
    if (allCheck === true) {

      setAllCheck(!allCheck);
      setMemberCheck(false);
      setServiceCheck(false);
      setBankCheck(false);
      setPhoneCheck(false);
    }
    else {
      setAllCheck(!allCheck);
      setMemberCheck(true);
      setServiceCheck(true);
      setBankCheck(true);
      setPhoneCheck(true);
    }
  })

  const memberCheckHandler = (() => {
    setMemberCheck(!memberCheck);
    if (serviceCheck && bankCheck && phoneCheck === true) {
      if (allCheck === false) {
        setAllCheck(true);
      }
      else {
        setAllCheck(false);
      }
    }
  })

  const serviceCheckHandler = (() => {
    setServiceCheck(!serviceCheck);
    if (memberCheck && bankCheck && phoneCheck === true) {
      if (allCheck === false) {
        setAllCheck(true);
      }
      else {
        setAllCheck(false);
      }
    }
  })

  const bankCheckHandler = (() => {
    setBankCheck(!bankCheck);
    if (serviceCheck && memberCheck && phoneCheck === true) {
      if (allCheck === false) {
        setAllCheck(true);
      }
      else {
        setAllCheck(false);
      }
    }
  })

  const phoneCheckHandler = (() => {
    setPhoneCheck(!phoneCheck);
    if (serviceCheck && bankCheck && memberCheck === true) {
      if (allCheck === false) {
        setAllCheck(true);
      }
      else {
        setAllCheck(false);
      }
    }
  })

  useEffect(() => {
    if (memberCheck && serviceCheck && bankCheck && phoneCheck === true) {
      setCheckPoint(true);
    }
    else {
      setCheckPoint(false);
    }
    // eslint-disable-next-line
  }, [allCheck, memberCheck, serviceCheck, bankCheck, phoneCheck])

  return (
    <div className={style.main}>
      <HeaderSub title={"대출 약관 동의"} />
      {agreeCheck ? 
      <>
        <div className={style.body}>
          <div className={style.agreeCheckDiv1}>
            <span className={style.span1}>
              신용대출을 알아보기 전 
              <br/>
              미리 확인해주세요!
            </span>
            <p></p>
            <span className={style.span3}>
              ※ 설명 내용을 제대로 이해하지 못하였음에도 불구하고 설명을 이해했다는 서명을 하거나 녹취 기록을 남기시는 경우, 추후 해당 내용과
             관련한 권리구제가 어려울 수 있어요.
            </span>
            <p></p>
            <br/>
            <span className={style.span1}>
              신용대출 상품은
              <br/>
              담보대출과 다른 특징이 있어요
            </span>
            <p></p>
            <span className={style.span2}>
              신용대출은 고객님의 소득, 보유 대출 및 연체 기록 등을
              
              종합적으로 평가하여 대출한도와 금리가 정해지는
            
              상품이에요. 담보대출처럼 부동산과 같은 별도의 담보를
             
              요구하지 않고 대출 절차가 간편하지만 담보대출보다
             
              금리가 높은 경우가 많아 같은 금액을 신용대출로 빌리게
              
              되면 이자가 더 높을 수 있어요.
            </span>
            <p></p>
            <span className={style.span3}>
              ⓘ 사잇돌대출, 비상금대출 등 일부 대출 상품은 보증기관의 신용보증서를
           
              담보로 운용합니다.
            </span>
            <p></p>
            <br/>
            <span className={style.span1}>
              대출을 받는 것만으로도
              <br/>
              신용점수가 떨어질 수 있어요.
            </span>
            <p></p>
            <span className={style.span2}>
              신용점수가 하락하면 대출 연장 시 금리가 높아지거나
              
              신용카드 발급이 거절되는 등 토스뱅크 및 다른
             
              금융회사와의 금융거래 이용이 어려울 수 있어요.
            </span>
          </div>
        </div>
        <div className={style.nextBtn} onClick={agreeCheckHandler}>다음</div>
      </>
       : 
      <>
        <div className={style.agree}>
          <div className={style.agreeall}>
            <span>전체 동의</span>
            <input
              type="checkbox"
              name="전체 동의"
              id=""
              checked={allCheck}
              onChange={(e) => allCheckHandler(e)} />
          </div>
          <hr />
          <div className={style.agreeone}>
            <div>
              <span>개인정보 필수 수집 이용 동의(필수)</span>
              <img src="images/NextBtn.png" alt="" />
            </div>
            <input
              type="checkbox"
              name="개인정보 필수 수집 이용 동의(필수)"
              id=""
              checked={memberCheck}
              onChange={(e) => memberCheckHandler(e)} />
          </div>
          <div className={style.agreeone}>
            <div>
              <span>서비스 이용 약관(필수)</span>
              <img src="images/NextBtn.png" alt="" />
            </div>
            <input
              type="checkbox"
              name="서비스 이용 약관(필수)"
              id=""
              checked={serviceCheck}
              onChange={(e) => serviceCheckHandler(e)} />
          </div>
          <div className={style.agreeone}>
            <div>
              <span>금융결제원 / 계좌통합조회 약관(필수)</span>
              <img src="images/NextBtn.png" alt="" />
            </div>
            <input
              type="checkbox"
              name="금융결제원 / 계좌통합조회 약관"
              id=""
              checked={bankCheck}
              onChange={(e) => bankCheckHandler(e)} />
          </div>
          <div className={style.agreeone}>
            <div>
              <span>통신사, 본인확인 휴대폰 인증 약관(필수)</span>
              <img src="images/NextBtn.png" alt="" />
            </div>
            <input
              type="checkbox"
              name="통신사, 본인확인 휴대폰 인증 약관"
              id=""
              checked={phoneCheck}
              onChange={(e) => phoneCheckHandler(e)} />
          </div>
          <div className={style.buttondiv}>
            {
              checkPoint
                ?
                <div className={style.goodbtn} onClick={()=>navigate("/reqchat")}>다음</div>
                :
                <div className={style.notbtn}>다음</div>
            }
          </div>
        </div>
      </>
      }
      
    </div>
  );
};

export default ReqAgreementPage;