import React, { useState } from "react";
import { updateDoc, doc } from "firebase/firestore";
import { auth, db } from "../services/firebase";
import { useNavigate } from "react-router-dom";
import { UserCircle, GraduationCap, Users } from "lucide-react";
import toast from "react-hot-toast";
import AOS from "aos";

AOS.init();

const roles = [
  {
    id: "enseignant",
    title: "Enseignant",
    icon: <UserCircle className="w-12 h-12 text-accent" />,
    desc: "Publiez vos cours, recevez des demandes, et accompagnez vos apprenants.",
  },
  {
    id: "apprenant",
    title: "Apprenant",
    icon: <GraduationCap className="w-12 h-12 text-accent" />,
    desc: "Trouvez un enseignant, accédez aux ressources, et progressez rapidement.",
  },
  {
    id: "acteur",
    title: "Parent / Acteur",
    icon: <Users className="w-12 h-12 text-accent" />,
    desc: "Suivez l’évolution d’un apprenant et contactez les enseignants.",
  },
];

export default function ChooseRole() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleChoose = async (role) => {
    const user = auth.currentUser;
    if (!user) return toast.error("Vous devez être connecté.");

    setLoading(true);

    try {
      await updateDoc(doc(db, "users", user.uid), { role });

      toast.success("Rôle défini avec succès !");
      navigate("/dashboard");
    } catch (error) {
      console.log(error);
      toast.error("Impossible de mettre à jour le rôle.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen bg-[#F5F7F8] flex justify-center items-center px-6 py-16">
      <div className="max-w-4xl w-full">
        <h1 className="text-3xl font-bold text-primary text-center mb-10 font-[Poppins]">
          Choisissez votre rôle
        </h1>

        <div className="grid md:grid-cols-3 gap-8">
          {roles.map((role) => (
            <div
              key={role.id}
              data-aos="fade-up"
              className="bg-white rounded-xl p-8 shadow-md text-center cursor-pointer border border-transparent hover:border-accent transition"
              onClick={() => handleChoose(role.id)}
            >
              <div className="flex justify-center mb-4">{role.icon}</div>
              <h2 className="text-xl font-bold text-primary mb-2">
                {role.title}
              </h2>
              <p className="text-textDark text-sm mb-4">{role.desc}</p>

              <button
                disabled={loading}
                className="bg-accent text-white px-5 py-2 rounded-lg hover-bg-primary transition disabled:opacity-50 cursor-pointer"
              >
                {loading ? "Chargement..." : "Choisir"}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
