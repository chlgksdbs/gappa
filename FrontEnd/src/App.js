import React, { useEffect, useState } from 'react';
import './App.css';
import { Routes, Route } from "react-router-dom";

import LandingPage from './components/Auth/LandingPage';
import HomePage from './components/Home/HomePage';
import LendPage from './components/Loan/Lend/LendPage';
import FriendsPage from './components/Friends/FriendsPage';
import ProfilePage from './components/Profile/ProfilePage';
import LoginPage from './components/Auth/LoginPage';
import SignupPage from './components/Auth/SignupPage';
import AgreementPage from './components/Auth/AgreementPage';
import BankBookPage from './components/Auth/BankBookPage';
import MasterBankBookPage from './components/Auth/MasterBankBookPage';
import PinPassword from './components/Auth/PinPassword';
import PinPasswordConfirm from './components/Auth/PinPasswordConfirm';
import PinPasswordCheckPage from './components/Auth/PinPasswordCheckPage';
import AccountDetail from './components/Home/AccountDetail';
import ProfileEditPage from './components/Profile/ProfileEditPage';
import MainAccountEditPage from './components/Profile/MainAccountEditPage';
import NoticePage from './components/Sidebar/NoticePage';
import QnAPage from './components/Sidebar/QnAPage';
import CustomerServicePage from './components/Sidebar/CustomerServicePage';
import HistoryBorrowPage from './components/Loan/History/HistoryBorrowPage';
import HistoryLendPage from './components/Loan/History/HistoryLendPage';
import HistoryDetailPage from './components/Loan/History/HistoryDetailPage';
import ReqAgreementPage from './components/Loan/Borrow/ReqAgreementPage';
import ReqChatPage from './components/Loan/Borrow/ReqChatPage';
import FriendsAddPage from './components/Friends/FriendsAddPage';
import FriendsReqPage from './components/Friends/FriendsReqPage';
import ReqFriendsPage from './components/Loan/Borrow/ReqFriendsPage';
import ReqBorrowPage from './components/Loan/Borrow/ReqBorrowPage';
import LendCheckPage from './components/Loan/Lend/LendCheckPage';
import LendSendPage from './components/Loan/Lend/LendSendPage';
import NotificationPage from './components/Notification/NotificationPage';
import LendCompletePage from './components/Loan/Lend/LendCompletePage';
import Branding from './components/Auth/branding';
import FindCheck from './components/Auth/FindCheck';
import FindId from './components/Auth/FindId';
import FindPassword from './components/Auth/FindPassword';
import NotFound from './components/404/NotFound';
import RepaymentPage from './components/Loan/Repayment/RepaymentPage';
import LendListPage from './components/Loan/Lend/LendListPage';
import FindPasswordChange from './components/Auth/FindPasswordChange';
import MyCertificatePage from './components/Certificate/MyCertificatePage';
import CertificatePage from './components/Certificate/CertificatePage';
import CertIssuePage from './components/Certificate/CertIssuePage';
import GuidePage from './components/Sidebar/GuidePage';

// import LendRefusePage

function App() {
  // vw, vh를 보이는 화면의 %로 계산하는 식
  function setScreenSize() {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
  }
  
  const [isAuthenticated, setIsAuthenticated] = useState(false);  // useEffect로 실행될 때마다 작동 되게
  useEffect(() => {
    setScreenSize();
    const checkTokenInLocalStorage = () => {
      const token = localStorage.getItem("token");
      return token === null;
    };
    setIsAuthenticated(checkTokenInLocalStorage());
    // 이미지 우클릭 방지
    const preventImageContextMenu = (event) => {
      if (event.target.tagName === "IMG") {
        event.preventDefault();
      }
    };
    window.addEventListener("contextmenu", preventImageContextMenu);
    // eslint-disable-next-line
  }, [])

  // const is_autication = true;

  return (
    <div className="App">
      <Routes> {/*라우터 작동 정리*/}
        ({isAuthenticated
          ?
          <>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/agreement" element={<AgreementPage />} />
            <Route path="/branding" element={<Branding/>}/>
            <Route path="/find" element={<FindCheck/>}/>
            <Route path="/find/id" element={<FindId/>}/>
            <Route path="/find/password" element={<FindPassword/>}/>
            <Route path="/find/passwordchange" element={<FindPasswordChange/>}/>
            <Route path="/*" element={<NotFound/>}/>
          </>
          :
          <>
            <Route path="/" element={<HomePage />} />
            <Route path="/lend" element={<LendPage />} />
            <Route path="/lend/list" element={<LendListPage />}/>
            <Route path="/lend/check" element={<LendCheckPage />} />
            <Route path="/lend/send" element={<LendSendPage />} />
            <Route path="/lend/complete" element={<LendCompletePage />} />
            <Route path="/historyborrow" element={<HistoryBorrowPage />} />
            <Route path="/historylend" element={<HistoryLendPage />} />
            <Route path="/historydetail" element={<HistoryDetailPage />} />
            <Route path="/friends" element={<FriendsPage />} />
            <Route path="/friends/add" element={<FriendsAddPage />} />
            <Route path="/friends/req" element={<FriendsReqPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/account" element={<AccountDetail />} />
            <Route path="/profile/edit" element={<ProfileEditPage />} />
            <Route path="/profile/accountedit" element={<MainAccountEditPage />} />
            <Route path="/mycertificate" element={<MyCertificatePage />} />
            <Route path="/cert/issue" element={<CertIssuePage />}/>
            <Route path="/notice" element={<NoticePage />} />
            <Route path="/qna" element={<QnAPage />} />
            <Route path="/customerservice" element={<CustomerServicePage />} />
            <Route path="/reqagreement" element={<ReqAgreementPage />} />
            <Route path="/reqchat" element={<ReqChatPage />} />
            <Route path="/reqfriends" element={<ReqFriendsPage />} />
            <Route path="/reqBorrow" element={<ReqBorrowPage />} />
            <Route path="/guide" element={<GuidePage />}/>
            <Route path="/bankbook" element={<BankBookPage />} />
            <Route path="/masterbankbook" element={<MasterBankBookPage />} />
            <Route path="/pinpassword" element={<PinPassword />} />
            <Route path="/pinpasswordconfirm" element={<PinPasswordConfirm />} />
            <Route path="/pinpasswordcheck" element={<PinPasswordCheckPage />} />
            <Route path="/notification" element={<NotificationPage />} />
            <Route path="/repayment" element={<RepaymentPage />}/>
            <Route path="/certificate" element={<CertificatePage />}/>
            <Route path="/*" element={<NotFound/>}/>
          </>
        })
      </Routes>
    </div>
  );
}

export default App;
