import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { FiChevronDown, FiChevronUp, FiBookOpen, FiX, FiZap } from "react-icons/fi";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import angryImg from "../assets/angry.png";
import happyImg from "../assets/happy.png";
import sadImg from "../assets/sad.png";
import surprisedImg from "../assets/surprised.png";
import neutralImg from "../assets/neutral.png";
import disgustImg from "../assets/disgust.png";
import fearImg from "../assets/fear.png";
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
  const [showAiResult, setShowAiResult] = useState(false);
  const [aiResult, setAiResult] = useState(null);
  const resultSectionRef = useRef(null);
  const myJourneyRef = useRef(null);

  const moodImages = {
    "angry": angryImg,
    "happy": happyImg,
    "sad": sadImg,
    "surprised": surprisedImg,
    "neutral": neutralImg,
    "disgust": disgustImg,
    "fear": fearImg,
  };

  const formatDate = (dateString) => {
    if (!dateString) return "Just now";
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return "Just now";
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    return date.toLocaleDateString('id-ID', options);
  };

  const fetchMyJournals = async (userId) => {
    try {
      const response = await axios.get("https://emovision-backend-production.up.railway.app/api/journals");
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
    setStatusMessage({ text: "Analyzing your mood...", type: "" }); 

    try {
      const aiResponse = await axios.post("https://tasyacac05-emovision.hf.space/predict", {
        text: currentJournal,
        with_insight: true 
      });

      let aiData = aiResponse.data;

      const isAiError = aiData.insight && (aiData.insight.includes("[Gemini error") || aiData.insight.includes("503"));
      
      if (isAiError) {
        aiData = {
          ...aiData,
          insight: "Oops, your AI companion needs a quick breather due to high traffic. Please try saving your journal again in a bit!",
          predicted_label: aiData.predicted_label || "neutral",
          confidence: aiData.confidence || 0
        };
      }

      setAiResult(aiData); 

      const journalData = {
        user_id: userData.user_id,
        content: currentJournal,
        mood_result: aiData.predicted_label,
        ai_accuracy_score: aiData.confidence,
        ai_feedback: aiData.insight
      };

      setStatusMessage({ text: "Saving to database...", type: "" });
      const response = await axios.post("https://emovision-backend-production.up.railway.app/api/journals", journalData);
      
      setStatusMessage({ text: "Yeay! Journal saved successfully.", type: "success" });
      setCurrentJournal("");
      setShowAiResult(false); 
      
      if (response.data.data) {
        setJournalsHistory([response.data.data, ...journalsHistory]);
      }
      
      if (response.data.isStreakUpdated) {
        setNewStreakCount(response.data.currentStreak);
        setShowStreakModal(true);
      }

      setTimeout(() => {
        resultSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 500);
      
    } catch (error) {
      console.error("Failed to process journal:", error);
      
      setStatusMessage({ text: "Failed to connect to the server or AI.", type: "error" });
      
      setAiResult({
        insight: "AI system network error. Please try again later!",
        predicted_label: "neutral",
        confidence: 0
      });
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
            <p className="text-3xl text-gray-800 leading-snug">
              How are you feeling today?
            </p>
          </div>

          <div className="bg-white p-8 rounded-[40px] shadow-lg flex flex-col mb-10 min-h-[300px] relative">
            <textarea
              className="w-full flex-1 resize-none outline-none text-xl text-gray-700 placeholder-gray-400 bg-transparent disabled:opacity-50 italic font-medium"
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
                    isLoading ? "bg-gray-400 cursor-not-allowed" : "bg-[#AC87C5] hover:bg-[#9b75b3] hover:scale-105"
                  }`}
                >
                  {isLoading ? "Saving..." : "Save Journal"}
                </button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16" ref={resultSectionRef}>
            <div className="bg-[#D8A7CA] p-8 rounded-[40px] shadow-lg flex flex-col items-center justify-center text-white">
              <div className="w-24 h-24 mb-6">
                <img 
                  src={aiResult && moodImages[aiResult.predicted_label] ? moodImages[aiResult.predicted_label] : neutralImg} 
                  alt="Mood Icon" 
                  className="w-full h-full object-contain drop-shadow-md transition-all duration-500" 
                />
              </div>
              <h3 className="font-bold text-2xl mb-4">Mood Today</h3>
              <div className="flex flex-col gap-2 w-full">
                 {aiResult ? (
                   <>
                     <div className="bg-[#AC87C5] py-2 rounded-full text-center text-sm font-bold">
                       {aiResult.predicted_label} {(aiResult.confidence * 100).toFixed(1)}%
                     </div>
                   </>
                 ) : (
                   <div className="bg-[#AC87C5]/50 py-2 rounded-full text-center text-sm font-bold italic">
                     Write a journal first...
                   </div>
                 )}
              </div>
            </div>

            <div className="bg-[#D8A7CA] p-10 rounded-[40px] shadow-lg text-white md:col-span-2 flex flex-col items-center justify-center min-h-[250px]">
              {!showAiResult ? (
                <div className="text-center">
                  <h3 className="font-bold text-2xl mb-6 tracking-wide">Want some AI insights?</h3>
                  <button 
                    onClick={() => setShowAiResult(true)}
                    disabled={!aiResult} 
                    className={`px-10 py-3 rounded-full font-bold transition-all flex items-center gap-2 mx-auto shadow-md ${
                      !aiResult ? "bg-gray-300 text-gray-500 cursor-not-allowed" : "bg-white text-[#AC87C5] hover:bg-gray-100"
                    }`}
                  >
                    <FiZap /> AI Generate
                  </button>
                </div>
              ) : (
                <div className="animate-fadeIn text-center md:text-left">
                  <h3 className="font-bold text-3xl mb-4 italic border-b-2 border-white/30 inline-block">AI Generate</h3>
                  <p className="text-lg font-medium leading-relaxed italic mt-4">
                    {aiResult?.insight || "Menganalisis..."}
                  </p>
                </div>
              )}
            </div>
          </div>

          <div className="mb-20" ref={myJourneyRef}>
            <h2 className="text-4xl font-bold text-gray-900 mb-8">My Journey</h2>
            
            {journalsHistory.length === 0 ? (
              <p className="text-gray-500 text-xl italic">No journal entries have been written yet. Let’s start writing today!</p>
            ) : (
              <div className="flex flex-col gap-5">
                {journalsHistory.map((item) => (
                  <div key={item.journal_id} className="flex flex-col w-full">
                    <button
                      onClick={() => toggleDropdown(item.journal_id)}
                      className={`p-6 rounded-[25px] shadow-md flex items-center justify-between hover:bg-gray-50 transition-all z-10 ${
                        openId === item.journal_id ? "bg-[#AC87C5] text-white" : "bg-white text-gray-800"
                      }`}
                    >
                      <div className="flex items-center gap-6">
                        <div className={`p-4 rounded-2xl ${openId === item.journal_id ? "bg-white/20" : "bg-[#FDF0F6]"}`}>
                          <FiBookOpen size={28} className={openId === item.journal_id ? "text-white" : "text-[#AC87C5]"} />
                        </div>
                        <span className="text-2xl font-bold">
                          {formatDate(item.created_at)}
                        </span>
                      </div>
                      {openId === item.journal_id ?
                        <FiChevronUp size={35} /> :
                        <FiChevronDown size={35} className="text-[#AC87C5]" />
                      }
                    </button>

                    {openId === item.journal_id && (
                      <div className="bg-[#FDF0F6] mx-4 p-8 rounded-b-[30px] shadow-inner -mt-4 pt-12 animate-fadeIn border-t border-dashed border-[#AC87C5]/30">
                        <p className="text-xl text-gray-800 leading-relaxed font-medium mb-6 italic">
                          "{item.content}"
                        </p>
                        <span className="inline-block bg-[#AC87C5] text-white px-8 py-2 rounded-full text-lg font-bold mb-6">
                          {item.mood_result}
                        </span>

                        <div className="mt-4 p-6 bg-white/60 rounded-3xl border-l-8 border-[#AC87C5] shadow-sm">
                          <h4 className="text-[#AC87C5] font-bold italic mb-2 flex items-center gap-2">
                            <FiZap size={20}/> AI Feedback:
                          </h4>
                          <p className="text-gray-700 italic leading-relaxed font-medium">
                            {item.ai_feedback || "Hasil analisis AI sedang diproses untuk jurnal ini..."}
                          </p>
                        </div>
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
          <div className="bg-white rounded-3xl p-8 max-w-[360px] w-full mx-4 shadow-2xl border border-gray-100 transform scale-100 relative text-center flex flex-col items-center animate-bounce-short">
            <button onClick={() => setShowStreakModal(false)} className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 transition-colors">
              <FiX size={24} />
            </button>
            <div className="w-24 h-24 mb-4 mt-2">
              <img src={streakIcon} alt="Streak Achieved" className="w-full h-full object-contain animate-pulse" />
            </div>
            <h2 className="text-[64px] font-extrabold text-[#2F3640] leading-none mb-1">
              {newStreakCount}
            </h2>
            <p className="text-xl font-bold text-[#4B5563] mb-6">days in a row</p>
            <button onClick={() => setShowStreakModal(false)} className="bg-[#AC87C5] hover:bg-[#9b75b3] text-white w-full py-3.5 rounded-2xl font-bold text-lg shadow-md transition-all">
              Awesome!
            </button>
          </div>
        </div>
      )}
    </div>
  );
}