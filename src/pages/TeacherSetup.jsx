// src/pages/TeacherSetup.jsx
import React, { useEffect, useState } from "react";
import { auth, db } from "../services/firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { Loader2, Save } from "lucide-react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function TeacherSetup() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    subjects: [],
    price: "",
    description: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (!user) {
        navigate("/auth");
        return;
      }

      try {
        const ref = doc(db, "users", user.uid);
        const snap = await getDoc(ref);

        if (!snap.exists()) {
          toast.error("Votre profil est incomplet.");
          navigate("/profile");
          return;
        }

        const data = snap.data();
        setForm({
          subjects: data.subjects || [],
          price: data.price || "",
          description: data.description || "",
        });
      } catch (err) {
        console.error(err);
        toast.error("Erreur de chargement.");
      } finally {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleSave = async () => {
    const user = auth.currentUser;
    if (!user) return;

    setSaving(true);

    try {
      const ref = doc(db, "users", user.uid);
      await updateDoc(ref, form);
      toast.success("Profil enseignant mis à jour !");
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      toast.error("Erreur de sauvegarde.");
    } finally {
      setSaving(false);
    }
  };

  const toggleSubject = (subject) => {
    if (form.subjects.includes(subject)) {
      setForm({ ...form, subjects: form.subjects.filter((s) => s !== subject) });
    } else {
      setForm({ ...form, subjects: [...form.subjects, subject] });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <Loader2 className="w-8 h-8 animate-spin text-accent" />
      </div>
    );
  }

  const matières = ["Maths", "Physique", "SVT", "Anglais", "Français", "Histoire", "Géographie", "PCB"];

  return (
    <section className="min-h-screen bg-[#F5F7F8] flex justify-center px-6 pt-20 pb-12">
      <div className="bg-white shadow-xl rounded-2xl p-8 max-w-2xl w-full font-[Poppins]">
        <h2 className="text-2xl font-bold text-primary mb-6">Compléter mon Profil Enseignant</h2>

        {/* SUBJECTS */}
        <div className="mb-6">
          <label className="block text-gray-700 mb-2 font-medium">Matières enseignées</label>
          <div className="grid grid-cols-2 gap-3">
            {matières.map((m) => (
              <button
                key={m}
                onClick={() => toggleSubject(m)}
                className={`px-4 py-2 rounded-lg border ${
                  form.subjects.includes(m)
                    ? "bg-accent text-white"
                    : "bg-gray-100 text-gray-600"
                }`}
              >
                {m}
              </button>
            ))}
          </div>
        </div>

        {/* PRICE */}
        <div className="mb-6">
          <label className="block text-gray-700 mb-2 font-medium">Tarif (par séance)</label>
          <input
            type="text"
            className="w-full border px-4 py-2 rounded-lg"
            value={form.price}
            onChange={(e) => setForm({ ...form, price: e.target.value })}
            placeholder="Ex : 2000 FCFA"
          />
        </div>

        {/* DESCRIPTION */}
        <div className="mb-6">
          <label className="block text-gray-700 mb-2 font-medium">Description</label>
          <textarea
            className="w-full border px-4 py-2 rounded-lg"
            rows={4}
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            placeholder="Décrivez brièvement votre expérience, votre méthode…"
          />
        </div>

        {/* SAVE */}
        <div className="flex justify-end">
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-2 bg-accent text-white px-6 py-3 rounded-lg"
          >
            {saving ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save />}
            Enregistrer
          </button>
        </div>
      </div>
    </section>
  );
}
