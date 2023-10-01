import React,{useState} from 'react';
import { useNavigate } from 'react-router-dom';
import style from './branding.module.css';
const Branding = () => {
  const [checkIMG, setCheckIMG] = useState(1);

  const navigate = useNavigate();

  const moveToLogin = () => {
    navigate('/');
  }
  return (
    <div>
      <div className={style.body}>
        <div>
          <img
            src={`branding_${checkIMG}.png`}
            alt="branding"
          />
        </div>
        {checkIMG !== 3 ? (
          <div>
            <button onClick={() => setCheckIMG(checkIMG + 1)} className={style.btn}>다음으로</button>
          </div>
        ) : (
          <div>
            <button onClick={() => moveToLogin()} className={style.btn}>함께하기</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Branding;
