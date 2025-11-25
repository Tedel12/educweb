import React from "react";
import heroImg from "../assets/hero-img.png"; // ton image flottante
import { PlayCircle } from "lucide-react";

const Hero = () => {
  return (
    <section
      id="hero"
      className="relative pt-26 md:pt-44 min-h-[40vh] flex flex-col md:flex-row items-center justify-between px-6 md:px-12 overflow-hidden"
    >
      {/* === Texte gauche === */}
      <div className="md:w-1/2 flex flex-col justify-center space-y-6 relative z-10">
        <h1 className="text-4xl md:text-5xl font-[Poppins] font-bold text-primary leading-tight">
          Trouvez le bon enseignant, <br />
          <span className="text-green-900 font-[SpaceGrotesk]">partout, à tout moment.</span>
        </h1>

        <p className="text-lg font-[DM Sans] text-textDark max-w-md">
          EducWeb relie enseignants, apprenants et parents pour un apprentissage
          plus simple, plus rapide et plus proche.
        </p>

        {/* === Boutons CTA === */}
        <div className="flex flex-col sm:flex-row gap-4">
          <a
            href="/auth"
            className="bg-accent text-white font-[Poppins] font-medium px-6 py-3 rounded-lg hover-bg-primary transition text-center"
          >
            Commencer maintenant
          </a>

          <a
            href="#about"
            className="flex items-center justify-center gap-4 text-primary font-[Poppins] font-medium hover:text-accent transition"
          >
            
            <span className="ml-4 flex items-center gap-2 hover-text-accent font-bold">
                <PlayCircle className="text-accent w-6 h-6" />
                Regarder la démo
            </span>
          </a>
        </div>
      </div>

      {/* === Image droite === */}
      <div className="md:w-1/2 mt-10 md:mt-0 flex justify-center relative z-10">
        <img
          src={heroImg}
          alt="Illustration éducation"
          className="w-[90%] md:w-[80%] max-w-lg animate-float drop-shadow-lg"
        />
      </div>

      {/* === Arrière-plan bleu clair uniforme === */}
      <div className="absolute inset-0 bg-[#537faa] -z-10"></div>
    </section>
  );
};

export default Hero;
