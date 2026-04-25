import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";

const previousAffirmations = [
  {
    date: "17 Maret 2026",
    text: "Aku layak mendapatkan kedamaian dan momen tenang yang membantuku menemukan titik pusat diriku.",
  },
  {
    date: "16 Maret 2026",
    text: "Kesalahanku tidak menentukan nilai diriku; mereka adalah batu pijakan yang melapisi jalanku menuju pertumbuhan. Aku belajar bahwa setiap tantangan adalah bagian dari proses menjadi lebih baik.",
  },
  {
    date: "15 Maret 2026",
    text: "Aku memilih untuk memancarkan cahaya.",
  },
  {
    date: "14 Maret 2026",
    text: "Hari ini aku bersyukur atas kesehatan dan kesempatan untuk belajar hal-hal baru di kampus bersama teman-teman.",
  },
  {
    date: "13 Maret 2026",
    text: "Semesta mendukungku.",
  },
  {
    date: "12 Maret 2026",
    text: "Aku percaya pada kemampuanku untuk menyelesaikan tugas-tugas sulit satu per satu dengan sabar.",
  },
];

export default function Affirmation() {
  const [currentAffirmation, setCurrentAffirmation] = useState("");

  const handleSave = () => {
    console.log("Afirmasi disimpan:", currentAffirmation);
    setCurrentAffirmation("");
  };

  const handleInput = (e) => {
    const element = e.target;
    setCurrentAffirmation(element.value);
    
    element.style.height = "auto";
    element.style.height = `${element.scrollHeight}px`;
  };

  const sortedAffirmations = [...previousAffirmations].sort((a, b) => {
    return new Date(b.date) - new Date(a.date);
  });

  return (
    <div className="flex h-screen bg-emo-bg font-fredoka overflow-hidden">
      <Sidebar />

      <div className="flex-1 overflow-y-auto">
        <div className="p-10 max-w-6xl mx-auto min-h-screen">
          
          <div className="mb-10">
            <h1 className="text-5xl font-bold text-gray-900 mb-3">Affirmation</h1>
            <p className="text-3xl text-gray-800 leading-snug">
              Speak kindness to yourself and watch your world transform.
            </p>
          </div>

          <div className="bg-white p-8 rounded-[40px] shadow-lg flex flex-col mb-12">
            <textarea
              className="w-full resize-none outline-none text-2xl text-gray-700 placeholder-gray-400 bg-transparent overflow-hidden min-h-[120px]"
              placeholder="Type your daily affirmation here..."
              value={currentAffirmation}
              onInput={handleInput}
              rows={1}
            />
            <div className="flex justify-end mt-4">
              <button 
                onClick={handleSave}
                className="bg-[#AC87C5] hover:bg-[#9b75b3] text-white px-12 py-3 rounded-full font-bold text-lg transition-all shadow-md active:scale-95"
              >
                Save Affirmation
              </button>
            </div>
          </div>

          <div className="mb-20">
            <h2 className="text-4xl font-bold text-gray-900 mb-8">Previous Affirmations</h2>
            
            <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
              {sortedAffirmations.map((item, index) => (
                <div 
                  key={index} 
                  className="break-inside-avoid bg-white p-8 rounded-[35px] shadow-md flex flex-col border border-transparent hover:border-[#AC87C5]/20 transition-all"
                >
                  <span className="text-gray-400 font-bold text-sm mb-4 uppercase tracking-wider">
                    {item.date}
                  </span>
                  <p className="text-gray-800 font-medium text-xl italic leading-relaxed">
                    "{item.text}"
                  </p>
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