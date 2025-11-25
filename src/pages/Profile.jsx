import React, { useState, useEffect, useRef } from "react";
import { auth, db, storage } from "../services/firebase.js";

import {
  doc,
  getDoc,
  updateDoc,
  setDoc,
} from "firebase/firestore";
import {
  onAuthStateChanged,
  updateProfile,
} from "firebase/auth";
import {
  ref,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";
import { UserCircle, Save, Loader2, Camera, AlertTriangle } from "lucide-react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const navigate = useNavigate();

  const [accountInfo, setAccountInfo] = useState({
    creationTime: "",
    lastLogin: "",
  });

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    bio: "",
    role: null,
    photoURL: "",
    email: "",
  });

  const fileInputRef = useRef(null);


  useEffect(() => {
    if (!loading && user && formData.role === null && window.location.pathname !== "/choose-role") {
      navigate("/choose-role");
    }
  }, [loading, user, formData.role]);


  // ========================================================
  // Charger Utilisateur + Métadonnées Firebase
  // ========================================================
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (!currentUser) {
        setUser(null);
        setLoading(false);
        toast.error("Aucun utilisateur connecté.");
        return;
      }

      setUser(currentUser);

      setAccountInfo({
        creationTime: currentUser.metadata.creationTime,
        lastLogin: currentUser.metadata.lastSignInTime,
      });

      await loadUserData(currentUser);
    });

    return () => unsubscribe();
  }, []);

  // ========================================================
  // Charger ou créer le document Firestore
  // ========================================================
  const loadUserData = async (currentUser) => {
    try {
      const userRef = doc(db, "users", currentUser.uid);
      const snap = await getDoc(userRef);

      if (snap.exists()) {
        setFormData(snap.data());
      } else {
        const autoUser = {
          name: currentUser.displayName || "",
          email: currentUser.email || "",
          photoURL: currentUser.photoURL || "",
          phone: "",
          bio: "",
          role: null,
        };
        await setDoc(userRef, autoUser);
        setFormData(autoUser);
      }
    } catch (error) {
      console.error("Firestore error:", error);
      toast.error("Erreur de chargement du profil.");
    } finally {
      setLoading(false);
    }
  };

  // ========================================================
  // Calcul du taux de complétion
  // ========================================================
  const completion = (() => {
    let filled = 0;
    if (formData.name) filled += 1;
    if (formData.phone) filled += 1;
    if (formData.bio) filled += 1;
    if (formData.photoURL) filled += 1;
    if (formData.role) filled += 1;

    return Math.round((filled / 5) * 100);
  })();

  const missingFields = [];
  if (!formData.photoURL) missingFields.push("Photo de profil");
  if (!formData.name) missingFields.push("Nom complet");
  if (!formData.phone) missingFields.push("Téléphone");
  if (!formData.bio) missingFields.push("Bio");

  // ========================================================
  // Mise à jour des inputs
  // ========================================================
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ========================================================
  // Sauvegarde
  // ========================================================
  const handleSave = async () => {
    if (!user) return;

    setSaving(true);
    try {
      await updateDoc(doc(db, "users", user.uid), formData);
      await updateProfile(user, {
        displayName: formData.name,
        photoURL: formData.photoURL,
      });

      toast.success("Profil mis à jour !");
    } catch (error) {
      console.error(error);
      toast.error("Erreur de sauvegarde.");
    } finally {
      setSaving(false);
    }
  };

  // ========================================================
  // Upload photo
  // ========================================================
  const handlePhotoChange = async (e) => {
    const file = e.target.files[0];
    if (!file || !user) return;

    setUploading(true);
    const storageRef = ref(storage, `profilePictures/${user.uid}/${file.name}`);

    try {
      await uploadBytes(storageRef, file);
      const url = await getDownloadURL(storageRef);

      await updateDoc(doc(db, "users", user.uid), { photoURL: url });
      await updateProfile(user, { photoURL: url });

      setFormData({ ...formData, photoURL: url });
      toast.success("Photo mise à jour !");
    } catch (err) {
      console.error(err);
      toast.error("Erreur upload.");
    } finally {
      setUploading(false);
    }
  };

  // ========================================================
  // Loading
  // ========================================================
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader2 className="animate-spin text-accent w-10 h-10" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg font-semibold">Veuillez vous connecter.</p>
      </div>
    );
  }

  // ========================================================
  // TOUT L'AFFICHAGE FINAL
  // ========================================================
  return (
    <section className="min-h-screen bg-[#F5F7F8] pt-16 pb-20 flex justify-center px-6">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-3xl font-[DM Sans]">

        {/* ============================
            PROGRESS BAR + MESSAGES
        ============================ */}
        <h2 className="text-xl font-bold text-primary font-[Poppins] mb-3">
          Complétion du profil : {completion}%
        </h2>

        <div className="w-full bg-gray-200 h-3 rounded-full mb-4">
          <div
            style={{ width: `${completion}%` }}
            className="h-3 rounded-full bg-accent transition-all"
          ></div>
        </div>

        {missingFields.length > 0 && (
          <div className="bg-yellow-100 border-l-4 border-yellow-500 p-3 rounded-lg flex items-start gap-3 mb-6">
            <AlertTriangle className="text-yellow-600 mt-1" />
            <div>
              <p className="font-semibold text-yellow-700">Profil incomplet :</p>
              <ul className="text-sm text-yellow-800 list-disc ml-4">
                {missingFields.map((f, i) => (
                  <li key={i}>{f}</li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* ============================
            PHOTO + INFOS PRINCIPALES
        ============================ */}
        <div className="flex flex-col items-center mb-10">
          <div className="relative group cursor-pointer">
            {formData.photoURL ? (
              <img
                src={formData.photoURL}
                alt="Profil"
                className="w-28 h-28 rounded-full object-cover border-4 border-accent shadow-md"
                onClick={() => fileInputRef.current.click()}
              />
            ) : (
              <UserCircle
                className="w-28 h-28 text-accent"
                onClick={() => fileInputRef.current.click()}
              />
            )}

            <div className="absolute inset-0 bg-black/40 rounded-full opacity-0 group-hover:opacity-100 flex items-center justify-center transition">
              <Camera className="text-white w-7 h-7" />
            </div>
          </div>

          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            accept="image/*"
            onChange={handlePhotoChange}
          />

          <h1 className="text-2xl font-bold mt-4 font-[Poppins] text-primary">
            {formData.name || "Utilisateur"}
          </h1>
          <p className="text-gray-500">{formData.email}</p>
          <p className="text-sm bg-accent/10 text-accent px-3 py-1 mt-1 rounded-full">
            {formData.role}
          </p>
        </div>

        {/* ============================
            METADATA (création / login)
        ============================ */}
        <div className="bg-gray-50 border rounded-xl p-4 mb-8">
          <p className="text-sm text-gray-600">
            <strong>Compte créé :</strong> {accountInfo.creationTime}
          </p>
          <p className="text-sm text-gray-600 mt-1">
            <strong>Dernière connexion :</strong> {accountInfo.lastLogin}
          </p>
        </div>

        {/* ============================
              FORMULAIRE
        ============================ */}
        <div className="space-y-5">
          {/* Nom */}
          <div>
            <label className="block text-sm text-gray-600 mb-1">Nom complet</label>
            <input
              type="text"
              name="name"
              className="w-full border px-4 py-3 rounded-lg"
              value={formData.name}
              onChange={handleChange}
            />
          </div>

          {/* Telephone */}
          <div>
            <label className="block text-sm text-gray-600 mb-1">Téléphone</label>
            <input
              type="text"
              name="phone"
              className="w-full border px-4 py-3 rounded-lg"
              value={formData.phone}
              onChange={handleChange}
            />
          </div>

          {/* Bio */}
          <div>
            <label className="block text-sm text-gray-600 mb-1">Bio</label>
            <textarea
              name="bio"
              rows="4"
              className="w-full border px-4 py-3 rounded-lg"
              value={formData.bio}
              onChange={handleChange}
            ></textarea>
          </div>
        </div>

        {/* Bouton sauvegarder */}
        <div className="mt-8 flex justify-end">
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-2 bg-accent text-white px-6 py-3 rounded-lg shadow hover:opacity-90 disabled:opacity-40 cursor-pointer"
          >
            {saving ? (
              <>
                <Loader2 className="animate-spin w-5 h-5" /> Sauvegarde...
              </>
            ) : (
              <>
                <Save className="w-5 h-5" /> Enregistrer
              </>
            )}
          </button>
        </div>
      </div>
    </section>
  );
};

export default Profile;
