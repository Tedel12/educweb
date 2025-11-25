import React, { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import logo from "../assets/logo.png"; // ✅ ton logo ici
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../services/firebase";
import { UserCircle } from "lucide-react";
import toast from "react-hot-toast";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate()
  const [user, setUser] = useState(null);
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);


  const handleLogout = async () => {
    await signOut(auth);
    toast.success("Déconnecté avec succès !");
    setUser(null);
  };


  
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);



  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "shadow-md backdrop-blur-sm"
          : "bg-transparent backdrop-blur-0"
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3 md:py-4">
        {/* LOGO IMAGE */}
        <div className="flex items-center space-x-2 cursor-pointer">
          <img
            src={logo}
            alt="EducWeb logo"
            className="h-10 w-auto md:h-12 object-contain"
            onClick={()=>navigate('/')}
          />
        </div>

        {/* MENU DESKTOP */}
        <nav className="hidden md:flex items-center gap-8 font-[Poppins] text-[15px]">
          <a href="/" className="text-primary hover-text-accent transition">
            Accueil
          </a>
          <a href="#" className="text-primary hover-text-accent transition">
            Enseignants
          </a>
          <a href="#" className="text-primary hover-text-accent transition">
            Apprenants
          </a>
          <a href="#" className="text-primary hover-text-accent transition">
            Ressources
          </a>
          <a href="#" className="text-primary hover-text-accent transition">
            À propos
          </a>
          {user ? (
            <div className="relative">
              <button onClick={() => setShowMenu(!showMenu)}>
                {user.photoURL ? (
                  <img
                    src={user.photoURL}
                    alt="Profil"
                    className="w-10 h-10 rounded-full border-2 border-accent object-cover cursor-pointer"
                  />
                ) : (
                  <UserCircle className="w-10 h-10 text-accent cursor-pointer" />
                )}
              </button>

              {showMenu && (
                <div className="absolute right-0 mt-3 bg-white text-primary rounded-lg shadow-lg w-40 font-[Poppins]">
                  <a
                    href="/profile"
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    Mon profil
                  </a>
                  <a href="/dashboard" className="block px-4 py-2 hover:bg-gray-100">Dashboard</a>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 hover:bg-gray-100"
                  >
                    Déconnexion
                  </button>
                </div>
              )}
            </div>
          ) : (
            <a
              href="/auth"
              className="bg-accent text-white px-5 py-2 rounded-lg hover-bg-primary transition"
            >
              S’inscrire
            </a>
          )}

        </nav>

        {/* MENU MOBILE BURGER */}
        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-primary focus:outline-none"
          >
            {isOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>

        {/* MENU DÉROULANT MOBILE */}
        {isOpen && (
          <div className="absolute top-full left-0 w-full bg-white/95 backdrop-blur-sm shadow-lg flex flex-col items-center py-6 gap-4 font-[Poppins] text-primary">
            <a href="/" className="hover-text-accent transition">
              Accueil
            </a>
            <a href="#" className="hover-text-accent transition">
              À propos
            </a>
            <a href="#" className="hover-text-accent  transition">
              Enseignants
            </a>
            <a href="#" className="hover-text-accent  transition">
              Apprenants
            </a>
            <a href="#" className="hover-text-accent  transition">
              Ressources
            </a>
            {user ? (
              <div className="relative">
                <button onClick={() => setShowMenu(!showMenu)}>
                  {user.photoURL ? (
                    <img
                      src={user.photoURL}
                      alt="Profil"
                      className="w-10 h-10 rounded-full border-2 border-accent object-cover"
                    />
                  ) : (
                    <UserCircle className="w-10 h-10 text-accent cursor-pointer" />
                  )}
                </button>

                {showMenu && (
                  <div className="absolute right-0 mt-3 bg-white text-primary rounded-lg shadow-lg w-40 font-[Poppins]">
                    <a
                      href="/profile"
                      className="block px-4 py-2 hover:bg-gray-100"
                    >
                      Mon profil
                    </a>
                    <a href="/dashboard" className="block px-4 py-2 hover:bg-gray-100">Dashboard</a>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 hover:bg-gray-100"
                    >
                      Déconnexion
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <a
                href="/auth"
                className="bg-accent text-white px-5 py-2 rounded-lg hover-bg-primary transition"
              >
                S’inscrire
              </a>
            )}

          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
