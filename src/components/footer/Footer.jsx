import React from 'react';

const Footer = ({ handleGoHome, handleUploadImage, step }) => {
  return (
    <>
      <button onClick={handleGoHome}>Home</button>
      <input
        type="file"
        name="file"
        id="file"
        className="file"
        disabled={step!==1}
        onChange={handleUploadImage}/>
    </>
  );
};

export default Footer;