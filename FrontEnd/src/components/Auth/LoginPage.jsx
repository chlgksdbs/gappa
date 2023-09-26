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

  const randomData = "words/101.png";

  // 배열
  const [Lone, setLone] = useState(["words/62.png", "words/63.png", "words/64.png", "words/65.png", "words/66.png", "words/67.png", "words/68.png", "words/69.png", "words/70.png", "words/71.png"]);
  const [Ltwo, setLtwo] = useState(["words/1.png", "words/2.png", "words/3.png", "words/4.png", "words/5.png", "words/6.png", "words/7.png", "words/8.png", "words/9.png", "words/10.png"])
  const [Lthree, setLthree] = useState([randomData, "words/11.png", "words/12.png", "words/13.png", "words/14.png", "words/15.png", "words/16.png", "words/17.png", "words/18.png", "words/19.png"])
  //eslint-disable-next-line
  const [Lfour, setLfour] = useState(["words/99.png", "words/20.png", "words/21.png", "words/22.png", "words/100.png", "words/23.png", "words/24.png", "words/25.png", "words/91.png"])
  const [Sone, setSone] = useState(["words/52.png", "words/53.png", "words/54.png", "words/55.png", "words/56.png", "words/57.png", "words/58.png", "words/59.png", "words/60.png", "words/61.png"])
  const [Stwo, setStwo] = useState(["words/26.png", "words/27.png", "words/28.png", "words/29.png", "words/30.png", "words/31.png", "words/32.png", "words/33.png", "words/34.png", "words/35.png"])
  const [Sthree, setSthree] = useState([randomData, "words/36.png", "words/37.png", "words/38.png", "words/39.png", "words/40.png", "words/41.png", "words/42.png", "words/43.png", "words/44.png"])
  //eslint-disable-next-line
  const [Sfour, setSfour] = useState(["words/90.png", "words/45.png", "words/46.png", "words/47.png", "words/48.png", "words/49.png", "words/50.png", "words/51.png", "words/91.png"])

  const [randomLone, setRandomLone] = useState(Math.floor(Math.random() * Lone.length))
  const [randomLtwo, setRandomLtwo] = useState(Math.floor(Math.random() * Ltwo.length))
  const [randomLthree, setRandomLthree] = useState(Math.floor(Math.random() * Lthree.length))

  const [randomSone, setRandomSone] = useState(Math.floor(Math.random() * Sone.length))
  const [randomStwo, setRandomStwo] = useState(Math.floor(Math.random() * Stwo.length))
  const [randomSthree, setRandomSthree] = useState(Math.floor(Math.random() * Sthree.length))


  const addItemAtIndex = (myList, newItem, index) => {
    // 현재 배열을 복사
    const copyList = [...myList];

    // splice 메서드를 사용하여 해당 인덱스에 새로운 요소(newItem)를 추가
    copyList.splice(index, 0, newItem);
    return copyList
    // 업데이트된 배열을 useState를 통해 설정
  };

  const removeItemAtIndex = (myList, indexToRemove) => {
    // filter()를 사용하여 특정 인덱스의 요소를 제외한 새로운 배열 생성
    const updatedList = myList.filter((_, index) => index !== indexToRemove);
    return updatedList
    // 업데이트된 배열을 useState를 통해 설정
  };

  const updateLists = () => {
    setLone(removeItemAtIndex(Lone, randomLone));
    setLtwo(removeItemAtIndex(Ltwo, randomLtwo));
    setLthree(removeItemAtIndex(Lthree, randomLthree));


    setSone(removeItemAtIndex(Sone, randomSone));
    setStwo(removeItemAtIndex(Stwo, randomStwo));
    setSthree(removeItemAtIndex(Sthree, randomSthree));

    const LoneSize = Lone.length;
    const LtwoSize = Ltwo.length;
    const LthreeSize = Lthree.length;
    const SoneSize = Sone.length;
    const StwoSize = Stwo.length;
    const SthreeSize = Sthree.length;

    let randomsLone = Math.floor(Math.random() * LoneSize);
    let randomsLtwo = Math.floor(Math.random() * LtwoSize);
    let randomsLthree = Math.floor(Math.random() * LthreeSize);

    let randomsSone = Math.floor(Math.random() * SoneSize);
    let randomsStwo = Math.floor(Math.random() * StwoSize);
    let randomsSthree = Math.floor(Math.random() * SthreeSize);




    setRandomLone(randomsLone);
    setRandomLtwo(randomsLtwo);
    setRandomLthree(randomsLthree);
    setRandomSone(randomsSone);
    setRandomStwo(randomsStwo);
    setRandomSthree(randomsSthree);

  };

  useEffect(() => {
    setLone(addItemAtIndex(Lone, randomData, randomLone));
    setLtwo(addItemAtIndex(Ltwo, randomData, randomLtwo));
    setLthree(addItemAtIndex(Lthree, randomData, randomLthree));

    setSone(addItemAtIndex(Sone, randomData, randomSone));
    setStwo(addItemAtIndex(Stwo, randomData, randomStwo));
    setSthree(addItemAtIndex(Sthree, randomData, randomSthree));
    //eslint-disable-next-line
  }, [randomLone, randomLtwo, randomLthree, randomSone, randomStwo, randomSthree])



  const handlerLogin = (e) => {
    if (e === "Pw") {
      setPlaceholderPw("");
      setCheck("Pw");
      setModalCheck(true);
    }
  }

  const handlerId = (e) => {
    setId(e.target.value);
    console.log(id)
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
        window.location.replace("/");

      })
      .catch((res) => {
        // console.log(res)
      })
  }
  const keyboardOne = (e, index) => {
    console.log(e)
    if (check === "Pw" && shift) {
      if (e === "words/62.png") {
        setPassword(password + "!")
      } else if (e === "words/63.png") {
        setPassword(password + "@")
      } else if (e === "words/64.png") {
        setPassword(password + "#")
      } else if (e === "words/65.png") {
        setPassword(password + "$")
      } else if (e === "words/66.png") {
        setPassword(password + "%")
      } else if (e === "words/67.png") {
        setPassword(password + "^")
      } else if (e === "words/68.png") {
        setPassword(password + "&")
      } else if (e === "words/69.png") {
        setPassword(password + "*")
      } else if (e === "words/70.png") {
        setPassword(password + "(")
      } else if (e === "words/71.png") {
        setPassword(password + ")")
      }

    } else if (check === "Pw" && !shift) {
      if (e === "words/52.png") {
        setPassword(password + 1)
      } else if (e === "words/53.png") {
        setPassword(password + 2)
      } else if (e === "words/54.png") {
        setPassword(password + 3)
      } else if (e === "words/55.png") {
        setPassword(password + 4)
      } else if (e === "words/56.png") {
        setPassword(password + 5)
      } else if (e === "words/57.png") {
        setPassword(password + 6)
      } else if (e === "words/58.png") {
        setPassword(password + 7)
      } else if (e === "words/59.png") {
        setPassword(password + 8)
      } else if (e === "words/60.png") {
        setPassword(password + 9)
      } else if (e === "words/61.png") {
        setPassword(password + 0)
      }
    }
  }

  const keyboardTwo = (e, index) => {
    if (check === "Pw" && shift) {
      if (e === "words/1.png") {
        setPassword(password + "Q")
      } else if (e === "words/2.png") {
        setPassword(password + "W")
      } else if (e === "words/3.png") {
        setPassword(password + "E")
      } else if (e === "words/4.png") {
        setPassword(password + "R")
      } else if (e === "words/5.png") {
        setPassword(password + "T")
      } else if (e === "words/6.png") {
        setPassword(password + "Y")
      } else if (e === "words/7.png") {
        setPassword(password + "U")
      } else if (e === "words/8.png") {
        setPassword(password + "I")
      } else if (e === "words/9.png") {
        setPassword(password + "O")
      } else if (e === "words/10.png") {
        setPassword(password + "P")
      }
    } else if (check === "Pw" && !shift) {
      if (e === "words/26.png") {
        setPassword(password + "q")
      } else if (e === "words/27.png") {
        setPassword(password + "w")
      } else if (e === "words/28.png") {
        setPassword(password + "e")
      } else if (e === "words/29.png") {
        setPassword(password + "r")
      } else if (e === "words/30.png") {
        setPassword(password + "t")
      } else if (e === "words/31.png") {
        setPassword(password + "y")
      } else if (e === "words/32.png") {
        setPassword(password + "u")
      } else if (e === "words/33.png") {
        setPassword(password + "i")
      } else if (e === "words/34.png") {
        setPassword(password + "o")
      } else if (e === "words/35.png") {
        setPassword(password + "p")
      }
    }
  }
  const keyboardThree = (e, index) => {
    if (check === "Pw" && shift) {
      if (e === "words/11.png") {
        setPassword(password + "A")
      } else if (e === "words/12.png") {
        setPassword(password + "S")
      } else if (e === "words/13.png") {
        setPassword(password + "D")
      } else if (e === "words/14.png") {
        setPassword(password + "F")
      } else if (e === "words/15.png") {
        setPassword(password + "G")
      } else if (e === "words/16.png") {
        setPassword(password + "H")
      } else if (e === "words/17.png") {
        setPassword(password + "J")
      } else if (e === "words/18.png") {
        setPassword(password + "K")
      } else if (e === "words/19.png") {
        setPassword(password + "L")
      }
    } else if (check === "Pw" && !shift) {
      if (e === "words/36.png") {
        setPassword(password + "a")
      } else if (e === "words/37.png") {
        setPassword(password + "s")
      } else if (e === "words/38.png") {
        setPassword(password + "d")
      } else if (e === "words/39.png") {
        setPassword(password + "f")
      } else if (e === "words/40.png") {
        setPassword(password + "g")
      } else if (e === "words/41.png") {
        setPassword(password + "h")
      } else if (e === "words/42.png") {
        setPassword(password + "j")
      } else if (e === "words/43.png") {
        setPassword(password + "k")
      } else if (e === "words/44.png") {
        setPassword(password + "l")
      }
    }
  }
  const keyboardFour = (e, index) => {
    if (check === "Pw" && shift) {
      if (e === "words/99.png") {
        setShift(!shift);
      } else if (e === "words/20.png") {
        setPassword(password + "Z")
      } else if (e === "words/21.png") {
        setPassword(password + "X")
      } else if (e === "words/22.png") {
        setPassword(password + "C")
      } else if (e === "words/100.png") {
        setPassword(password + "V")
      } else if (e === "words/23.png") {
        setPassword(password + "B")
      } else if (e === "words/24.png") {
        setPassword(password + "N")
      } else if (e === "words/25.png") {
        setPassword(password + "M")
      } else if (e === "words/91.png") {
        if (setPassword.length > 0) {
          setPassword(password.slice(0, -1));
        }
      }
    } else if (check === "Pw" && !shift) {
      console.log(password)
      if (e === "words/90.png") {
        setShift(!shift);
      } else if (e === "words/45.png") {
        setPassword(password + "z")
      } else if (e === "words/46.png") {
        setPassword(password + "x")
      } else if (e === "words/47.png") {
        setPassword(password + "c")
      } else if (e === "words/48.png") {
        setPassword(password + "v")
      } else if (e === "words/49.png") {
        setPassword(password + "b")
      } else if (e === "words/50.png") {
        setPassword(password + "n")
      } else if (e === "words/51.png") {
        setPassword(password + "m")
      } else if (e === "words/91.png") {
        if (setPassword.length > 0) {
          setPassword(password.slice(0, -1));
        }
      }
    }
  }
  const keyboardFive = (e, index) => {
    if (check === "Pw" && shift) {
      if (e === "words/92.png") {
        updateLists();
      } else if (e === "words/94.png") {
        // setId(id + "Z")
      } else if (e === "words/95.png") {
        setPassword(password + " ")
      } else if (e === "words/96.png") {
        setModalCheck(false);
      }
    } else if (check === "Pw" && !shift) {
      if (e === "words/92.png") {
        updateLists();
      } else if (e === "words/94.png") {
        setPassword("");
      } else if (e === "words/95.png") {
        setPassword(password + " ")
      } else if (e === "words/96.png") {
        setModalCheck(false);
      }
    }
  }

  const getItemStyle = (item) => {
    if (item === 'words/90.png' || item === 'words/91.png' || item === "words/99.png") {
      return {
        width: '18.1vw',
        height: '6vh',
      };
    }


    // 특별한 조건이 아니라면 기본 스타일을 반환
    return {
      width: '9.05vw',
      height: '6vh',
    };
  };

  const getItemStyleTwo = (item) => {
    if (item === "words/92.png" || item === "words/94.png") {
      return {
        width: "15vw",
      }
    } else if (item === "words/95.png") {
      return {
        width: "45vw",
      }
    }
  }

  const customStyles = {
    overlay: {
      backgroundColor: 'rgba(0, 0, 0, 0.0)', // 투명도를 조절하려면 rgba 색상 값을 사용합니다.
      zIndex: 1000, // 모달이 다른 요소 위에 나타나도록 z-index 설정
    },
  };
  return (
    <div className={style.Login}>
      <div className={style.guide}>
        <span>아이디와 비밀번호를</span>
        <br />
        <span>입력하세요</span>
      </div>
      <div className={style.inputdiv}>
        <input type="text" className={style.input} placeholder={placeholderId} value={id} onChange={((e) => { handlerId(e) })} />
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
        ctrl
        &&
        <Modal
          isOpen={ctrl}
          onRequestClose={() => setCtrl(false)}
          className={style.keyboard}
        >
        </Modal>
      }
      {
        modalCheck
        &&
        <Modal
          isOpen={modalCheck}
          onRequestClose={() => setModalCheck(false)}
          className={style.keyboard}
          style={customStyles}
        >
          {shift
            ?
            <div>
              <div className={style.keyboardset}>
                {Lone.map((word, index) => (
                  <button
                    key={index}
                    onClick={() => keyboardOne(word, index, check)}
                    className={style.keyboardsetitem}
                  >
                    <img src={word} alt="" oncontextmenu="return false" style={{ "-webkit-touch-callout": "none" }} />
                  </button>
                ))}
              </div>
              <div>
                {Ltwo.map((word, index) => (
                  <button
                    key={index}
                    onClick={() => keyboardTwo(word, index, check)}
                    className={style.keyboardsetitem}
                  >
                    <img src={word} alt="" oncontextmenu="return false" style={{ "-webkit-touch-callout": "none" }} />
                  </button>
                ))}
              </div>
              <div>
                {Lthree.map((word, index) => (
                  <button
                    key={index}
                    onClick={() => keyboardThree(word, index, check)}
                    className={style.keyboardsetitem}
                  >
                    <img src={word} alt="" oncontextmenu="return false" style={{ "-webkit-touch-callout": "none" }} />
                  </button>
                ))}
              </div>
              <div>
                {Lfour.map((word, index) => (
                  <button
                    key={index}
                    onClick={() => keyboardFour(word, index, check)}
                    className={style.keyboardsetitem}
                    style={getItemStyle(word)}>
                    <img src={word} alt="" oncontextmenu="return false" style={{ "-webkit-touch-callout": "none" }} />
                  </button>
                ))}
              </div>
              <div>
                {["words/92.png", "words/94.png", "words/95.png", "words/96.png"].map((word, index) => (
                  <button
                    key={index}
                    onClick={() => keyboardFive(word, index, check)}
                    className={style.keyboardsetitemlast}
                    style={getItemStyleTwo(word)}
                  >
                    <img src={word} alt="" oncontextmenu="return false" style={{ "-webkit-touch-callout": "none" }} />
                  </button>
                ))}
              </div>
            </div>
            :
            <div>
              <div>
                {Sone.map((word, index) => (
                  <button
                    key={index}
                    onClick={() => keyboardOne(word, index, check)}
                    className={style.keyboardsetitem}
                  >
                    <img src={word} alt="" oncontextmenu="return false" style={{ "-webkit-touch-callout": "none" }} />
                  </button>
                ))}
              </div>
              <div>
                {Stwo.map((word, index) => (
                  <button
                    key={index}
                    onClick={() => keyboardTwo(word, index, check)}
                    className={style.keyboardsetitem}
                  >
                    <img src={word} alt="" oncontextmenu="return false" style={{ "-webkit-touch-callout": "none" }} />
                  </button>
                ))}
              </div>
              <div>
                {Sthree.map((word, index) => (
                  <button
                    key={index}
                    onClick={() => keyboardThree(word, index, check)}
                    className={style.keyboardsetitem}
                  >
                    <img src={word} alt="" oncontextmenu="return false" style={{ "-webkit-touch-callout": "none" }} />
                  </button>
                ))}
              </div>
              <div>
                {Sfour.map((word, index) => (
                  <button
                    key={index}
                    onClick={() => keyboardFour(word, index, check)}
                    className={style.keyboardsetitem}
                    style={getItemStyle(word)}>
                    <img src={word} alt="" oncontextmenu="return false" style={{ "-webkit-touch-callout": "none" }} />
                  </button>
                ))}
              </div>
              <div>
                {["words/92.png", "words/94.png", "words/95.png", "words/96.png"].map((word, index) => (
                  <button
                    key={index}
                    onClick={() => keyboardFive(word, index, check)}
                    className={style.keyboardsetitemlast}
                    style={getItemStyleTwo(word)}
                  >
                    <img src={word} alt="" oncontextmenu="return false" style={{ "-webkit-touch-callout": "none" }} />
                  </button>
                ))}
              </div>
            </div>
          }
        </Modal >
      }
    </div >
  );
}

export default LoginPage;
