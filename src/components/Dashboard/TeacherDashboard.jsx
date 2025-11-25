// src/components/Dashboard/TeacherDashboard.jsx
import React, { useEffect, useState } from "react";
import { db } from "../../services/firebase";
import { collection, query, where, onSnapshot, doc, updateDoc, getDoc } from "firebase/firestore";
import RequestCard from "./RequestCard";
import toast from "react-hot-toast";
import { createConversationIfNotExists } from "../../services/conversations";


export default function TeacherDashboard({ user, profile }) {
  const [incoming, setIncoming] = useState([]);

  useEffect(() => {
    const q = query(collection(db, "requests"), where("to", "==", user.uid));
    const unsub = onSnapshot(q, snap => {
      const arr = [];
      snap.forEach(d => arr.push({ id: d.id, ...d.data() }));
      setIncoming(arr.sort((a,b)=> (b.createdAt||0) - (a.createdAt||0)));
    }, err => {
      console.error(err);
      toast.error("Erreur lors de la lecture des demandes.");
    });

    return () => unsub();
  }, [user.uid]);

  const accept = async (req) => {
    try {
      const rRef = doc(db, "requests", req.id);
      await updateDoc(rRef, { status: "accepted", handledAt: Date.now() });

      // Créer conversation si besoin (studentId = req.from, teacherId = req.to)
      // Option : message automatique system
      const convoId = await createConversationIfNotExists(req.from, req.to, {
        sender: req.to, // teacher system message sender is teacher
        text: "Demande acceptée — commencez la discussion ici."
      });

      toast.success("Demande acceptée et conversation créée");
    } catch (err) {
      console.error(err);
      toast.error("Impossible d'accepter.");
    }
  };

  const reject = async (req) => {
    try {
      const rRef = doc(db, "requests", req.id);
      await updateDoc(rRef, { status: "rejected", handledAt: Date.now() });
      toast.success("Demande refusée");
    } catch (err) {
      console.error(err);
      toast.error("Impossible de refuser.");
    }
  };

  return (
    <div className="min-h-screen py-10 px-6 bg-[#F5F7F8]">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="bg-white p-6 rounded-2xl shadow">
          <h2 className="text-2xl font-[Poppins] font-bold text-primary">Bonjour, {profile.name || "Enseignant"} 👋</h2>
          <p className="text-gray-600 mt-1">Gère ici les demandes reçues et ton planning.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow space-y-4">
            <h3 className="font-semibold">Demandes reçues</h3>
            {incoming.length === 0 ? (
              <div className="text-sm text-gray-500">Aucune demande pour l'instant.</div>
            ) : (
              <div className="space-y-3">
                {incoming.map(r => (
                  <RequestCard key={r.id} request={r} roleView="teacher" onAccept={accept} onReject={reject} />
                ))}
              </div>
            )}
          </div>

          <aside className="space-y-4">
            <div className="bg-white p-6 rounded-2xl shadow">
              <h4 className="font-semibold">Mes informations</h4>
              <div className="text-sm text-gray-600 mt-2">
                Matières : {profile.subjects?.join?.(", ") || "Non définies"}
              </div>
              <div className="text-sm text-gray-600 mt-1">Tarif : {profile.price || "Non défini"}</div>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow">
              <h4 className="font-semibold">Raccourcis</h4>
              <div className="flex flex-col gap-2 mt-3">
                <a className="px-3 py-2 rounded bg-accent text-white text-center" href="/profile">Modifier mon profil</a>

                <a
                    href="/teacher-setup"
                    className="px-3 py-2 rounded bg-accent text-white text-center"
                    >
                    Compléter mon profil enseignant
                </a>
                <a className="px-3 py-2 rounded border text-center" href="/resources">Ajouter une ressource</a>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
