import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const CtaFinal = () => {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
    <section
      id="cta"
      className="relative text-black py-12 px-6 md:px-12 text-center overflow-hidden"
    >
      {/* === HALO DÉCORATIF === */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-accent/20 blur-3xl rounded-full animate-pulse -z-10"></div>
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-white/10 blur-3xl rounded-full animate-pulse -z-10"></div>

      {/* === CONTENU PRINCIPAL === */}
      <div data-aos="fade-up" className="max-w-3xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-[Poppins] font-bold mb-6 leading-snug">
          Rejoignez la communauté <span className="text-accent">EducWeb</span> dès aujourd’hui !
        </h2>

        <p className="text-lg font-[DM Sans] text-gray-700 mb-10">
          Créez un compte gratuitement et commencez à apprendre ou enseigner en toute simplicité.
        </p>

        <a
          href="/auth"
          className="inline-block bg-accent text-white font-[Poppins] font-medium px-10 py-4 rounded-lg hover:bg-white hover:text-primary transition duration-300"
        >
          Créer mon compte
        </a>
      </div>
    </section>
  );
};

export default CtaFinal;
