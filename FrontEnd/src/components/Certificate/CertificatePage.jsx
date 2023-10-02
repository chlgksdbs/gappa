import React, { useRef } from 'react';
// import html2pdf from 'html2pdf.js';
import style from './Certificate.module.css';


const CertificatePage = () => {
  const contentRef = useRef();

  const handleGeneratePdf = () => {
    const content = contentRef.current;

    if (content) {
      // html2pdf(content);
    }
  };


  return (
    <div>
      <div ref={contentRef}>
        {/* PDF로 저장할 내용 */}
        <div className={style.line} />
        <h1>차 용 증</h1>
        <p>내용이 들어갈거임</p>
      </div>
      <button onClick={handleGeneratePdf}>Generate PDF</button>
    </div>
  );
};

export default CertificatePage;