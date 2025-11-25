import React from "react";
import { Facebook, Instagram, Linkedin, Mail } from "lucide-react";
import logo from "../assets/logo.png";

const Footer = () => {
  return (
    <footer className="bg-[#0A2647] text-white pt-16 pb-8 px-6 md:px-12">
      {/* === CONTENEUR PRINCIPAL === */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-16">
        {/* === LOGO ET DESCRIPTION === */}
        <div className="space-y-4 text-center md:text-left">
          <img
            src={logo}
            alt="EducWeb logo"
            className="h-10 w-auto mx-auto md:mx-0 object-contain"
          />
          <p className="text-gray-300 font-[DM Sans] text-sm leading-relaxed">
            EducWeb relie enseignants, apprenants et parents pour un apprentissage
            plus simple, plus rapide et plus proche.
          </p>
        </div>

        {/* === LIENS RAPIDES === */}
        <div className="text-center md:text-left">
          <h3 className="font-[Poppins] font-semibold text-lg mb-4 text-accent">
            Liens rapides
          </h3>
          <ul className="space-y-2 text-gray-300 font-[DM Sans]">
            <li>
              <a href="#" className="hover:text-accent transition">
                Accueil
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-accent transition">
                À propos
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-accent transition">
                Ressources
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-accent transition">
                Contact
              </a>
            </li>
          </ul>
        </div>

        {/* === RÉSEAUX SOCIAUX === */}
        <div className="text-center md:text-left">
          <h3 className="font-[Poppins] font-semibold text-lg mb-4 text-accent">
            Suivez-nous
          </h3>
          <div className="flex justify-center md:justify-start gap-4">
            <a
              href="#"
              className="p-2 rounded-full bg-white/10 hover:bg-accent transition"
            >
              <Facebook size={20} />
            </a>
            <a
              href="#"
              className="p-2 rounded-full bg-white/10 hover:bg-accent transition"
            >
              <Instagram size={20} />
            </a>
            <a
              href="#"
              className="p-2 rounded-full bg-white/10 hover:bg-accent transition"
            >
              <Linkedin size={20} />
            </a>
            <a
              href="mailto:contact@educweb.com"
              className="p-2 rounded-full bg-white/10 hover:bg-accent transition"
            >
              <Mail size={20} />
            </a>
          </div>
        </div>
      </div>

      {/* === LIGNE DE SÉPARATION === */}
      <div className="border-t border-white/10 my-8"></div>

      {/* === COPYRIGHT === */}
      <div className="text-center text-gray-400 text-sm font-[DM Sans]">
        © {new Date().getFullYear()} <span className="text-accent">EducWeb</span>. Tous droits réservés.
      </div>
    </footer>
  );
};

export default Footer;
