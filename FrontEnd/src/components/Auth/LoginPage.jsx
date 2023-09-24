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
      else if (e === "Space") {
        setId(id + " ");
      }
      else if (e === "←") {
        if (setId.length > 0) {
          setId(id.slice(0, -1));
        }
      }
      else if (e === "Reset") {
        setId("");
      } else if (e === "Enter") {
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
      else if (e === "Space") {
        setPassword(password + " ");
      }
      else if (e === "←") {
        if (setPassword.length > 0) {
          setPassword(password.slice(0, -1));
        }
      }
      else if (e === "Reset") {
        setPassword("");
      } else if (e === "Enter") {
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
                {["~", "!", "@", "#", "$", "%", "^", "&", "*", "(", ")", "_", "+"].map((number) => (
                  <button
                    key={number}
                    onClick={() => keyboardHendler(number, check)}
                    className={style.keyboardsetitem}
                  >
                    {number}
                  </button>
                ))}
              </div>
              <div>
                {["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P", "{", "}", "|"].map((word) => (
                  <button
                    key={word}
                    onClick={() => keyboardHendler(word, check)}
                    className={style.keyboard13}
                  >
                    {word}
                  </button>
                ))}
              </div>
              <div>
                {["A", "S", "D", "F", "G", "H", "I", "J", "K", "L", ":", '"'].map((word) => (
                  <button
                    key={word}
                    onClick={() => keyboardHendler(word, check)}
                    className={style.keyboard13}
                  >
                    {word}
                  </button>
                ))}
              </div>
              <div>
                {["Z", "X", "C", "V", "B", "N", "M", "<", ">", "?", "Reset"].map((word) => (
                  <button
                    key={word}
                    onClick={() => keyboardHendler(word, check)}
                    className={style.keyboard13}
                  >
                    {word}
                  </button>
                ))}
              </div>
              <div>
                {["Shift ↓", "Space", "←", "Enter"].map((word) => (
                  <button
                    key={word}
                    onClick={() => keyboardHendler(word, check)}
                    className={style.keyboard4}
                  >
                    {word}
                  </button>
                ))}
              </div>
            </div>
            :
            <div>
              <div>
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0,].map((number) => (
                  <button
                    key={number}
                    onClick={() => keyboardHendler(number, check)}
                  >
                    {number}
                  </button>
                ))}
              </div>
              <div>
                {["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"].map((word) => (
                  <button
                    key={word}
                    onClick={() => keyboardHendler(word, check)}
                  >
                    {word}
                  </button>
                ))}
              </div>
              <div>
                {["a", "s", "d", "f", "g", "h", "j", "k", "l"].map((word) => (
                  <button
                    key={word}
                    onClick={() => keyboardHendler(word, check)}
                  >
                    {word}
                  </button>
                ))}
              </div>
              <div>
                {["Shift ↑", "z", "x", "c", "v", "b", "n", "m", "←"].map((word) => (
                  <button
                    key={word}
                    onClick={() => keyboardHendler(word, check)}
                  >
                    {word}
                  </button>
                ))}
              </div>
              <div>
                {["a/@", "Space", "Enter"].map((word) => (
                  <button
                    key={word}
                    onClick={() => keyboardHendler(word, check)}
                  >
                    {word}
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
