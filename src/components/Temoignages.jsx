import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import { Star } from "lucide-react";

import aichaImg from "../assets/testimonials/aicha.jpg";
import koffiImg from "../assets/testimonials/koffi.jpg";
import inesImg from "../assets/testimonials/ines.jpg";

const Temoignages = () => {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  const testimonials = [
    {
      img: aichaImg,
      name: "Armel",
      role: "Enseignant de Mathématiques",
      text: "Grâce à EducWeb, j’ai trouvé des élèves motivés sans passer par des intermédiaires. Une vraie révolution pour les profs indépendants.",
    },
    {
      img: koffiImg,
      name: "Koffi",
      role: "Parent d’élève",
      text: "Je peux suivre les progrès de ma fille en temps réel et échanger directement avec son répétiteur. Très pratique et rassurant.",
    },
    {
      img: inesImg,
      name: "Inès",
      role: "Étudiante en Physique",
      text: "J’ai découvert des enseignants passionnés et disponibles. Les cours sont clairs et adaptés à mon niveau.",
    },
  ];

  return (
    <section
      id="temoignages"
      className="relative bg-[#F5F7F8] py-20 px-6 md:px-12 text-center overflow-hidden"
    >
      {/* === FOND DÉCORATIF BLEU CLAIR === */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#E8F0FE]/70 to-transparent -z-10"></div>

      {/* === TITRE === */}
      <div data-aos="fade-up" className="max-w-3xl mx-auto mb-16">
        <h2 className="text-3xl md:text-4xl font-[Poppins] font-bold text-primary mb-4">
          Ce que disent nos <span className="text-accent">utilisateurs</span>
        </h2>
        <p className="text-textDark font-[DM Sans] text-lg">
          Des enseignants, apprenants et parents conquis par l’expérience EducWeb.
        </p>
      </div>

      {/* === SLIDER === */}
      <Swiper
        slidesPerView={1}
        spaceBetween={30}
        loop={true}
        autoplay={{ delay: 4000 }}
        pagination={{ clickable: true }}
        breakpoints={{
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
        modules={[Pagination, Autoplay]}
        className="max-w-6xl mx-auto"
      >
        {testimonials.map((t, i) => (
          <SwiperSlide key={i}>
            <div
              data-aos="fade-up"
              className="bg-white rounded-2xl shadow-md hover:shadow-xl hover:scale-105 transition-transform duration-500 p-8 mx-2 flex flex-col items-center text-center"
            >
              {/* Photo */}
              <img
                src={t.img}
                alt={t.name}
                className="w-24 h-24 rounded-full object-cover mb-4 border-4 border-accent"
              />
              {/* Nom & rôle */}
              <h3 className="text-lg font-[Poppins] font-semibold text-primary">
                {t.name}
              </h3>
              <p className="text-sm text-textDark mb-4 font-[DM Sans]">
                {t.role}
              </p>

              {/* Avis */}
              <p className="text-[15px] text-textDark font-[DM Sans] italic mb-4">
                “{t.text}”
              </p>

              {/* Étoiles */}
              <div className="flex justify-center gap-1 text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={18} fill="#FACC15" stroke="#FACC15" />
                ))}
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* === BULLES FLOTTANTES (décoratives) === */}
      <div className="absolute top-10 left-10 w-20 h-20 bg-accent/20 rounded-full blur-2xl animate-pulse -z-10"></div>
      <div className="absolute bottom-10 right-20 w-32 h-32 bg-primary/10 rounded-full blur-3xl animate-pulse -z-10"></div>
    </section>
  );
};

export default Temoignages;
