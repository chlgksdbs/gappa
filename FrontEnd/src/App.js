import React, { useEffect } from 'react';
import './App.css';
import Main from './components/main';
import {Routes,Route} from "react-router-dom";

function App() {
  // vw, vh를 보이는 화면의 %로 계산하는 식
  function setScreenSize() {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
  }
  // useEffect로 실행될 때마다 작동 되게
  useEffect(()=>{
    setScreenSize();
  },[])
  
  return (
    <div className="App">
      <Routes> {/*라우터 작동 정리*/}
        <Route path="*" element={<Main />}></Route>
      </Routes>
    </div>
  );
}

export default App;
