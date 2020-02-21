import React, { useState } from 'react';
import Header from '../../components/header/Header';
import Footer from '../../components/footer/Footer';
import Container from '../../components/container/Container';

const Home = () => {
  const handleGoHome = () => {
    setStep(1);
  };
  const handleNextStep = () => {
    setStep(step + 1);
  };
  const handleSharePost = () => ({});
  const [step, setStep] = useState(1);
  return (
    <>
      <Header
        handleGoHome={handleGoHome}
        handleNextStep={handleNextStep}
        handleSharePost={handleSharePost}
        step={step}>
      </Header>
      <Container
        step={step}
      ></Container>
      <Footer></Footer>
    </>
  );
};

export default Home;