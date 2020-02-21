import React from 'react';

const Header = ({ handleGoHome, handleNextStep, handleSharePost, step}) => {
  return (
    <>
      {step ===1 && <button onClick={handleGoHome}>Home</button>}
      {(step === 2 || step === 3) && <button onClick={handleGoHome}>Cancel</button>}
      {(step ===1 || step === 2) && <button onClick={handleNextStep}>Next</button>}
      {step === 3 && <button onClick={handleSharePost}>Share</button>}
    </>
  );
};

export default Header;