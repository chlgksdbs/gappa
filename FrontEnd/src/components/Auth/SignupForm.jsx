import { React, useState, useRef, useEffect } from 'react';
import style from './SignupPage.module.css';
import DaumPostcode from 'react-daum-postcode';
import Modal from 'react-modal';
import { useDispatch } from 'react-redux';
import { authActions } from '../../store/authslice';
import { authAxios } from '../api/customAxios';
const SignupForm = (props) => {

  //초기값 세팅
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [phoneCheckNumber, setPhoneCheckNumber] = useState("");

  const [address, setAddress] = useState("");
  const [addressNumber, setAddressNumber] = useState("");
  const [detailAddress, setDetailAdress] = useState("");
  const [finalAddress, setFinalAddress] = useState("");

  // 정보 확인
  const dispatch = useDispatch();

  //오류 메세지
  const [idMessage, setIdMessage] = useState("");
  const [passwordMessage, setPasswordMessage] = useState("");
  const [passwordConfirmMessage, setPasswordConfirmMessage] = useState("");
  const [phoneMessage, setPhonemessage] = useState("");
  //유효성 검사
  // const [idOverlap, setIdOverlap] = useState(false);
  const [openPostcode, setOpenPostcode] = useState(false);

  const [isId, setIsId] = useState(false);
  const [isPassword, setIsPassword] = useState(false);
  const [isPasswordConfirm, setIsPasswordConfirm] = useState(false);
  const [isFinalAddress, setIsFinalAddress] = useState(false);
  const [checkPhone, setCheckPhone] = useState(false);
  // const [isPhone,setIsPhone] = useState(false);
  const [pass, setPass] = useState(false);
  const [checkPhoneNumber, setCheckPhoneNumber] = useState(false);


  // 보안 키패드 관련 상태관리
  const [modalCheck, setModalCheck] = useState(false);
  const [check, setCheck] = useState("");
  const [shift, setShift] = useState(false);
  const randomData = "words/101.png";
  // 이름 입력
  const onChangeName = (e) => {
    const currentName = e.target.value;
    setName(currentName);
  }

  // 아이디 입력
  const onChangeId = (e) => {
    const currentId = e.target.value;
    setId(currentId);
    const idRegExp = /^[a-zA-z0-9]{4,12}$/;

    if (!idRegExp.test(currentId)) {
      setIdMessage("4-12 사이 대소문자 또는 숫자만 입력해 주세요!");
      setIsId(false);
    } else {
      setIdMessage("");
    }
  };


  // 아이디 중복확인
  const onChangeIdOverlap = () => {
    const idRegExp = /^[a-zA-z0-9]{4,12}$/;
    if (!idRegExp.test(id)) {
      setIdMessage("4-12 사이 대소문자 또는 숫자만 입력해 주세요!");
      setIsId(false);

    } else {
      setIdMessage("");
      const checkIds = {
        loginId: id,
      }
      setTimeout(() => {
        authAxios.post("/users/checkid", checkIds)
          .then((response) => {
            setIdMessage(response.data.message);
            setIsId(response.data.data.code);
            console.log(response)
          })
      }, 500);
    }
  }


  const onClickPassword = (e) => {
    setModalCheck(true);
    setCheck(e);
    setShift(false)
  }

  useEffect(() => {
    const passwordRegExp =
      /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/;
    if (!passwordRegExp.test(password)) {
      setPasswordMessage(
        "숫자+영문자+특수문자 조합으로 8자리 이상 입력해주세요!"
      );
      setIsPassword(false);
      if (isPassword) {
        if (password !== passwordConfirm) {
          setPasswordConfirmMessage("비밀번호가 일치하지 않습니다.");
          setIsPasswordConfirm(false);
        } else {
          setPasswordConfirmMessage("비밀번호가 일치합니다.");
          setIsPasswordConfirm(true);
        }
      }
    } else {
      setPasswordMessage("안전한 비밀번호 입니다.");
      setIsPassword(true);
      if (isPassword) {
        if (password !== passwordConfirm) {
          setPasswordConfirmMessage("비밀번호가 일치하지 않습니다.");
          setIsPasswordConfirm(false);
        } else {
          setPasswordConfirmMessage("비밀번호가 일치합니다.");
          setIsPasswordConfirm(true);
        }
      }
    }

    setPasswordConfirm(passwordConfirm);
    if (isPassword) {
      if (password !== passwordConfirm) {
        setPasswordConfirmMessage("비밀번호가 일치하지 않습니다.");
        setIsPasswordConfirm(false);
      } else {
        setPasswordConfirmMessage("비밀번호가 일치합니다.");
        setIsPasswordConfirm(true);
      }

    };
    // eslint-disable-next-line
  }, [password, passwordConfirm])


  const onCHnagePhoneCheckNumber = (e) => {
    const currentPhoneCheckNumber = e.target.value;
    setPhoneCheckNumber(currentPhoneCheckNumber);
  }
  // 주소 입력
  const handle = {
    // 버튼 클릭 이벤트
    clickButton: () => {
      setOpenPostcode(current => !current);
    },

    // 주소 선택 이벤트
    selectAddress: (data) => {
      console.log(`
      주소: ${data.address},
      우편번호: ${data.zonecode}
      `)
      setAddress(data.address);
      setAddressNumber(data.zonecode);
      setOpenPostcode(false);
    },
  }

  // 상세주소 변경
  const onChangeDetailAddress = (e) => {
    const currentDetailAddress = e.target.value;
    setDetailAdress(currentDetailAddress);
    if (detailAddress && address && addressNumber) {
      setFinalAddress(`${address} ${addressNumber}`);
      setIsFinalAddress(true);
      console.log(finalAddress);
    } else {
      setIsFinalAddress(false);
    }
  }
  useEffect(() => {
    if (detailAddress && address && addressNumber) {
      setFinalAddress(`${address} ${addressNumber}`);
      setIsFinalAddress(true);
      console.log(finalAddress);
    } else {
      setIsFinalAddress(false);
    }
    // eslint-disable-next-line
  }, [detailAddress])
  // 휴대폰 번호 자동 하이폰 생성
  const autoHypenPhone = (e) => {
    const value = phoneRef.current.value.replace(/\D+/g, "");
    const phoneLength = 11;

    let result;
    result = "";

    for (let i = 0; i < value.length && i < phoneLength; i++) {
      switch (i) {
        case 3:
          result += "-";
          break;
        case 7:
          result += "-";
          break;
        default:
          break;
      }

      result += value[i];
    }

    setPhone(value);
    phoneRef.current.value = result;
  };

  const phoneRef = useRef();
  // 전화번호 입력 칸
  const phoneIsValid = () => {
    return (
      <input
        type="tel"
        name="user-phone"
        ref={phoneRef}
        placeholder=""
        onChange={autoHypenPhone}
        className={style.forminput}
      />

    );
  };

  const phoneCheck = () => {
    const phoneNumber = {
      phoneNumber: phone,
    }
    authAxios.post("/users/phone/send", phoneNumber)
      .then((response) => {
        setCheckPhone(true);
        setPhonemessage("5분 안에 입력해주세요.")
      })
      .catch((response) => {
        setCheckPhone(true);
        setPhonemessage("제대로 된 번호를 입력해주세요.")
      })
  }

  const phoneCheckNumberConfirm = () => {
    const confirmData = {
      phoneNumber: phone,
      code: phoneCheckNumber
    }
    authAxios.post("/users/phone/check", confirmData)
      .then(() => {
        setCheckPhoneNumber(true);
      })
      .catch(() => {
        setCheckPhoneNumber(false);
      })
  }
  useEffect(() => {
    if (isId && isPassword && isPasswordConfirm && isFinalAddress) {
      setPass(true);
      props.sendDataToPage(pass);
      const userInfo = {
        login_Id: id,
        login_Password: password,
        phone: phone,
        name: name,
        address: finalAddress,
        addressDetail: detailAddress,
      }
      dispatch(authActions.updateUserInfo(userInfo));
    } else {
      setPass(false);
      props.sendDataToPage(pass);
    }

    // eslint-disable-next-line
  }, [isId, isPassword, isPasswordConfirm, isFinalAddress, props, pass])






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


  const keyboardOne = (e, index) => {
    if (check === "Pw") {
      if (shift) {
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
      } else if (!shift) {
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
    } else if (check === "PwC") {
      if (shift) {
        if (e === "words/62.png") {
          setPasswordConfirm(passwordConfirm + "!")
        } else if (e === "words/63.png") {
          setPasswordConfirm(passwordConfirm + "@")
        } else if (e === "words/64.png") {
          setPasswordConfirm(passwordConfirm + "#")
        } else if (e === "words/65.png") {
          setPasswordConfirm(passwordConfirm + "$")
        } else if (e === "words/66.png") {
          setPasswordConfirm(passwordConfirm + "%")
        } else if (e === "words/67.png") {
          setPasswordConfirm(passwordConfirm + "^")
        } else if (e === "words/68.png") {
          setPasswordConfirm(passwordConfirm + "&")
        } else if (e === "words/69.png") {
          setPasswordConfirm(passwordConfirm + "*")
        } else if (e === "words/70.png") {
          setPasswordConfirm(passwordConfirm + "(")
        } else if (e === "words/71.png") {
          setPasswordConfirm(passwordConfirm + ")")
        }
      } else if (!shift) {
        if (e === "words/52.png") {
          setPasswordConfirm(passwordConfirm + 1)
        } else if (e === "words/53.png") {
          setPasswordConfirm(passwordConfirm + 2)
        } else if (e === "words/54.png") {
          setPasswordConfirm(passwordConfirm + 3)
        } else if (e === "words/55.png") {
          setPasswordConfirm(passwordConfirm + 4)
        } else if (e === "words/56.png") {
          setPasswordConfirm(passwordConfirm + 5)
        } else if (e === "words/57.png") {
          setPasswordConfirm(passwordConfirm + 6)
        } else if (e === "words/58.png") {
          setPasswordConfirm(passwordConfirm + 7)
        } else if (e === "words/59.png") {
          setPasswordConfirm(passwordConfirm + 8)
        } else if (e === "words/60.png") {
          setPasswordConfirm(passwordConfirm + 9)
        } else if (e === "words/61.png") {
          setPasswordConfirm(passwordConfirm + 0)
        }
      }
    }
  }
  const keyboardTwo = (e, index) => {
    if (check === "Pw") {
      if (shift) {
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
      } else if (!shift) {
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
    } else if (check === "PwC") {
      if (shift) {
        if (e === "words/1.png") {
          setPasswordConfirm(passwordConfirm + "Q")
        } else if (e === "words/2.png") {
          setPasswordConfirm(passwordConfirm + "W")
        } else if (e === "words/3.png") {
          setPasswordConfirm(passwordConfirm + "E")
        } else if (e === "words/4.png") {
          setPasswordConfirm(passwordConfirm + "R")
        } else if (e === "words/5.png") {
          setPasswordConfirm(passwordConfirm + "T")
        } else if (e === "words/6.png") {
          setPasswordConfirm(passwordConfirm + "Y")
        } else if (e === "words/7.png") {
          setPasswordConfirm(passwordConfirm + "U")
        } else if (e === "words/8.png") {
          setPasswordConfirm(passwordConfirm + "I")
        } else if (e === "words/9.png") {
          setPasswordConfirm(passwordConfirm + "O")
        } else if (e === "words/10.png") {
          setPasswordConfirm(passwordConfirm + "P")
        }
      } else if (!shift) {
        if (e === "words/26.png") {
          setPasswordConfirm(passwordConfirm + "q")
        } else if (e === "words/27.png") {
          setPasswordConfirm(passwordConfirm + "w")
        } else if (e === "words/28.png") {
          setPasswordConfirm(passwordConfirm + "e")
        } else if (e === "words/29.png") {
          setPasswordConfirm(passwordConfirm + "r")
        } else if (e === "words/30.png") {
          setPasswordConfirm(passwordConfirm + "t")
        } else if (e === "words/31.png") {
          setPasswordConfirm(passwordConfirm + "y")
        } else if (e === "words/32.png") {
          setPasswordConfirm(passwordConfirm + "u")
        } else if (e === "words/33.png") {
          setPasswordConfirm(passwordConfirm + "i")
        } else if (e === "words/34.png") {
          setPasswordConfirm(passwordConfirm + "o")
        } else if (e === "words/35.png") {
          setPasswordConfirm(passwordConfirm + "p")
        }
      }
    }
  }
  const keyboardThree = (e, index) => {
    if (check === "Pw") {
      if (shift) {
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
      } else if (!shift) {
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
    } else if (check === "PwC") {
      if (shift) {
        if (e === "words/11.png") {
          setPasswordConfirm(passwordConfirm + "A")
        } else if (e === "words/12.png") {
          setPasswordConfirm(passwordConfirm + "S")
        } else if (e === "words/13.png") {
          setPasswordConfirm(passwordConfirm + "D")
        } else if (e === "words/14.png") {
          setPasswordConfirm(passwordConfirm + "F")
        } else if (e === "words/15.png") {
          setPasswordConfirm(passwordConfirm + "G")
        } else if (e === "words/16.png") {
          setPasswordConfirm(passwordConfirm + "H")
        } else if (e === "words/17.png") {
          setPasswordConfirm(passwordConfirm + "J")
        } else if (e === "words/18.png") {
          setPasswordConfirm(passwordConfirm + "K")
        } else if (e === "words/19.png") {
          setPasswordConfirm(passwordConfirm + "L")
        }
      } else if (!shift) {
        if (e === "words/36.png") {
          setPasswordConfirm(passwordConfirm + "a")
        } else if (e === "words/37.png") {
          setPasswordConfirm(passwordConfirm + "s")
        } else if (e === "words/38.png") {
          setPasswordConfirm(passwordConfirm + "d")
        } else if (e === "words/39.png") {
          setPasswordConfirm(passwordConfirm + "f")
        } else if (e === "words/40.png") {
          setPasswordConfirm(passwordConfirm + "g")
        } else if (e === "words/41.png") {
          setPasswordConfirm(passwordConfirm + "h")
        } else if (e === "words/42.png") {
          setPasswordConfirm(passwordConfirm + "j")
        } else if (e === "words/43.png") {
          setPasswordConfirm(passwordConfirm + "k")
        } else if (e === "words/44.png") {
          setPasswordConfirm(passwordConfirm + "l")
        }
      }
    }
  }
  const keyboardFour = (e, index) => {
    if (check === "Pw") {
      if (shift) {
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
      } else if (!shift) {
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
    } else if (check === "PwC") {
      if (shift) {
        if (e === "words/99.png") {
          setShift(!shift);
        } else if (e === "words/20.png") {
          setPasswordConfirm(passwordConfirm + "Z")
        } else if (e === "words/21.png") {
          setPasswordConfirm(passwordConfirm + "X")
        } else if (e === "words/22.png") {
          setPasswordConfirm(passwordConfirm + "C")
        } else if (e === "words/100.png") {
          setPasswordConfirm(passwordConfirm + "V")
        } else if (e === "words/23.png") {
          setPasswordConfirm(passwordConfirm + "B")
        } else if (e === "words/24.png") {
          setPasswordConfirm(passwordConfirm + "N")
        } else if (e === "words/25.png") {
          setPasswordConfirm(passwordConfirm + "M")
        } else if (e === "words/91.png") {
          if (setPasswordConfirm.length > 0) {
            setPasswordConfirm(passwordConfirm.slice(0, -1));
          }
        }
      } else if (!shift) {
        if (e === "words/90.png") {
          setShift(!shift);
        } else if (e === "words/45.png") {
          setPasswordConfirm(passwordConfirm + "z")
        } else if (e === "words/46.png") {
          setPasswordConfirm(passwordConfirm + "x")
        } else if (e === "words/47.png") {
          setPasswordConfirm(passwordConfirm + "c")
        } else if (e === "words/48.png") {
          setPasswordConfirm(passwordConfirm + "v")
        } else if (e === "words/49.png") {
          setPasswordConfirm(passwordConfirm + "b")
        } else if (e === "words/50.png") {
          setPasswordConfirm(passwordConfirm + "n")
        } else if (e === "words/51.png") {
          setPasswordConfirm(passwordConfirm + "m")
        } else if (e === "words/91.png") {
          if (setPasswordConfirm.length > 0) {
            setPasswordConfirm(passwordConfirm.slice(0, -1));
          }
        }
      }
    }
  }
  const keyboardFive = (e, index) => {

    if (check === "Pw") {
      if (shift) {
        if (e === "words/92.png") {
          updateLists();
        } else if (e === "words/94.png") {
          setPassword("");
        } else if (e === "words/95.png") {
          setPassword(password + " ")
        } else if (e === "words/96.png") {
          setModalCheck(false);
        }
      } else if (!shift) {
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
    } else if (check === "PwC") {
      if (shift) {
        if (e === "words/92.png") {
          updateLists();
        } else if (e === "words/94.png") {
          setPasswordConfirm("");
        } else if (e === "words/95.png") {
          setPasswordConfirm(passwordConfirm + " ")
        } else if (e === "words/96.png") {
          setModalCheck(false);
        }
      } else if (!shift) {
        if (e === "words/92.png") {
          updateLists();
        } else if (e === "words/94.png") {
          setPasswordConfirm("");
        } else if (e === "words/95.png") {
          setPasswordConfirm(passwordConfirm + " ")
        } else if (e === "words/96.png") {
          setModalCheck(false);
        }
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

  const handleContextMenu = () => {
    return false
  };
  return (
    <div className={style.form}>
      <div className={style.idform}>
        <span>아이디</span>

        <br />
        <input type="text" className={style.forminput} name="ID" value={id} onChange={onChangeId} />
        <input type="button" value="중복확인" className={style.formbtn} onClick={onChangeIdOverlap} />
        {isId
          ?
          <span className={style.colorblue}>{idMessage}</span>
          :
          <span className={style.colorred}>{idMessage}</span>
        }
      </div>
      <>
        <span>이름</span>
        <input type="text" className={style.input} value={name} onChange={onChangeName} />
      </>
      <>
        <span>비밀번호</span>
        <input type="password" className={style.input} name="password" value={password} onClick={() => onClickPassword("Pw")} readOnly />
        {isPassword
          ?
          <span className={style.colorblue}>{passwordMessage}</span>
          :
          <span className={style.colorred}>{passwordMessage}</span>
        }
      </>
      <>
        <span>비밀번호 확인</span>
        <input type="password" className={style.input} name="passwordcheck" value={passwordConfirm} onClick={() => onClickPassword("PwC")} readOnly />
        {isPasswordConfirm
          ?
          <span className={style.colorblue}>{passwordConfirmMessage}</span>
          :
          <span className={style.colorred}>{passwordConfirmMessage}</span>
        }
      </>
      <div className={style.phoneform}>
        <span>휴대폰 번호</span>
        <br />
        {phoneIsValid()}
        <input type="button" value="인증번호 발송" className={style.formbtn} onClick={phoneCheck} />
      </div>
      {
        checkPhone
          ?
          <div className={style.phonecheckform}>
            <h4>{phoneMessage}</h4>
            {phoneMessage === "5분 안에 입력해주세요."
              ?
              <div className={style.phoneforms}>
                <input type="number" value={phoneCheckNumber} onChange={onCHnagePhoneCheckNumber} className={style.input} />
                <input type="button" value="인증번호 확인" onClick={phoneCheckNumberConfirm} className={style.formbtn} />
              </div>
              :
              null
            }
            {
              checkPhoneNumber
                ?
                <div>
                  인증되었습니다.
                </div>
                :
                null
            }
          </div>
          :
          null
      }
      <div className={style.adresstop}>
        <span>주소</span>
        <div className={style.idform}>
          <input type="text" value={address} className={style.input} readOnly />
          <button onClick={handle.clickButton} className={style.formbtn}>주소 찾기</button>
        </div>
        {openPostcode &&
          <Modal
            isOpen={openPostcode}
            onRequestClose={() => setOpenPostcode(false)}
            className={style.modal}
          >
            <DaumPostcode
              onComplete={handle.selectAddress}  // 값을 선택할 경우 실행되는 이벤트
              autoClose={false} // 값을 선택할 경우 사용되는 DOM을 제거하여 자동 닫힘 설정
              defaultQuery='' // 팝업을 열때 기본적으로 입력되는 검색어
            />
          </Modal>}
        <div className={style.address}>
          <span>우편번호</span>
          <span>상세주소</span>
          <input type="text" value={addressNumber} className={style.inputaddress} readOnly />
          <input type="text" className={style.input} value={detailAddress} onChange={onChangeDetailAddress} />
        </div>
      </div>

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
                    <img src={word} alt="" onContextMenu={handleContextMenu} style={{ "-webkit-touch-callout": "none" }} />
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
                    <img src={word} alt="" onContextMenu={handleContextMenu} style={{ "-webkit-touch-callout": "none" }} />
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
                    <img src={word} alt="" onContextMenu={handleContextMenu} style={{ "-webkit-touch-callout": "none" }} />
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
                    <img src={word} alt="" onContextMenu={handleContextMenu} style={{ "-webkit-touch-callout": "none" }} />
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
                    <img src={word} alt="" onContextMenu={handleContextMenu} style={{ "-webkit-touch-callout": "none" }} />
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
                    <img src={word} alt="" onContextMenu={handleContextMenu} style={{ "-webkit-touch-callout": "none" }} />
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
                    <img src={word} alt="" onContextMenu={handleContextMenu} style={{ "-webkit-touch-callout": "none" }} />
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
                    <img src={word} alt="" onContextMenu={handleContextMenu} style={{ "-webkit-touch-callout": "none" }} />
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
                    <img src={word} alt="" onContextMenu={handleContextMenu} style={{ "-webkit-touch-callout": "none" }} />
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
                    <img src={word} alt="" onContextMenu={handleContextMenu} style={{ "-webkit-touch-callout": "none" }} />
                  </button>
                ))}
              </div>
            </div>
          }
        </Modal >
      }
    </div>
  );
}

export default SignupForm;
