import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FiX } from "react-icons/fi"; 
import axios from "axios";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import streakIcon from "../assets/streak-icon.png";

export default function Affirmation() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);

  const [currentAffirmation, setCurrentAffirmation] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState({ text: "", type: "" });
  
  const [affirmationsHistory, setAffirmationsHistory] = useState([]);

  const [showStreakModal, setShowStreakModal] = useState(false);
  const [newStreakCount, setNewStreakCount] = useState(0);

  const formatDate = (dateString) => {
    if (!dateString) return "Baru saja";
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return "Baru saja";
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    return date.toLocaleDateString('id-ID', options);
  };

  const fetchMyAffirmations = async (userId) => {
    try {
      const response = await axios.get("https://emovision-backend-production.up.railway.app/api/affirmations");
      
      if (response.data && Array.isArray(response.data.data)) {
        const myAffirms = response.data.data.filter(item => item.user_id === userId);
        setAffirmationsHistory(myAffirms);
      } else {
        setAffirmationsHistory([]);
      }
    } catch (error) {
      console.error("Gagal mengambil riwayat afirmasi:", error);
      setAffirmationsHistory([]); 
    }
  };

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUserData(parsedUser);
      fetchMyAffirmations(parsedUser.user_id);
    } else {
      navigate("/login");
    }
  }, [navigate]);

  const handleSave = async () => {
    if (!currentAffirmation.trim()) {
      setStatusMessage({ text: "The affirmation cannot be empty!", type: "error" });
      setTimeout(() => setStatusMessage({ text: "", type: "" }), 3000);
      return;
    }

    if (!userData) {
      setStatusMessage({ text: "Invalid session, please login again.", type: "error" });
      return;
    }

    setIsLoading(true);
    setStatusMessage({ text: "", type: "" });

    try {
      const response = await axios.post("https://emovision-backend-production.up.railway.app/api/affirmations", {
        user_id: userData.user_id,
        content: currentAffirmation
      });
      
      setStatusMessage({ text: "Yay! The affirmation has been saved.", type: "success" });
      setCurrentAffirmation("");
      
      if (response.data.data) {
        setAffirmationsHistory([response.data.data, ...affirmationsHistory]);
      }
      
      if (response.data.isStreakUpdated) {
        setNewStreakCount(response.data.currentStreak);
        setShowStreakModal(true); 
      }
      
    } catch (error) {
      console.error("Failed to save affirmation:", error);
      setStatusMessage({ text: "Failed to connect to the server.", type: "error" });
    } finally {
      setIsLoading(false);
      setTimeout(() => setStatusMessage({ text: "", type: "" }), 3000);
      
      const textarea = document.getElementById('affirmation-input');
      if(textarea) textarea.style.height = 'auto';
    }
  };

  const handleInput = (e) => {
    const element = e.target;
    setCurrentAffirmation(element.value);
    element.style.height = "auto";
    element.style.height = `${element.scrollHeight}px`;
  };

  return (
    <div className="flex h-screen bg-emo-bg font-fredoka overflow-hidden relative">
      <Sidebar />

      <div className="flex-1 overflow-y-auto">
        <div className="p-5 pt-20 md:p-10 max-w-6xl mx-auto min-h-screen">
          
          <div className="mb-10">
            <h1 className="text-5xl font-bold text-gray-900 mb-3">Affirmation</h1>
            <p className="text-3xl text-gray-800 leading-snug">
              Speak kindness to yourself and watch your world transform.
            </p>
          </div>

          <div className="bg-white p-8 rounded-[40px] shadow-lg flex flex-col mb-12 relative">
            <textarea
              id="affirmation-input"
              className="w-full resize-none outline-none text-2xl text-gray-700 placeholder-gray-400 bg-transparent overflow-hidden min-h-[120px] disabled:opacity-50"
              placeholder="Type your daily affirmation here..."
              value={currentAffirmation}
              onInput={handleInput}
              disabled={isLoading}
              rows={1}
            />
            
            <div className="flex flex-col sm:flex-row items-end sm:items-center justify-between gap-4 mt-4">
              <div className="flex-1">
                {statusMessage.text && (
                  <span className={`font-medium ${statusMessage.type === 'success' ? 'text-green-500' : 'text-red-500'}`}>
                    {statusMessage.text}
                  </span>
                )}
              </div>
              <button 
                onClick={handleSave}
                disabled={isLoading}
                className={`text-white px-12 py-3 rounded-full font-bold text-lg transition-all shadow-md active:scale-95 ${
                  isLoading ? "bg-gray-400 cursor-not-allowed" : "bg-[#AC87C5] hover:bg-[#9b75b3]"
                }`}
              >
                {isLoading ? "Saving..." : "Save Affirmation"}
              </button>
            </div>
          </div>

          <div className="mb-20">
            <h2 className="text-4xl font-bold text-gray-900 mb-8">Previous Affirmations</h2>
            
            {affirmationsHistory.length === 0 ? (
              <p className="text-gray-500 text-xl italic">No affirmations have been written yet. Start speaking kindness to yourself today!</p>
            ) : (
              <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
                {affirmationsHistory.map((item) => (
                  <div 
                    key={item.affirmation_id} 
                    className="break-inside-avoid bg-white p-8 rounded-[35px] shadow-md flex flex-col border border-transparent hover:border-[#AC87C5]/20 transition-all"
                  >
                    <span className="text-gray-400 font-bold text-sm mb-4 uppercase tracking-wider">
                      {formatDate(item.created_at)}
                    </span>
                    <p className="text-gray-800 font-medium text-xl italic leading-relaxed">
                      "{item.content}"
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>
        <Footer />
      </div>

      {showStreakModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/80 backdrop-blur-md transition-all duration-300">
          <div className="bg-white rounded-3xl p-8 max-w-[360px] w-full mx-4 shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-gray-100 transform scale-100 relative text-center flex flex-col items-center animate-bounce-short">
            <button 
              onClick={() => setShowStreakModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 transition-colors"
            >
              <FiX size={24} />
            </button>
            <div className="w-24 h-24 mb-4 mt-2">
              <img src={streakIcon} alt="Streak Achieved" className="w-full h-full object-contain drop-shadow-sm animate-pulse" />
            </div>
            <h2 className="text-[64px] font-extrabold text-[#2F3640] leading-none tracking-tight mb-1">
              {newStreakCount}
            </h2>
            <p className="text-xl font-bold text-[#4B5563] mb-6">
              days in a row
            </p>
            <p className="text-[15px] text-[#6B7280] mb-8 leading-relaxed px-2">
              To discover more about yourself, keep up your daily journaling or affirmations practice!
            </p>
            <button 
              onClick={() => setShowStreakModal(false)}
              className="bg-[#2D3748] hover:bg-[#1A202C] text-white w-full py-3.5 rounded-lg font-bold text-[15px] shadow-sm transition-colors"
            >
              Continue writing affirmations
            </button>
          </div>
        </div>
      )}
      
    </div>
  );
}