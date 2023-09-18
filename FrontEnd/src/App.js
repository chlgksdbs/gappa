import React, { useEffect } from 'react';
import './App.css';
import { Routes, Route } from "react-router-dom";

import LandingPage from './components/Auth/LandingPage';
import HomePage from './components/Home/HomePage';
import BorrowPage from './components/Loan/Borrow/BorrowPage';
import LendPage from './components/Loan/Lend/LendPage';
import HistoryPage from './components/Loan/History/HistoryPage';
import FriendsPage from './components/Friends/FriendsPage';
import ProfilePage from './components/Profile/ProfilePage';
import LoginPage from './components/Auth/LoginPage';
import SignupPage from './components/Auth/SignupPage';

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

  const is_autication = true

  return (
    <div className="App">
      <Routes> {/*라우터 작동 정리*/}
        ({is_autication
          ?
          <>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />}/>
            <Route path="/signup" element={<SignupPage />}/>
          </>
          :
          <>
            <Route path="/" element={<HomePage />} />
            <Route path="/borrow" element={<BorrowPage />} />
            <Route path="/lend" element={<LendPage />} />
            <Route path="/history" element={<HistoryPage />} />
            <Route path="/friends" element={<FriendsPage />} />
            <Route path="/profile" element={<ProfilePage />} />
          </>
        })
      </Routes>
    </div>
  );
}

export default App;
