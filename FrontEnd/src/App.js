import React, { useEffect } from 'react';
import './App.css';
import { Routes, Route } from "react-router-dom";

import LandingPage from './components/Auth/LandingPage';
import HomePage from './components/Home/HomePage';
import BorrowPage from './components/Loan/Borrow/BorrowPage';
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
import FriendsAddPage from './components/Friends/FriendsAddPage';
import FriendsReqPage from './components/Friends/FriendsReqPage';


function App() {
  // vw, vh를 보이는 화면의 %로 계산하는 식
  function setScreenSize() {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
  }
  // useEffect로 실행될 때마다 작동 되게
  useEffect(() => {
    setScreenSize();
  }, [])

  const is_autication = false;

  return (
    <div className="App">
      <Routes> {/*라우터 작동 정리*/}
        ({is_autication
          ?
          <>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />}/>
            <Route path="/signup" element={<SignupPage />}/>
            <Route path="/agreement" element={<AgreementPage />}/>
            <Route path="/bankbook" element={<BankBookPage/>}/>
            <Route path="/masterbankbook" element={<MasterBankBookPage/>}/>
            <Route path="/pinpassword" element={<PinPassword/>}/>
            <Route path="/pinpasswordconfirm" element={<PinPasswordConfirm/>}/>
            <Route path="/pinpasswordcheck" element={<PinPasswordCheckPage/>}/>
          </>
          :
          <>
            <Route path="/" element={<HomePage />}/>
            <Route path="/borrow" element={<BorrowPage />}/>
            <Route path="/lend" element={<LendPage />}/>
            <Route path="/historyborrow" element={<HistoryBorrowPage />}/>
            <Route path="/historylend" element={<HistoryLendPage />}/>
            <Route path="/historydetail" element={<HistoryDetailPage />}/>
            <Route path="/friends" element={<FriendsPage />}/>
            <Route path="/friends/add" element={<FriendsAddPage />}/>
            <Route path="/friends/req" element={<FriendsReqPage />}/>
            <Route path="/profile" element={<ProfilePage />}/>
            <Route path="/account" element={<AccountDetail />}/>
            <Route path="/profile/edit" element={<ProfileEditPage />}/>
            <Route path="/profile/accountedit" element={<MainAccountEditPage />}/>
            <Route path="/notice" element={<NoticePage />}/>
            <Route path="/qna" element={<QnAPage />}/>
            <Route path="/customerservice" element={<CustomerServicePage />}/>
          </>
        })
      </Routes>
    </div>
  );
}

export default App;
