// src/components/Dashboard/StudentDashboard.jsx
import React, { useEffect, useState } from "react";
import { db } from "../../services/firebase";
import { collection, query, where, getDocs, addDoc, onSnapshot, orderBy } from "firebase/firestore";
import RequestCard from "./RequestCard";
import toast from "react-hot-toast";
import { doc, updateDoc } from "firebase/firestore";


export default function StudentDashboard({ user, profile }) {
  const [recommended, setRecommended] = useState([]); // teachers
  const [requests, setRequests] = useState([]);
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);

  // listen to requests from current student
  useEffect(() => {
    const rq = query(collection(db, "requests"), where("from", "==", user.uid));

    const unsub = onSnapshot(rq, snapshot => {
      const arr = [];
      snapshot.forEach(doc => arr.push({ id: doc.id, ...doc.data() }));

      // 🔥 tri manuel
      arr.sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));

      setRequests(arr);
    });

    return () => unsub();
  }, [user.uid]);


  const sendRequest = async (teacher) => {
    if (!subject) return toast.error("Indique le sujet.");
    setSending(true);
    try {
      await addDoc(collection(db, "requests"), {
        from: user.uid,
        fromName: profile.name || user.displayName || user.email,
        to: teacher.id,
        toName: teacher.name || teacher.email,
        subject,
        message,
        status: "pending",
        createdAt: Date.now()
      });
      setSubject("");
      setMessage("");
      toast.success("Demande envoyée !");
    } catch (err) {
      console.error(err);
      toast.error("Erreur d'envoi.");
    } finally {
      setSending(false);
    }
  };

    const cancelRequest = async (req) => {
    try {
        const ref = doc(db, "requests", req.id);
        await updateDoc(ref, { status: "cancelled" });
        toast.success("Demande annulée");
    } catch (err) {
        console.error(err);
        toast.error("Impossible d'annuler.");
    }
    };


  return (
    <div className="min-h-screen py-10 px-6 bg-[#F5F7F8]">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left: welcome + requests */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-6 rounded-2xl shadow">
            <h2 className="text-2xl font-[Poppins] font-bold text-primary">Bonjour, {profile.name || "Apprenant"} 👋</h2>
            <p className="text-gray-600 mt-1">Voici des enseignants recommandés selon ta recherche.</p>
          </div>

          {/* Requests list */}
          <div className="bg-white p-6 rounded-2xl shadow space-y-4">
            <h3 className="font-semibold">Mes demandes</h3>
            {requests.length === 0 ? (
              <div className="text-sm text-gray-500">Aucune demande pour l'instant.</div>
            ) : (
              <div className="space-y-3">
                {requests.map(r => (
                  <RequestCard key={r.id} request={r} roleView="student" onCancel={() => cancelRequest(r)} />
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right: form to create request + recommended teachers */}
        <aside className="space-y-6">
          <div className="bg-white p-6 rounded-2xl shadow">
            <h4 className="font-semibold mb-3">Créer une demande</h4>
            <input placeholder="Sujet (ex: Maths - Terminale)" value={subject} onChange={e => setSubject(e.target.value)} className="w-full border rounded px-3 py-2 mb-3" />
            <textarea placeholder="Message (optionnel)" value={message} onChange={e => setMessage(e.target.value)} className="w-full border rounded px-3 py-2 mb-3"></textarea>
            <button 
              onClick={() => {
                if (!recommended.length) {
                  return toast.error("Aucun enseignant disponible pour l’instant.");
                }
                sendRequest(recommended[0]);
              }}
              className="w-full bg-accent text-white py-2 rounded-lg"
            >{sending ? "Envoi..." : "Envoyer à un enseignant recommandé"}</button>
            <p className="text-xs text-gray-500 mt-2">Ou clique sur un enseignant ci-dessous pour lui envoyer une demande individuelle.</p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow">
            <h4 className="font-semibold mb-4">Enseignants recommandés</h4>
            <div className="space-y-3 max-h-64 overflow-auto">
              {recommended.map(t => (
                <div key={t.id} className="flex items-center justify-between">
                  <div>
                    <div className="font-[Poppins] font-medium">{t.name}</div>
                    <div className="text-sm text-gray-500">{t.bio?.slice(0,60)}</div>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => sendRequest(t)} className="px-3 py-1 rounded bg-accent text-white">Contacter</button>
                  </div>
                  <a
                    href="/teacher-availability"
                    className="px-3 py-2 rounded bg-accent text-white text-center"
                  >
                    Disponibilités
                  </a>
                </div>
              ))}
              {recommended.length === 0 && <div className="text-sm text-gray-500">Aucun enseignant trouvé.</div>}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
