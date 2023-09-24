import React, { useEffect, useState } from 'react';
import style from './LoginPage.module.css';
import { useNavigate } from 'react-router-dom';
import { authAxios } from '../api/customAxios';
import Modal from 'react-modal';


const LoginPage = () => {
  const navigate = useNavigate();
  const [placeholderId, setPlaceholderId] = useState("아이디");
  const [placeholderPw, setPlaceholderPw] = useState("비밀번호");
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");

  const [modalCheck, setModalCheck] = useState(false);
  const [shift, setShift] = useState(false);
  const [ctrl, setCtrl] = useState(false);
  const [check, setCheck] = useState("");

  const handlerLogin = (e) => {
    if (e === "Id") {
      setPlaceholderId("");
      setCheck("Id");
    } else {
      setPlaceholderPw("");
      setCheck("Pw");
    }
    setModalCheck(true);
  }

  const login = () => {
    const body = {
      loginId: id,
      loginPassword: password,
    }
    authAxios.post("/users/login", body)
      .then((res) => {
        console.log(res)
        window.localStorage.setItem("token", res.data.data.token)
        // window.localStorage.setItem("is_autication",true)
        // window.location.replace("/")

      })
      .catch((res) => {
        // console.log(res)
      })
  }


  const keyboardHendler = (e, check) => {
    if (check === "Id") {
      if (e === "Shift ↑" || e === "Shift ↓") {
        setShift(!shift);
      }
      else if (e === "SPACE") {
        setId(id + " ");
      }
      else if (e === "←") {
        if (setId.length > 0) {
          setId(id.slice(0, -1));
        }
      }
      else if (e === "Reset") {
        setId("");
      } else if (e === "확인") {
        setModalCheck(false)
        setTimeout(() => {
          setModalCheck(true);
          setCheck("Pw");
        }, 500);
      } else {
        setId(id + e);
      }
    }
    else {
      if (e === "Shift ↑" || e === "Shift ↓") {
        setShift(!shift);
      }
      else if (e === "SPACE") {
        setPassword(password + " ");
      }
      else if (e === "←") {
        if (setPassword.length > 0) {
          setPassword(password.slice(0, -1));
        }
      }
      else if (e === "Reset") {
        setPassword("");
      } else if (e === "확인") {
        setModalCheck(false);
      }
      else {
        setPassword(password + e);
      }
    }
  }


  return (
    <div className={style.Login}>
      <div className={style.guide}>
        <span>아이디와 비밀번호를</span>
        <br />
        <span>입력하세요</span>
      </div>
      <div className={style.inputdiv}>
        <input type="text" className={style.input} placeholder={placeholderId} value={id} onClick={() => { handlerLogin("Id") }} readOnly />
        <br />
        <input type="password" className={style.input} value={password} placeholder={placeholderPw} onClick={() => { handlerLogin("Pw") }} readOnly />
        <div className={style.check}>
          <div className={style.autoLogin}>
            <input type="checkbox" name="" id="" />
            <span>자동 로그인</span>
          </div>
          <div className={style.findidpassword}>
            <span>아이디/비밀번호 찾기</span>
          </div>
        </div>
        <div className={style.noid}>
          <span onClick={() => { navigate("/agreement") }}>아이디가 없으신가요?</span>
        </div>
      </div>
      <button className={style.btn} onClick={login}>로그인</button>

      {
        modalCheck
        &&
        <Modal
          isOpen={modalCheck}
          onRequestClose={() => setModalCheck(false)}
          className={style.keyboard}
        >
          {shift
            ?
            <div>
              <div className={style.keyboardset}>
                {["words/62.png", "words/63.png", "words/64.png", "words/65.png", "words/66.png", "words/67.png", "words/68.png", "words/69.png", "words/70.png", "words/71.png"].map((number) => (
                  <button
                    key={number}
                    onClick={() => keyboardHendler(number, check)}
                    className={style.keyboardsetitem}
                  >
                    <img src={number} alt="" />
                  </button>
                ))}
              </div>
              <div>
                {["words/1.png", "words/2.png", "words/3.png", "words/4.png", "words/5.png", "words/6.png", "words/7.png", "words/8.png", "words/9.png", "words/10.png"].map((word) => (
                  <button
                    key={word}
                    onClick={() => keyboardHendler(word, check)}
                    className={style.keyboard13}
                  >
                    <img src={word} alt="" />
                  </button>
                ))}
              </div>
              <div>
                {["words/11.png", "words/12.png", "words/13.png", "words/14.png", "words/15.png", "words/16.png", "words/17.png", "words/18.png", "words/19.png"].map((word) => (
                  <button
                    key={word}
                    onClick={() => keyboardHendler(word, check)}
                    className={style.keyboard13}
                  >
                    <img src={word} alt="" />
                  </button>
                ))}
              </div>
              <div>
                {["words/90.png", "words/20.png", "words/21.png", "words/22.png", "words/23.png", "words/24.png", "words/25.png", "words/26.png", "words/91.png"].map((word) => (
                  <button
                    key={word}
                    onClick={() => keyboardHendler(word, check)}
                    className={style.keyboard13}
                  >
                    <img src={word} alt="" />
                  </button>
                ))}
              </div>
              <div>
                {["words/92.png", "words/94.png", "words/95.png", "words/96.png"].map((word) => (
                  <button
                    key={word}
                    onClick={() => keyboardHendler(word, check)}
                    className={style.keyboard4}
                  >
                    <img src={word} alt="" />
                  </button>
                ))}
              </div>
            </div>
            :
            <div>
              <div>
                {["words/52.png", "words/53.png", "words/54.png", "words/55.png", "words/56.png", "words/57.png", "words/58.png", "words/59.png", "words/60.png", "words/61.png"].map((number) => (
                  <button
                    key={number}
                    onClick={() => keyboardHendler(number, check)}
                  >
                    <img src={number} alt="" />
                  </button>
                ))}
              </div>
              <div>
                {["words/26.png", "words/27.png", "words/28.png", "words/29.png", "words/30.png", "words/31.png", "words/32.png", "words/33.png", "words/34.png", "words/35.png"].map((word) => (
                  <button
                    key={word}
                    onClick={() => keyboardHendler(word, check)}
                  >
                    <img src={word} alt="" />
                  </button>
                ))}
              </div>
              <div>
                {["words/36.png", "words/37.png", "words/38.png", "words/39.png", "words/40.png", "words/41.png", "words/42.png", "words/43.png", "words/44.png"].map((word) => (
                  <button
                    key={word}
                    onClick={() => keyboardHendler(word, check)}
                  >
                    <img src={word} alt="" />
                  </button>
                ))}
              </div>
              <div>
                {["words/99.png", "words/45.png", "words/46.png", "words/47.png", "words/48.png", "words/49.png", "words/50.png", "words/51.png", "words/91.png"].map((word) => (
                  <button
                    key={word}
                    onClick={() => keyboardHendler(word, check)}
                  >
                    <img src={word} alt="" />
                  </button>
                ))}
              </div>
              <div>
                {["words/92.png", "words/94.png", "words/95.png", "words/96.png"].map((word) => (
                  <button
                    key={word}
                    onClick={() => keyboardHendler(word, check)}
                    className={style.last}
                  >
                    <img src={word} alt="" />
                  </button>
                ))}
              </div>
            </div>
          }
        </Modal>
      }
    </div>
  );
}

export default LoginPage;
