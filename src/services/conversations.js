// src/services/conversations.js
import { doc, getDoc, setDoc, collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "./firebase";

/**
 * Crée une conversation avec un id déterministe studentId_teacherId (dans cet ordre)
 * si elle n'existe pas. Retourne l'id de la conversation.
 */
export async function createConversationIfNotExists(studentId, teacherId, initialMessage = null) {
  // id déterministe pour éviter doublons
  const convoId = `${studentId}_${teacherId}`;

  const convoRef = doc(db, "conversations", convoId);
  const snap = await getDoc(convoRef);

  if (snap.exists()) {
    return convoId;
  }

  const participants = {
    student: studentId,
    teacher: teacherId
  };

  const participantsArray = [studentId, teacherId];

  const payload = {
    participants,
    participantsArray,
    createdAt: Date.now(),
    lastMessage: initialMessage ? initialMessage.text : "",
    lastMessageAt: initialMessage ? Date.now() : null,
  };

  await setDoc(convoRef, payload);
  // if there's an initialMessage, add it to subcollection messages
  if (initialMessage) {
    const messagesRef = collection(convoRef, "messages");
    await addDoc(messagesRef, {
      sender: initialMessage.sender,
      text: initialMessage.text,
      createdAt: Date.now()
    });
  }

  return convoId;
}
