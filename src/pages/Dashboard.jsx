// src/pages/Dashboard.jsx
import React, { useEffect, useState } from "react";
import { auth, db } from "../services/firebase";
import { doc, getDoc } from "firebase/firestore";
import StudentDashboard from "../components/Dashboard/StudentDashboard";
import TeacherDashboard from "../components/Dashboard/TeacherDashboard";
import ParentDashboard from "../components/Dashboard/ParentDashboard";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import toast from "react-hot-toast";

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // onAuthStateChanged is used in multiple places — keep consistent with your Profile
    const unsubscribe = auth.onAuthStateChanged(async (u) => {
      if (!u) {
        toast.error("Connectez-vous pour accéder au Dashboard");
        navigate("/auth");
        return;
      }
      setUser(u);

      // load Firestore user doc
      try {
        const ref = doc(db, "users", u.uid);
        const snap = await getDoc(ref);
        if (!snap.exists()) {
          // if user doc missing, redirect to profile for creation
          toast("Profil incomplet — complétez votre profil");
          navigate("/profile");
          return;
        }
        const data = snap.data();
        setFormData(data);

        // if role not chosen, force choose-role
        if (data.role === null) {
          navigate("/choose-role");
          return;
        }
      } catch (err) {
        console.error("Erreur Dashboard load:", err);
        toast.error("Impossible de charger votre compte.");
      } finally {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="animate-spin text-accent w-10 h-10" />
      </div>
    );
  }

  if (!formData || !user) {
    return null;
  }

  // Render by role
  switch (formData.role) {
    case "apprenant":
      return <StudentDashboard user={user} profile={formData} />;
    case "enseignant":
      return <TeacherDashboard user={user} profile={formData} />;
    case "parent":
      return <ParentDashboard user={user} profile={formData} />;
    default:
      return (
        <div className="min-h-screen flex items-center justify-center">
          <p>Rôle inconnu — merci de mettre à jour votre profil.</p>
        </div>
      );
  }
}
