import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import { FiWind, FiHeart, FiZap, FiMoon, FiX } from "react-icons/fi";

export default function BreathingExercise() {
  const [isStarted, setIsStarted] = useState(false);

  const benefits = [
    { icon: <FiHeart />, title: "Reduce Stress", desc: "Lowering those cortisol levels in your system." },
    { icon: <FiZap />, title: "Boost Focus", desc: "Sharpening your mind so you can make better calls." },
    { icon: <FiMoon />, title: "Better Sleep", desc: "Prepping your body for some high-quality rest." },
    { icon: <FiWind />, title: "Emotional Control", desc: "Helping you spot and chill out those overwhelming emotions." }
  ];

  return (
    <div className="flex h-screen bg-emo-bg font-fredoka overflow-hidden">
      <Sidebar />

      <div className="flex-1 overflow-y-auto relative flex flex-col">
        <div className="p-5 pt-20 md:p-10 max-w-6xl mx-auto w-full flex-grow flex flex-col">
          
          <div className="w-full mb-8">
            <h1 className="text-5xl font-bold text-gray-900 mb-2 tracking-tight">Mindful Breathing</h1>
            <p className="text-3xl text-gray-700">
              Take a deep breath and find your inner chill
            </p>
          </div>

          <div className="w-full bg-[#FAEDFE] p-8 md:p-10 rounded-[40px] mb-8">
            <h2 className="text-3xl font-bold text-[#1A202C] mb-8 text-center">Why you're gonna love this?</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {benefits.map((benefit, index) => (
                <div key={index} className="bg-white p-6 rounded-3xl shadow-sm hover:shadow-md transition-all h-full flex flex-col">
                  <div className="text-[#AC87C5] text-3xl mb-3">{benefit.icon}</div>
                  <h4 className="font-bold text-lg mb-2 text-gray-900 leading-tight">{benefit.title}</h4>
                  <p className="text-gray-500 text-sm leading-relaxed">{benefit.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <button 
            onClick={() => setIsStarted(true)}
            className="self-center bg-[#C384C4] hover:bg-[#a96da9] text-white px-16 py-4 rounded-full font-bold text-xl shadow-lg transition-transform hover:scale-105"
          >
            Start Meditating
          </button>

        </div>
        <Footer />

        {isStarted && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm transition-all duration-300">
            
            <audio autoPlay loop>
              <source src="/assets/meditation-music.mp3" type="audio/mpeg" />
            </audio>

            <div className="bg-white rounded-[40px] p-10 max-w-[600px] w-full mx-4 shadow-2xl relative text-center flex flex-col items-center justify-center min-h-[450px] animate-fadeIn">
              
              <button 
                onClick={() => setIsStarted(false)} 
                className="absolute top-6 right-6 text-gray-400 hover:text-gray-700 transition-colors bg-gray-100 rounded-full p-2"
              >
                <FiX size={24} />
              </button>

              <div className="relative flex flex-col items-center justify-center w-full mt-4">
                
                <div className="relative flex items-center justify-center w-48 h-48 mb-12">
                  <div className="absolute w-full h-full bg-[#D8A7CA] rounded-full blur-2xl opacity-40 animate-breath"></div>
                  <div className="w-32 h-32 bg-gradient-to-br from-[#AC87C5] to-[#D8A7CA] rounded-full shadow-inner animate-breath flex items-center justify-center">
                    <span className="text-white font-bold text-xl">Breathe</span>
                  </div>
                </div>

                <h3 className="text-2xl font-bold text-[#AC87C5] tracking-widest animate-pulse uppercase">
                  Inhale... Hold... Exhale...
                </h3>
              </div>

            </div>
          </div>
        )}

      </div>
    </div>
  );
}