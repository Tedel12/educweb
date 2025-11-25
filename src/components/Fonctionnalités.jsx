import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { Search, MessageSquare, UserCheck } from "lucide-react";

import searchImg from "../assets/features/search.svg";
import chatImg from "../assets/features/chat.svg";
import profileImg from "../assets/features/profile.svg";

const Fonctionnalites = () => {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
    <section
      id="fonctionnalites"
      className="bg-white py-20 px-6 md:px-12 text-center md:text-left"
    >
      {/* === TITRE PRINCIPAL === */}
      <div data-aos="fade-up" className="max-w-3xl mx-auto mb-16 text-center">
        <h2 className="text-3xl md:text-4xl font-[Poppins] font-bold text-primary mb-4">
          Les fonctionnalités qui font la{" "}
          <span className="text-accent">différence</span>
        </h2>
        <p className="text-textDark font-[DM Sans] text-lg">
          Une plateforme simple, complète et pensée pour vous.
        </p>
      </div>

      {/* === BLOCS DE FONCTIONNALITÉS === */}
      <div className="max-w-6xl mx-auto flex flex-col gap-20">
        {/* --- 1️⃣ Recherche intelligente --- */}
        <div
          className="flex flex-col md:flex-row items-center gap-12"
          data-aos="fade-right"
        >
          <div className="flex-1 space-y-4">
            <div className="flex items-center gap-3">
              <Search size={40} className="text-accent" />
              <h3 className="text-2xl font-[Poppins] font-semibold text-primary">
                Recherche intelligente
              </h3>
            </div>
            <p className="text-textDark font-[DM Sans] text-[16px] leading-relaxed">
              Trouvez facilement le bon enseignant grâce à un moteur de recherche
              intelligent qui filtre par matière, niveau, localisation et
              disponibilité.
            </p>
          </div>
          <div className="flex-1 flex justify-center">
            <img
              src={searchImg}
              alt="Recherche intelligente"
              className="w-[80%] max-w-md drop-shadow-lg"
            />
          </div>
        </div>

        {/* --- 2️⃣ Chat et notifications --- */}
        <div
          className="flex flex-col-reverse md:flex-row items-center gap-12"
          data-aos="fade-left"
        >
          <div className="flex-1 flex justify-center">
            <img
              src={chatImg}
              alt="Chat intégré"
              className="w-[80%] max-w-md drop-shadow-lg"
            />
          </div>
          <div className="flex-1 space-y-4">
            <div className="flex items-center gap-3">
              <MessageSquare size={40} className="text-accent" />
              <h3 className="text-2xl font-[Poppins] font-semibold text-primary">
                Chat & notifications
              </h3>
            </div>
            <p className="text-textDark font-[DM Sans] text-[16px] leading-relaxed">
              Restez connecté en temps réel grâce au chat intégré et aux
              notifications instantanées pour chaque mise à jour importante.
            </p>
          </div>
        </div>

        {/* --- 3️⃣ Profils sécurisés --- */}
        <div
          className="flex flex-col md:flex-row items-center gap-12"
          data-aos="fade-right"
        >
          <div className="flex-1 space-y-4">
            <div className="flex items-center gap-3">
              <UserCheck size={40} className="text-accent" />
              <h3 className="text-2xl font-[Poppins] font-semibold text-primary">
                Profils complets & sécurisés
              </h3>
            </div>
            <p className="text-textDark font-[DM Sans] text-[16px] leading-relaxed">
              Chaque utilisateur dispose d’un profil complet, avec ses
              informations, compétences et progression sauvegardées de manière
              sécurisée dans le cloud.
            </p>
          </div>
          <div className="flex-1 flex justify-center">
            <img
              src={profileImg}
              alt="Profils sécurisés"
              className="w-[80%] max-w-md drop-shadow-lg"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Fonctionnalites;
