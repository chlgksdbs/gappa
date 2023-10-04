import React from 'react';
import { useNavigate } from 'react-router-dom';
// import BackBtn from '../../../images/BackBtn.png';

const HeaderSub = ( props ) => {
  const navigate = useNavigate();

  let title = props.title;
  
  const headerStyle = {
    height: '7vh',
    width: '100%',
    display: 'grid',
    gridTemplateColumns: '1fr 3fr 1fr',
    alignItems: 'center',
    marginTop: '3%',
    marginBottom: '3%',
  };

  const imgStyle = {
    marginLeft: '15px',
    height: '40px'
  };

  const titleStyle = {
    textAlign: 'center',
    width: '100%',
    fontSize: '22px',
    fontWeight: 'bold',
    margin: '5px 0 0 0',
  };

  return (
    <div style={headerStyle}>
        <img src='/images/BackBtn.png' alt="" style={imgStyle} onClick={() => { navigate(-1) }}/>
        <p className="title" style={titleStyle}>{title}</p>
    </div>
  );
};

export default HeaderSub;
