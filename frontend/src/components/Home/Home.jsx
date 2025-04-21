import React, { useContext } from 'react';
import { Context } from '../../main';
import { Navigate } from 'react-router-dom';
import HeroSection from "./HeroSection";
import HowItWorks from "./HowItWorks";

const Home = () => {
  const { isAuthenticated } = useContext(Context);
  if(!isAuthenticated){
    return <Navigate to={"/login"}/>
  }
  return (
    <>
      <section className="homePage page">
        <HeroSection />
        <HowItWorks />
      </section>
    </>
  );
};

export default Home