import React from 'react';
import { createRoot } from 'react-dom/client'; // React 18 이상 버전에서 사용
import './index.css';
import App from './App';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store/index";
import Modal from 'react-modal'; // react-modal을 가져옵니다.
import './firebase-messaging-sw';

// 애플리케이션의 루트 엘리먼트를 설정합니다.
Modal.setAppElement('#root'); // '#root'는 애플리케이션의 루트 엘리먼트의 ID나 선택자로 바꿔야 합니다.

const root = createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
