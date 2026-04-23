import React, { useState } from "react";
import { FiChevronRight } from "react-icons/fi";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";

const previousAffirmations = [
  {
    date: "17 Maret 2026",
    text: "Aku layak mendapatkan kedamaian dan momen tenang yang membantuku menemukan titik pusat diriku.",
  },
  {
    date: "16 Maret 2026",
    text: "Kesalahanku tidak menentukan nilai diriku; mereka adalah batu pijakan yang melapisi jalanku menuju pertumbuhan.",
  },
  {
    date: "15 Maret 2026",
    text: "Aku memilih untuk memancarkan energi, gairah, dan cahaya kepada setiap orang yang kutemui.",
  },
];

export default function Affirmation() {
  const [currentAffirmation, setCurrentAffirmation] = useState("");

  const handleSave = () => {
    console.log("Afirmasi disimpan:", currentAffirmation);
    setCurrentAffirmation("");
  };

  return (
    <div className="flex h-screen bg-emo-bg font-fredoka overflow-hidden">
      <Sidebar />

      <div className="flex-1 overflow-y-auto">
        <div className="p-10 max-w-6xl mx-auto min-h-screen">
          
          <div className="mb-8">
            <h1 className="text-5xl font-bold text-gray-900 mb-2">Affirmation</h1>
            <p className="text-3xl text-gray-800">Manifest Your Life</p>
          </div>

          <div className="bg-white p-6 rounded-3xl shadow-md flex flex-col mb-12 relative min-h-[250px]">
            <textarea
              className="w-full flex-1 resize-none outline-none text-lg text-gray-700 placeholder-gray-400 bg-transparent pb-16"
              placeholder="Write your affirmation today..."
              value={currentAffirmation}
              onChange={(e) => setCurrentAffirmation(e.target.value)}
            />
            <div className="absolute bottom-6 right-6">
              <button 
                onClick={handleSave}
                className="bg-[#AC87C5] hover:bg-[#9b75b3] text-white px-6 py-2.5 rounded-full font-medium transition-colors shadow-sm"
              >
                Save Affirmation
              </button>
            </div>
          </div>

          <div className="mb-12">
            <h2 className="text-3xl font-bold mb-6 text-gray-900">Previous Affirmations</h2>
            
            <div className="flex flex-col gap-6">
              {previousAffirmations.map((item, index) => (
                <div key={index} className="bg-white p-6 rounded-3xl shadow-md flex flex-col">
                  <span className="text-gray-400 font-medium text-sm mb-2">
                    {item.date}
                  </span>
                  <p className="text-gray-900 font-medium text-lg leading-relaxed mb-4">
                    {item.text}
                  </p>
                  <div className="flex justify-end mt-auto">
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