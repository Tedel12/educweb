import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { db } from "../services/firebase";
import { collection, query, orderBy, onSnapshot, addDoc, doc, updateDoc } from "firebase/firestore";

export default function Chat({ user }) {
  const { id } = useParams(); // conversation id
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const listRef = useRef(null);

  useEffect(() => {
    if (!id) return;

    const messagesRef = collection(db, "conversations", id, "messages");
    const q = query(messagesRef, orderBy("createdAt", "asc"));

    const unsub = onSnapshot(
      q,
      snap => {
        const arr = [];
        snap.forEach(d => arr.push({ id: d.id, ...d.data() }));
        setMessages(arr);

        setTimeout(() => {
          listRef.current?.scrollIntoView({ behavior: "smooth" });
        }, 50);
      },
      err => console.error("Chat messages error", err)
    );

    return () => unsub();
  }, [id]);

  const sendMessage = async () => {
    if (!text.trim() || !user) return;

    const messagesRef = collection(db, "conversations", id, "messages");

    await addDoc(messagesRef, {
      sender: user.uid,
      text: text.trim(),
      createdAt: Date.now()
    });

    const convoRef = doc(db, "conversations", id);
    await updateDoc(convoRef, {
      lastMessage: text.trim(),
      lastMessageAt: Date.now()
    });

    setText("");
  };

  return (
    <div className="min-h-screen bg-[#F5F7F8] pt-16 px-6">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow p-4">

        <div className="h-[60vh] overflow-auto px-4 py-3">
          {messages.map(m => (
            <div
              key={m.id}
              className={`mb-3 ${m.sender === user.uid ? "text-right" : "text-left"}`}
            >
              <div
                className={`inline-block px-4 py-2 rounded-lg ${
                  m.sender === user.uid
                    ? "bg-accent text-white"
                    : "bg-gray-100 text-gray-800"
                }`}
              >
                {m.text}
              </div>

              <div className="text-xs text-gray-400 mt-1">
                {m.createdAt ? new Date(m.createdAt).toLocaleString() : ""}
              </div>
            </div>
          ))}

          <div ref={listRef} />
        </div>

        <div className="flex gap-3 mt-4">
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="flex-1 border rounded-lg px-4 py-2"
            placeholder="Écrire un message..."
            onKeyDown={(e) => { if (e.key === "Enter") sendMessage(); }}
          />

          <button
            onClick={sendMessage}
            className="bg-accent text-white px-4 py-2 rounded-lg"
          >
            Envoyer
          </button>
        </div>

      </div>
    </div>
  );
}
