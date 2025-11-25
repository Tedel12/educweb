import React, { useEffect, useState } from "react";
import { collection, query, where, onSnapshot, orderBy } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { db } from "../../services/firebase";

export default function ConversationList({ currentUser }) {
  const [convos, setConvos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentUser) return;
    // query by participantsArray contains current user
    const q = query(
      collection(db, "conversations"),
      where("participantsArray", "array-contains", currentUser.uid),
      orderBy("lastMessageAt", "desc")
    );

    const unsub = onSnapshot(q, (snap) => {
      const list = [];
      snap.forEach(d => list.push({ id: d.id, ...d.data() }));
      setConvos(list);
    }, err => {
      console.error("Conversations listen error", err);
    });

    return () => unsub();
  }, [currentUser]);

  return (
    <div className="bg-white p-6 rounded-2xl shadow">
      <h3 className="text-lg font-semibold mb-4">Messages</h3>
      {convos.length === 0 ? (
        <div className="text-sm text-gray-500">Aucune conversation pour l'instant.</div>
      ) : (
        <div className="space-y-3">
          {convos.map(c => {
            // determine other participant
            const otherUid = c.participants.student === currentUser.uid ? c.participants.teacher : c.participants.student;
            const title = c.lastMessage ? `${c.lastMessage.slice(0, 60)}` : "Nouvelle conversation";
            return (
              <div
                key={c.id}
                onClick={() => navigate(`/chat/${c.id}`)}
                className="cursor-pointer p-3 rounded-lg hover:bg-gray-50 flex justify-between items-center"
              >
                <div>
                  <div className="font-[Poppins] font-medium">Conversation</div>
                  <div className="text-sm text-gray-500">{title}</div>
                </div>
                <div className="text-xs text-gray-400">{c.lastMessageAt ? new Date(c.lastMessageAt).toLocaleString() : ""}</div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
