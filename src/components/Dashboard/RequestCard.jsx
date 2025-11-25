// src/components/Dashboard/RequestCard.jsx
import React from "react";
import { Check, X, Clock, MessageCircle } from "lucide-react";

export default function RequestCard({ request, roleView, onAccept, onReject, onCancel }) {

  const statusStyles = {
    pending: "bg-yellow-100 text-yellow-700",
    accepted: "bg-green-100 text-green-700",
    rejected: "bg-red-100 text-red-700",
    cancelled: "bg-gray-200 text-gray-600",
  };

  return (
    <div className="border p-4 rounded-xl flex justify-between items-start">
      <div>
        <div className="font-semibold text-primary">{request.subject}</div>

        <div className="text-sm text-gray-600 mt-1">
          {roleView === "teacher" ? (
            <>De : {request.fromName}</>
          ) : (
            <>À : {request.toName}</>
          )}
        </div>

        <div className="mt-2">
          <span className={`px-2 py-1 text-xs rounded-md ${statusStyles[request.status]}`}>
            {request.status === "pending" && "En attente"}
            {request.status === "accepted" && "Acceptée"}
            {request.status === "rejected" && "Rejetée"}
            {request.status === "cancelled" && "Annulée"}
          </span>
        </div>

        {request.message && (
          <div className="text-sm text-gray-700 mt-2 flex gap-1">
            <MessageCircle size={14} /> {request.message}
          </div>
        )}
      </div>

      {/* ACTIONS */}
      <div className="flex gap-2">
        {/* SI JE SUIS ENSEIGNANT */}
        {roleView === "teacher" && request.status === "pending" && (
          <>
            <button
              onClick={() => onAccept(request)}
              className="p-2 bg-green-500 text-white rounded-lg"
            >
              <Check />
            </button>

            <button
              onClick={() => onReject(request)}
              className="p-2 bg-red-500 text-white rounded-lg"
            >
              <X />
            </button>
          </>
        )}

        {/* SI JE SUIS ÉTUDIANT */}
        {roleView === "student" && request.status === "pending" && (
          <button
            onClick={() => onCancel(request)}
            className="p-2 bg-gray-300 text-gray-700 rounded-lg"
          >
            <X />
          </button>
        )}
      </div>
    </div>
  );
}
