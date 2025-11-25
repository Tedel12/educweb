import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { ArrowLeft } from "lucide-react";
import authImg from "../assets/auth-illustration.svg"; 
import { signUp, signIn, signInWithGoogle, resetPassword } from "../services/authService";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";


const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isForgotPassword) {
        await resetPassword(email);
        toast.success("Lien de réinitialisation envoyé !");
      } else if (isLogin) {
        await signIn(email, password);
        toast.success("Connexion réussie !");
        navigate("/");
      } else {
        await signUp(email, password);
        toast.success("Compte créé avec succès !");
        navigate("/");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };


  const handleGoogle = async () => {
    try {
      await signInWithGoogle();
      toast.success("Connexion Google réussie !");
      navigate("/");
    } catch (error) {
      toast.error(error.message);
    }
  };



  return (
    <section className="min-h-screen mt-10 flex flex-col md:flex-row items-center justify-center bg-[#F5F7F8] font-[Poppins]">
      {/* === Colonne gauche === */}
      <div className="md:w-1/2 hidden md:flex flex-col items-center justify-center p-10">
        <img
          src={authImg}
          alt="Éducation illustration"
          className="w-[80%] max-w-md animate-float"
        />
        <h2 className="text-3xl font-bold text-primary mt-6">
          Bienvenue sur <span className="text-accent">EducWeb</span>
        </h2>
        <p className="text-textDark mt-2 text-center max-w-md">
          Connectez-vous ou créez un compte pour accéder à la plateforme et
          trouver les meilleurs enseignants près de chez vous.
        </p>
      </div>

      {/* === Colonne droite === */}
      <div className="md:w-1/2 w-full flex flex-col items-center justify-center p-8 md:p-16">
        <div className="bg-white shadow-lg rounded-2xl w-full max-w-md p-8 relative">
          {isForgotPassword ? (
            <>
              {/* Mot de passe oublié */}
              <button
                onClick={() => setIsForgotPassword(false)}
                className="flex items-center gap-2 text-sm text-primary hover-text-accent mb-4"
              >
                <ArrowLeft size={16} /> Retour
              </button>

              <h2 className="text-2xl font-bold text-primary mb-6">
                Réinitialiser le mot de passe
              </h2>
              <form className="space-y-5" onSubmit={handleSubmit}>
                <input
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Adresse e-mail"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus-border-accent outline-none"
                />
                <button
                  type="submit"
                  className="w-full bg-accent text-white py-3 rounded-lg hover-bg-primary transition"
                >
                  Envoyer le lien de réinitialisation
                </button>
              </form>
            </>
          ) : (
            <>
              {/* Formulaire Login / Signup */}
              <h2 className="text-3xl font-bold text-primary mb-6 text-center">
                {isLogin ? "Connexion" : "Créer un compte"}
              </h2>

              <form className="space-y-5" onSubmit={handleSubmit}>
                {!isLogin && (
                  <>
                    <input
                      type="text"
                      placeholder="Nom complet"
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 focus-border-accent outline-none"
                    />
                  </>
                )}

                <input
                  type="email"
                  name="email"
                  placeholder="Adresse e-mail"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus-border-accent outline-none"
                />
                <input
                  type="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Mot de passe"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus-border-accent outline-none"
                />

                <button
                  type="submit"
                  className="w-full bg-accent text-white py-3 rounded-lg hover-bg-primary transition cursor-pointer"
                >
                  {isLogin ? "Se connecter" : "S’inscrire"}
                </button>
              </form>

              {/* Séparateur OU */}
              <div className="flex items-center my-6">
                <div className="flex-1 h-px bg-gray-300"></div>
                <span className="px-3 text-gray-500 text-sm font-medium">ou</span>
                <div className="flex-1 h-px bg-gray-300"></div>
              </div>

              {/* Connexion Google */}
              <div className="flex justify-center">
                <button
                  type="button"
                  onClick={handleGoogle}
                  className="flex items-center justify-center gap-3 border border-gray-300 w-full py-3 rounded-lg hover:shadow-md transition bg-white cursor-pointer"
                >
                  <FcGoogle size={22} />
                  <span className="text-gray-700 font-medium">
                    {isLogin ? "Se connecter avec Google" : "S’inscrire avec Google"}
                  </span>
                </button>
              </div>


              {/* Liens secondaires */}
              <div className="mt-6 text-center text-sm text-gray-600">
                {isLogin ? (
                  <>
                    <p>
                      Pas encore de compte ?{" "}
                      <button
                        onClick={() => setIsLogin(false)}
                        className="text-primary font-medium hover-text-accent cursor-pointer"
                      >
                        S’inscrire
                      </button>
                    </p>
                    <button
                      onClick={() => setIsForgotPassword(true)}
                      className="text-accent hover:text-red-600 mt-2 cursor-pointer"
                    >
                      Mot de passe oublié ?
                    </button>
                  </>
                ) : (
                  <p>
                    Déjà inscrit ?{" "}
                    <button
                      onClick={() => setIsLogin(true)}
                      className="text-primary font-medium hover-text-accent cursor-pointer"
                    >
                      Se connecter
                    </button>
                  </p>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default Auth;
