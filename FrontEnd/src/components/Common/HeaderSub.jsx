import React from 'react';
import { useNavigate } from 'react-router-dom';
// import BackBtn from '../../../images/BackBtn.png';

const HeaderSub = ( props ) => {
  const navigate = useNavigate();

  let title = props.title;
  
  const headerStyle = {
    marginTop: '10px',
    display: 'grid',
    gridTemplateColumns: '1fr 3fr 1fr',
    alignItems: 'center',
    width: '100%',
  };

  const imgStyle = {
    marginLeft: '20px',
  };

  const titleStyle = {
    textAlign: 'center',
    width: '100%',
    fontSize: '22px',
    fontWeight: 'bold',
  };

  return (
    <div style={headerStyle}>
        <img src='/images/BackBtn.png' alt="" style={imgStyle} onClick={() => { navigate(-1) }}/>
        <p className="title" style={titleStyle}>{title}</p>
    </div>
  );
};

export default HeaderSub;
