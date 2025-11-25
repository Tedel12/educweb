import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Auth from "../pages/Auth";
import Profile from "../pages/Profile";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ScrollToTopButton from "../components/ScrollToTopButton";
import ChooseRole from "../pages/ChooseRole";
import Dashboard from "../pages/Dashboard";
import TeacherSetup from "../pages/TeacherSetup";
import TeacherAvailability from "../pages/TeacherAvailability";
import ConversationList from "../components/Conversations/ConversationList";
import Chat from "../pages/Chat";


const AppRoutes = () => {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-background text-textDark">
        <Header />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/choose-role" element={<ChooseRole />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/teacher-setup" element={<TeacherSetup />} />
            <Route path="/teacher-availability" element={<TeacherAvailability />} />
            {/* <Route path="/conversations" element={<ConversationList currentUser={user} />} /> */}
            {/* <Route path="/chat/:id" element={<Chat user={user} />} /> */}
          </Routes>
        </main>
        <Footer />
        <ScrollToTopButton />
      </div>
    </Router>
  );
};

export default AppRoutes;
