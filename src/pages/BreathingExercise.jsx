import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import { FiWind, FiHeart, FiZap, FiMoon } from "react-icons/fi";

export default function BreathingExercise() {
  const [isStarted, setIsStarted] = useState(false);

  const benefits = [
    { icon: <FiHeart />, title: "Reduce Stress", desc: "Menurunkan kadar hormon kortisol dalam tubuh." },
    { icon: <FiZap />, title: "Boost Focus", desc: "Meningkatkan kejernihan pikiran untuk mengambil keputusan." },
    { icon: <FiMoon />, title: "Better Sleep", desc: "Mempersiapkan tubuh untuk istirahat yang lebih berkualitas." },
    { icon: <FiWind />, title: "Emotional Control", desc: "Membantu mengenali dan menenangkan emosi yang meluap." }
  ];

  return (
    <div className="flex h-screen bg-[#F8F4FF] font-fredoka overflow-hidden">
      <Sidebar />

      <div className="flex-1 overflow-y-auto relative">
        <audio autoPlay loop>
          <source src="/assets/meditation-music.mp3" type="audio/mpeg" />
        </audio>

        <div className="p-5 pt-20 md:p-10 max-w-6xl mx-auto min-h-screen flex flex-col items-center">
          
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold text-gray-900 mb-4">Mindful Breathing</h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Sejenak menepi dari kebisingan dunia. Ambil napas dalam, dan temukan ketenangan di dalam dirimu.
            </p>
          </div>

          <div className="relative w-full max-w-4xl flex items-center justify-center mb-16 h-[500px]">
            
            <div className="absolute top-0 left-0 w-32 h-32 opacity-40 animate-bounce">
              <img src="/assets/leaf.png" alt="decor" className="w-full h-full object-contain" />
            </div>
            <div className="absolute bottom-10 right-0 w-40 h-40 opacity-40 animate-pulse">
              <img src="/assets/cloud.png" alt="decor" className="w-full h-full object-contain" />
            </div>

            <div className="bg-white/60 backdrop-blur-xl border border-white p-12 rounded-[50px] shadow-2xl z-10 flex flex-col items-center justify-center w-[400px] h-[400px]">
              
              <div className="relative flex items-center justify-center">
                <div className={`absolute w-32 h-32 bg-[#AC87C5] rounded-full blur-2xl opacity-30 ${isStarted ? 'animate-breath' : ''}`}></div>
                
                <div className={`w-32 h-32 bg-gradient-to-br from-[#AC87C5] to-[#D8A7CA] rounded-full flex items-center justify-center text-white shadow-xl ${isStarted ? 'animate-breath' : ''}`}>
                  <span className="font-bold text-lg">
                    {!isStarted ? "Ready?" : ""}
                  </span>
                </div>
              </div>

              <div className="mt-20 text-center h-10">
                 {isStarted && (
                   <p className="text-[#AC87C5] font-bold text-2xl animate-pulse">
                      Breathe in... Hold... Breathe out...
                   </p>
                 )}
              </div>

              <button 
                onClick={() => setIsStarted(!isStarted)}
                className="mt-8 bg-[#2F3640] text-white px-8 py-3 rounded-full font-bold hover:bg-black transition-all shadow-md"
              >
                {isStarted ? "Stop Session" : "Start Meditating"}
              </button>
            </div>
          </div>

          <div className="w-full">
            <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Kenapa Kamu Butuh Ini?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {benefits.map((benefit, index) => (
                <div key={index} className="bg-white p-6 rounded-3xl shadow-sm border border-purple-50 hover:shadow-md transition-shadow">
                  <div className="text-[#AC87C5] text-3xl mb-4">{benefit.icon}</div>
                  <h4 className="font-bold text-lg mb-2 text-gray-900">{benefit.title}</h4>
                  <p className="text-gray-600 text-sm leading-relaxed">{benefit.desc}</p>
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