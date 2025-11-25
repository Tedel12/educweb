import React from "react";
import Hero from "../components/Hero";
import Avantages from "../components/Avantages";
import Fonctionnalites from "../components/Fonctionnalités";
import Temoignages from "../components/Temoignages";
import CtaFinal from "../components/CtaFinal";

const Home = () => {
  return (
    <div className="bg-background">
      <Hero />
      <Avantages />
      <Fonctionnalites />
      <Temoignages />
      <CtaFinal />
    </div>
  );
};

export default Home;
