import React from "react";
import { Users, GraduationCap, BarChart3 } from "lucide-react"; // ✅ Icônes modernes

const Avantages = () => {
  return (
    <section
      id="avantages"
      className="bg-[#F5F7F8] py-20 px-6 md:px-12 text-center"
    >
      {/* === TITRE PRINCIPAL === */}
      <div className="max-w-3xl mx-auto mb-16">
        <h2 className="text-3xl md:text-4xl font-[Poppins] font-bold text-primary mb-4">
          Pourquoi choisir <span className="text-accent">EducWeb ?</span>
        </h2>
        <p className="text-textDark font-[DM Sans] text-lg">
          Une plateforme pensée pour tous les acteurs de l’éducation.
        </p>
      </div>

      {/* === CARTES D'AVANTAGES === */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {/* --- Carte 1 : Enseignants --- */}
        <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-transform duration-300 hover:scale-105 p-8">
          <div className="flex justify-center mb-6">
            <Users size={60} className="text-accent" />
          </div>
          <h3 className="text-xl font-[Poppins] font-semibold text-primary mb-3">
            Gagnez en visibilité
          </h3>
          <p className="text-textDark font-[DM Sans] text-[15px]">
            Les enseignants peuvent présenter leurs compétences et être trouvés
            facilement par les apprenants proches d’eux.
          </p>
        </div>

        {/* --- Carte 2 : Apprenants --- */}
        <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-transform duration-300 hover:scale-105 p-8">
          <div className="flex justify-center mb-6">
            <GraduationCap size={60} className="text-accent" />
          </div>
          <h3 className="text-xl font-[Poppins] font-semibold text-primary mb-3">
            Trouvez votre répétiteur idéal
          </h3>
          <p className="text-textDark font-[DM Sans] text-[15px]">
            Accédez à une large base d’enseignants qualifiés selon votre niveau,
            matière et disponibilité.
          </p>
        </div>

        {/* --- Carte 3 : Parents --- */}
        <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-transform duration-300 hover:scale-105 p-8">
          <div className="flex justify-center mb-6">
            <BarChart3 size={60} className="text-accent" />
          </div>
          <h3 className="text-xl font-[Poppins] font-semibold text-primary mb-3">
            Suivez les progrès de vos enfants
          </h3>
          <p className="text-textDark font-[DM Sans] text-[15px]">
            Les parents peuvent consulter les performances, les cours suivis et
            les progrès réalisés par leurs enfants.
          </p>
        </div>
      </div>

      {/* === CTA FINAL === */}
      <div className="mt-10">
        <p className="text-lg font-[DM Sans] text-textDark mb-6">
          Rejoignez dès maintenant la communauté <b>EducWeb</b> !
        </p>
        <a
          href="/auth"
          className="bg-accent text-white font-[Poppins] font-medium px-8 py-3 rounded-lg hover:bg-primary transition"
        >
          Créer mon compte
        </a>
      </div>
    </section>
  );
};

export default Avantages;
