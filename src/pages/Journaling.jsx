import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FiChevronDown, FiChevronUp, FiBookOpen, FiX } from "react-icons/fi";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import angryImg from "../assets/angry.png";
import streakIcon from "../assets/streak-icon.png";

export default function Journaling() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [currentJournal, setCurrentJournal] = useState("");
  const [openId, setOpenId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState({ text: "", type: "" });
  const [showStreakModal, setShowStreakModal] = useState(false);
  const [newStreakCount, setNewStreakCount] = useState(0);
  const [journalsHistory, setJournalsHistory] = useState([]);

  const formatDate = (dateString) => {
    if (!dateString) return "Just now";
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return "Just now";
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    return date.toLocaleDateString('id-ID', options);
  };

  const fetchMyJournals = async (userId) => {
    try {
      const response = await axios.get("http://localhost:5000/api/journals");
      if (response.data && Array.isArray(response.data.data)) {
        const myJournals = response.data.data.filter(journal => journal.user_id === userId);
        setJournalsHistory(myJournals);
      } else {
        setJournalsHistory([]);
      }
    } catch (error) {
      console.error("Failed to fetch journal history:", error);
      setJournalsHistory([]); 
    }
  };

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUserData(parsedUser);
      fetchMyJournals(parsedUser.user_id);
    } else {
      navigate("/login");
    }
  }, [navigate]);

  const handleSave = async () => {
    if (!currentJournal.trim()) {
      setStatusMessage({ text: "You can't leave the journal empty!", type: "error" });
      setTimeout(() => setStatusMessage({ text: "", type: "" }), 3000);
      return;
    }

    if (!userData) {
      setStatusMessage({ text: "Invalid session, please login again.", type: "error" });
      return;
    }

    setIsLoading(true);
    setStatusMessage({ text: "", type: "" });

    const journalData = {
      user_id: userData.user_id, 
      content: currentJournal,
      mood_result: "Neutral", 
      ai_accuracy_score: 0.85, 
      ai_feedback: "Feature detection is being processed..." 
    };

    try {
      const response = await axios.post("http://localhost:5000/api/journals", journalData);
      
      setStatusMessage({ text: "Yeay! Journal saved successfully.", type: "success" });
      setCurrentJournal("");
      
      if (response.data.data) {
        setJournalsHistory([response.data.data, ...journalsHistory]);
      }
      
      if (response.data.isStreakUpdated) {
        setNewStreakCount(response.data.currentStreak);
        setShowStreakModal(true); 
      }
      
    } catch (error) {
      console.error("Failed to save:", error);
      setStatusMessage({ text: "Failed to connect to the server.", type: "error" });
    } finally {
      setIsLoading(false);
      setTimeout(() => setStatusMessage({ text: "", type: "" }), 3000);
    }
  };

  const toggleDropdown = (id) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <div className="flex h-screen bg-emo-bg font-fredoka overflow-hidden relative">
      <Sidebar />

      <div className="flex-1 overflow-y-auto">
        <div className="p-5 pt-20 md:p-10 max-w-6xl mx-auto min-h-screen">
          <div className="mb-8">
            <h1 className="text-5xl font-bold text-gray-900 mb-2">Journaling</h1>
            <p className="text-3xl text-gray-700">How are you feeling today?</p>
          </div>

          <div className="bg-white p-8 rounded-[40px] shadow-lg flex flex-col mb-10 min-h-[300px] relative">
            <textarea
              className="w-full flex-1 resize-none outline-none text-xl text-gray-700 placeholder-gray-400 bg-transparent disabled:opacity-50"
              placeholder="Write Your Heart Out..."
              maxLength={200}
              value={currentJournal}
              onChange={(e) => setCurrentJournal(e.target.value)}
              disabled={isLoading}
            />
            
            <div className="flex flex-col sm:flex-row items-end sm:items-center justify-between gap-4 mt-4">              
              <div className="flex-1">
                {statusMessage.text && (
                  <span className={`font-medium ${statusMessage.type === 'success' ? 'text-green-500' : 'text-red-500'}`}>
                    {statusMessage.text}
                  </span>
                )}
              </div>
              <div className="flex items-center gap-6">
                <span className="text-gray-400 font-medium text-lg">
                  {currentJournal.length}/200
                </span>
                <button 
                  onClick={handleSave}
                  disabled={isLoading}
                  className={`px-10 py-3 rounded-full font-bold text-lg transition-all shadow-md text-white ${
                    isLoading ? "bg-gray-400 cursor-not-allowed" : "bg-[#AC87C5] hover:bg-[#9b75b3]"
                  }`}
                >
                  {isLoading ? "Saving..." : "Save Journal"}
                </button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="bg-[#D8A7CA] p-8 rounded-[40px] shadow-lg flex flex-col items-center justify-center text-white">
              <div className="w-24 h-24 mb-6">
                <img src={angryImg} alt="Angry Mood" className="w-full h-full object-contain drop-shadow-md" />
              </div>
              <h3 className="font-bold text-2xl mb-4">Mood Today</h3>
              <div className="flex flex-col gap-2 w-full">
                 <div className="bg-[#AC87C5] py-2 rounded-full text-center text-sm font-bold">Angry 90%</div>
                 <div className="bg-[#AC87C5]/60 py-2 rounded-full text-center text-sm font-bold">Neutral 25%</div>
              </div>
            </div>

            <div className="bg-[#D8A7CA] p-10 rounded-[40px] shadow-lg text-white md:col-span-2 flex flex-col justify-center">
              <h3 className="font-bold text-3xl mb-6 italic">AI Generate</h3>
              <p className="text-lg font-medium leading-relaxed italic">
                "Sepertinya Anda sedang melewati momen yang cukup menguras emosi hari ini. Tidak apa-apa untuk merasa marah; itu adalah perasaan yang valid..."
              </p>
            </div>
          </div>

          <div className="mb-20">
            <h2 className="text-4xl font-bold text-gray-900 mb-8">My Journey</h2>
            
            {journalsHistory.length === 0 ? (
              <p className="text-gray-500 text-xl italic">No journal entries have been written yet. Let’s start writing today!</p>
            ) : (
              <div className="flex flex-col gap-5">
                {journalsHistory.map((item) => (
                  <div key={item.journal_id} className="flex flex-col w-full">
                    <button 
                      onClick={() => toggleDropdown(item.journal_id)}
                      className="bg-white p-6 rounded-[25px] shadow-md flex items-center justify-between hover:bg-gray-50 transition-all z-10"
                    >
                      <div className="flex items-center gap-6">
                        <div className="bg-[#AC87C5] p-4 rounded-2xl text-white">
                          <FiBookOpen size={28} />
                        </div>
                        <span className="text-2xl font-bold text-gray-800">
                          {formatDate(item.created_at)}
                        </span>
                      </div>
                      {openId === item.journal_id ? 
                        <FiChevronUp size={35} className="text-[#AC87C5]" /> : 
                        <FiChevronDown size={35} className="text-[#AC87C5]" />
                      }
                    </button>

                    {openId === item.journal_id && (
                      <div className="bg-[#FDF0F6] mx-4 p-8 rounded-b-[30px] shadow-inner -mt-4 pt-12 animate-fadeIn transition-all">
                        <p className="text-xl text-gray-800 leading-relaxed font-medium mb-6">
                          {item.content}
                        </p>
                        <span className="inline-block bg-[#AC87C5] text-white px-8 py-2 rounded-full text-lg font-bold">
                          {item.mood_result}
                        </span>
                      </div>
                    )}
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
            <button onClick={() => setShowStreakModal(false)} className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 transition-colors">
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
            <button onClick={() => setShowStreakModal(false)} className="bg-[#2D3748] hover:bg-[#1A202C] text-white w-full py-3.5 rounded-lg font-bold text-[15px] shadow-sm transition-colors">
              Continue writing journals
            </button>
          </div>
        </div>
      )}
    </div>
  );
}