import React, { useState } from "react";
import { FiChevronRight } from "react-icons/fi";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";

const pastJournals = [
  {
    date: "17 Maret 2026",
    text: "Hari ini benar-benar menguras emosi. Proyek kelompok tidak berjalan sesuai rencana karena ada miskomunikasi, dan rasa.....",
    mood: "Angry",
  },
  {
    date: "16 Maret 2026",
    text: "Pagi ini terasa sangat damai. Aku bangun lebih awal, menyeduh kopi, dan hanya duduk diam melihat cahaya matahari masuk.....",
    mood: "Calm",
  },
  {
    date: "15 Maret 2026",
    text: "Akhirnya fitur Face Detection di proyekku berhasil berjalan lancar setelah berhari-hari debugging! Aku merasa sangat le.....",
    mood: "Happy",
  },
];

export default function Journaling() {
  const [currentJournal, setCurrentJournal] = useState("");

  const handleSave = () => {
    console.log("Jurnal disimpan:", currentJournal);
    setCurrentJournal("");
  };

  return (
    <div className="flex h-screen bg-emo-bg font-fredoka overflow-hidden">
      <Sidebar />

      <div className="flex-1 overflow-y-auto">
        <div className="p-10 max-w-6xl mx-auto min-h-screen">
          
          <div className="mb-8">
            <h1 className="text-5xl font-bold text-gray-900 mb-2">Journaling</h1>
            <p className="text-3xl text-gray-800">How are you feeling today?</p>
          </div>

          <div className="bg-white p-6 rounded-[32px] shadow-md flex flex-col mb-8 relative min-h-[250px]">
            <textarea
              className="w-full flex-1 resize-none outline-none text-lg text-gray-700 placeholder-gray-400 bg-transparent pb-16"
              placeholder="Write Your Heart Out..."
              value={currentJournal}
              onChange={(e) => setCurrentJournal(e.target.value)}
            />
            <div className="absolute bottom-6 right-6">
              <button 
                onClick={handleSave}
                className="bg-[#AC87C5] hover:bg-[#9b75b3] text-white px-6 py-2.5 rounded-full font-medium transition-colors shadow-sm"
              >
                Save Journal
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            
            <div className="bg-[#D8A7CA] p-6 rounded-[32px] shadow-md flex flex-col items-center justify-center text-white h-full">
              <div className="bg-[#FF4D4D] text-white w-20 h-20 rounded-full flex items-center justify-center text-5xl shadow-sm pb-1 mb-4">
                😠
              </div>
              <h3 className="font-bold text-2xl mb-3">Mood Today</h3>
              <div className="bg-[#A482BA] px-5 py-1.5 rounded-full text-sm font-semibold tracking-wide">
                Angry 90%
              </div>
            </div>

            <div className="bg-[#D8A7CA] p-8 rounded-[32px] shadow-md text-white md:col-span-2 h-full flex flex-col justify-center">
              <h3 className="font-bold text-2xl mb-4">AI Generate</h3>
              <p className="text-[15px] font-medium leading-relaxed opacity-95">
                "Sepertinya Anda sedang melewati momen yang cukup menguras emosi hari ini. Tidak apa-apa untuk merasa marah; itu adalah perasaan yang valid. Cobalah untuk mengambil napas dalam sejenak atau tuliskan lebih banyak tentang apa yang membuat Anda merasa seperti ini di menu Journaling untuk melepaskan beban pikiran Anda."
              </p>
            </div>
            
          </div>

          <div className="mb-12">
            <div className="mb-6">
              <h2 className="text-3xl font-bold text-gray-900 mb-1">My Journey</h2>
              <p className="text-xl text-gray-700">Reflecting on your emotional growth</p>
            </div>
            
            <div className="flex flex-col gap-6">
              {pastJournals.map((item, index) => (
                <div key={index} className="bg-white p-6 rounded-3xl shadow-md flex flex-col">
                  <span className="text-gray-400 font-medium text-sm mb-3">
                    {item.date}
                  </span>
                  <p className="text-gray-900 font-medium text-lg leading-relaxed mb-6">
                    {item.text}
                  </p>
                  
                  <div className="flex items-center justify-between mt-auto">
                    <span className="bg-[#AC87C5] text-white px-5 py-1.5 rounded-full text-sm font-semibold tracking-wide">
                      {item.mood}
                    </span>
                    <button className="text-black font-bold text-sm flex items-center hover:text-gray-600 transition-colors group">
                      View Insight 
                      <FiChevronRight 
                        size={18} 
                        strokeWidth={3} 
                        className="ml-1 group-hover:translate-x-1 transition-transform" 
                      />
                    </button>
                  </div>
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