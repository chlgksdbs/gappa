import React, { useRef } from 'react';
import html2pdf from 'html2pdf.js';


const CertificatePage = () => {
  const contentRef = useRef();

  const handleGeneratePdf = () => {
    const content = contentRef.current;

    if (content) {
      html2pdf(content);
    }
  };

  return (
    <div>
      <div ref={contentRef}>
        {/* PDF로 저장할 내용 */}
        <h1>Hello, this will be saved as PDF!</h1>
        <p>Some content here...</p>
      </div>
      <button onClick={handleGeneratePdf}>Generate PDF</button>
    </div>
  );
};

export default CertificatePage;