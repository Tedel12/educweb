// src/components/Dashboard/ParentDashboard.jsx
import React, { useEffect, useState } from "react";
import { db } from "../../services/firebase";
import { collection, query, where, onSnapshot, getDocs } from "firebase/firestore";
import toast from "react-hot-toast";

export default function ParentDashboard({ user, profile }) {
  const [childrenList, setChildrenList] = useState([]);
  const [childrenRequests, setChildrenRequests] = useState([]);

  useEffect(() => {
    // if profile has children array of uids:
    const uids = profile.children || [];
    if (uids.length === 0) {
      setChildrenList([]);
      return;
    }

    (async () => {
      const arr = [];
      for (const uid of uids) {
        const snap = await getDocs(query(collection(db, "users"), where("__name__", "==", uid)));
        snap.forEach(d => arr.push({ uid: d.id, ...d.data() }));
      }
      setChildrenList(arr);
    })().catch(err => {
      console.error(err);
      toast.error("Erreur lecture enfants");
    });

    // Listen to requests where 'from' is one of these children
    const q = query(collection(db, "requests"), where("from", "in", uids || []));
    const unsub = onSnapshot(q, snap => {
      const arr = [];
      snap.forEach(d => arr.push({ id: d.id, ...d.data() }));
      setChildrenRequests(arr);
    });

    return () => unsub();
  }, [profile.children]);

  return (
    <div className="min-h-screen py-10 px-6 bg-[#F5F7F8]">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="bg-white p-6 rounded-2xl shadow">
          <h2 className="text-2xl font-[Poppins] font-bold text-primary">Bonjour, {profile.name || "Parent"} 👋</h2>
          <p className="text-gray-600 mt-1">Suivez la progression et les demandes de vos enfants.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow">
            <h3 className="font-semibold">Demandes récentes des enfants</h3>
            {childrenRequests.length === 0 ? (
              <div className="text-sm text-gray-500 mt-4">Aucune demande récente.</div>
            ) : (
              <div className="space-y-3 mt-4">
                {childrenRequests.map(r => (
                  <div key={r.id} className="p-3 border rounded-md">
                    <div className="font-medium">{r.subject}</div>
                    <div className="text-sm text-gray-600">{r.fromName} → {r.toName}</div>
                    <div className="text-xs text-gray-400 mt-1">{new Date(r.createdAt).toLocaleString()}</div>
                    <div className="mt-2 text-sm">Statut : <strong>{r.status}</strong></div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <aside className="space-y-4">
            <div className="bg-white p-6 rounded-2xl shadow">
              <h4 className="font-semibold">Mes enfants</h4>
              {childrenList.length === 0 ? (
                <div className="text-sm text-gray-500 mt-3">Aucun enfant enregistré.</div>
              ) : (
                <ul className="mt-3 space-y-2">
                  {childrenList.map(c => (
                    <li key={c.uid} className="text-sm">
                      <div className="font-medium">{c.name}</div>
                      <div className="text-gray-500 text-xs">{c.email}</div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
