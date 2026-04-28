import React, { useState } from "react";
import { FiChevronDown, FiChevronUp, FiBookOpen } from "react-icons/fi";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import angryImg from "../assets/angry.png";

const pastJournalsData = [
  {
    id: 1,
    date: "17 Maret 2026",
    text: "Hari ini benar-benar menguras emosi. Proyek kelompok tidak berjalan sesuai rencana karena ada miskomunikasi, dan rasanya aku harus mengerjakan semuanya sendirian lagi. Aku merasa tidak dihargai dan sangat lelah dengan situasi ini.",
    mood: "Angry",
  },
  {
    id: 2,
    date: "16 Maret 2026",
    text: "Pagi ini terasa sangat damai. Aku bangun lebih awal, menyeduh kopi, dan hanya duduk diam melihat cahaya matahari masuk lewat jendela.",
    mood: "Calm",
  },
];

export default function Journaling() {
  const [currentJournal, setCurrentJournal] = useState("");
  const [openId, setOpenId] = useState(null);
  
  const [isLoading, setIsLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState({ text: "", type: "" });

  const handleSave = async () => {
    if (!currentJournal.trim()) {
      setStatusMessage({ text: "Jurnal tidak boleh kosong!", type: "error" });
      setTimeout(() => setStatusMessage({ text: "", type: "" }), 3000);
      return;
    }

    setIsLoading(true);
    setStatusMessage({ text: "", type: "" });

    const journalData = {
      user_id: "808caf48-99f0-4e83-9dd1-d76d1b590c16", 
      content: currentJournal,
      mood_result: "Neutral", 
      ai_accuracy_score: 0.85, 
      ai_feedback: "Fitur deteksi sedang diproses..." 
    };

    try {
      const response = await axios.post("http://localhost:5000/api/journals", journalData);
      
      console.log("Berhasil disimpan di Database:", response.data);
      setStatusMessage({ text: "Yeay! Jurnal berhasil disimpan.", type: "success" });
      setCurrentJournal("");
      
    } catch (error) {
      console.error("Gagal menyimpan:", error);
      setStatusMessage({ text: "Gagal terhubung ke server.", type: "error" });
    } finally {
      setIsLoading(false);
      setTimeout(() => setStatusMessage({ text: "", type: "" }), 3000);
    }
  };

  const toggleDropdown = (id) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <div className="flex h-screen bg-emo-bg font-fredoka overflow-hidden">
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
                <img 
                  src={angryImg} 
                  alt="Angry Mood" 
                  className="w-full h-full object-contain drop-shadow-md" 
                />
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
            
            <div className="flex flex-col gap-5">
              {pastJournalsData.map((item) => (
                <div key={item.id} className="flex flex-col w-full">
                  <button 
                    onClick={() => toggleDropdown(item.id)}
                    className="bg-white p-6 rounded-[25px] shadow-md flex items-center justify-between hover:bg-gray-50 transition-all z-10"
                  >
                    <div className="flex items-center gap-6">
                      <div className="bg-[#AC87C5] p-4 rounded-2xl text-white">
                        <FiBookOpen size={28} />
                      </div>
                      <span className="text-2xl font-bold text-gray-800">{item.date}</span>
                    </div>
                    {openId === item.id ? 
                      <FiChevronUp size={35} className="text-[#AC87C5]" /> : 
                      <FiChevronDown size={35} className="text-[#AC87C5]" />
                    }
                  </button>

                  {openId === item.id && (
                    <div className="bg-[#FDF0F6] mx-4 p-8 rounded-b-[30px] shadow-inner -mt-4 pt-12 animate-fadeIn transition-all">
                      <p className="text-xl text-gray-800 leading-relaxed font-medium mb-6">
                        {item.text}
                      </p>
                      <span className="inline-block bg-[#AC87C5] text-white px-8 py-2 rounded-full text-lg font-bold">
                        {item.mood}
                      </span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

        </div>
        <Footer />
      </div>
    </div>
  );
}