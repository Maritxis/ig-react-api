import React from 'react';

const Header = ({ handleGoHome, handleNextStep, handleSharePost, step }) => {
  return (
    <header>
      {step === 1 && <button onClick={handleGoHome}><img src="/img/nodegirls.svg" className="icon logo" alt="Home" /></button>}
      {(step === 2 || step === 3) && <button onClick={handleGoHome}><img src="/img/nodegirls.svg" className="icon logo" alt="Home" /></button>}
      {(step === 1 || step === 2) && <button onClick={handleNextStep}><img src="/img/right-arrow.svg" className="icon" alt="Siguiente" /></button>}
      {step === 3 && <button onClick={handleSharePost}><img src="/img/share.svg" className="icon" alt="Enviar" /></button>}
    </header>
  );
};

export default Header;