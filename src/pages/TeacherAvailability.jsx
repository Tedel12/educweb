import React, { useEffect, useState } from "react";
import { auth, db } from "../services/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import toast from "react-hot-toast";

const DAYS = [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday"
];

export default function TeacherAvailability() {
  const [user, setUser] = useState(null);
  const [availability, setAvailability] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (u) => {
      if (!u) {
        toast.error("Veuillez vous connecter.");
        return;
      }

      setUser(u);
      await loadAvailability(u);
    });

    return () => unsub();
  }, []);

  const loadAvailability = async (u) => {
    try {
      const ref = doc(db, "availability", u.uid);
      const snap = await getDoc(ref);

      if (snap.exists()) {
        setAvailability(snap.data());
      } else {
        const empty = {};
        DAYS.forEach(d => (empty[d] = []));
        setAvailability(empty);
      }

    } catch (err) {
      console.error(err);
      toast.error("Erreur de chargement.");
    } finally {
      setLoading(false);
    }
  };

  const toggleSlot = (day, slot) => {
    const list = availability[day] || [];
    const exists = list.includes(slot);

    const updated = exists
      ? list.filter(s => s !== slot)
      : [...list, slot];

    setAvailability({ ...availability, [day]: updated });
  };

  const save = async () => {
    if (!user) return;

    try {
      const ref = doc(db, "availability", user.uid);
      await setDoc(ref, availability);
      toast.success("Disponibilités mises à jour !");
    } catch (err) {
      console.error(err);
      toast.error("Erreur lors de l’enregistrement.");
    }
  };

  if (loading) return <div className="p-10">Chargement...</div>;

  const SLOTS = [
    "08:00-10:00",
    "10:00-12:00",
    "14:00-16:00",
    "16:00-18:00",
    "18:00-20:00",
  ];

  return (
    <div className="min-h-screen bg-[#F5F7F8] px-6 py-10">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-2xl shadow font-[Poppins]">
        <h2 className="text-2xl font-bold text-primary mb-6">
          Mes disponibilités
        </h2>

        <div className="space-y-8">
          {DAYS.map(day => (
            <div key={day}>
              <h3 className="font-semibold text-lg capitalize mb-3">
                {day}
              </h3>

              <div className="flex gap-3 flex-wrap">
                {SLOTS.map(slot => {
                  const active = availability[day]?.includes(slot);

                  return (
                    <button
                      key={slot}
                      onClick={() => toggleSlot(day, slot)}
                      className={`px-3 py-2 rounded-lg border ${
                        active
                          ? "bg-accent text-white border-accent"
                          : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {slot}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={save}
          className="mt-8 bg-accent text-white px-6 py-3 rounded-lg shadow hover:opacity-90 cursor-pointer"
        >
          Enregistrer
        </button>
      </div>
    </div>
  );
}
