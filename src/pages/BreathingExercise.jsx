import React, { useState, useEffect, useRef } from "react";
import meditationAudio from "../assets/meditation-music.mp3";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import { FiWind, FiHeart, FiZap, FiMoon, FiX, FiRefreshCw, FiArrowLeft } from "react-icons/fi";

export default function BreathingExercise() {
  const [isStarted, setIsStarted] = useState(false);
  const audioRef = useRef(null);
  const [phase, setPhase] = useState("Inhale");
  const [timer, setTimer] = useState(4);
  const [isFinished, setIsFinished] = useState(false);
  const [isAnimateActive, setIsAnimateActive] = useState(false);

  useEffect(() => {
    if (isStarted && !isFinished && audioRef.current) {
      audioRef.current.play().catch((err) => console.log("Audio play blocked: ", err));
    } else if (audioRef.current) {
      audioRef.current.pause();
      if (!isStarted) audioRef.current.currentTime = 0; 
    }
  }, [isStarted, isFinished]);

  useEffect(() => {
    let interval = null;
    if (isStarted && !isFinished) {
      if (!isAnimateActive) {
        setTimeout(() => setIsAnimateActive(true), 50);
      }

      interval = setInterval(() => {
        setTimer((prev) => {
          if (prev <= 1) {
            if (phase === "Inhale") {
              setPhase("Hold");
              return 7;
            } else if (phase === "Hold") {
              setPhase("Exhale");
              return 8;
            } else {
              setIsFinished(true);
              setIsAnimateActive(false); 
              return 0;
            }
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isStarted, phase, isFinished, isAnimateActive]);

  const handleClose = () => {
    setIsStarted(false);
    setIsFinished(false);
    setIsAnimateActive(false);
    setPhase("Inhale");
    setTimer(4);
  };

  const handleRepeat = () => {
    setIsFinished(false);
    setIsAnimateActive(false);
    setPhase("Inhale");
    setTimer(4);
  };

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
            <p className="text-3xl text-gray-700">Take a deep breath and find your inner chill</p>
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
            <audio ref={audioRef} loop>
              <source src={meditationAudio} type="audio/mpeg" />
            </audio>
            
            <div className="bg-white rounded-[40px] p-10 max-w-[600px] w-full mx-4 shadow-2xl relative text-center flex flex-col items-center justify-center min-h-[500px] animate-fadeIn">
              
              {!isFinished && (
                <button onClick={handleClose} className="absolute top-6 right-6 text-gray-400 hover:text-gray-700 transition-colors bg-gray-100 rounded-full p-2 z-20">
                  <FiX size={24} />
                </button>
              )}

              <div className="relative flex flex-col items-center justify-center w-full">
                {isFinished ? (
                  <div className="animate-fadeIn">
                    <h2 className="text-3xl font-bold text-gray-800 mb-2">Well Done!</h2>
                    <p className="text-xl text-gray-500 mb-10">Wanna go again?</p>
                    <div className="flex gap-4 justify-center">
                      <button onClick={handleRepeat} className="flex items-center gap-2 bg-[#AC87C5] text-white px-8 py-3 rounded-full font-bold hover:bg-[#9572ac] transition-all">
                        <FiRefreshCw /> Yes
                      </button>
                      <button onClick={handleClose} className="flex items-center gap-2 bg-gray-100 text-gray-600 px-8 py-3 rounded-full font-bold hover:bg-gray-200 transition-all">
                        <FiArrowLeft /> No
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center w-full">
                    <div className="relative flex items-center justify-center w-64 h-64 mb-16">
                      <div 
                        className="absolute bg-[#D8A7CA] rounded-full blur-3xl opacity-30 transition-all ease-in-out"
                        style={{ 
                          transitionDuration: phase === 'Inhale' ? '4000ms' : phase === 'Hold' ? '0ms' : '8000ms',
                          width: (phase === 'Inhale' && isAnimateActive) || phase === 'Hold' ? '120%' : '75%',
                          height: (phase === 'Inhale' && isAnimateActive) || phase === 'Hold' ? '120%' : '75%' 
                        }}
                      ></div>

                      <div 
                        className="bg-gradient-to-br from-[#AC87C5] to-[#D8A7CA] rounded-full shadow-2xl flex items-center justify-center text-white transition-all ease-in-out"
                        style={{ 
                          transitionDuration: phase === 'Inhale' ? '4000ms' : phase === 'Hold' ? '0ms' : '8000ms',
                          width: (phase === 'Inhale' && isAnimateActive) || phase === 'Hold' ? '100%' : '65%',
                          height: (phase === 'Inhale' && isAnimateActive) || phase === 'Hold' ? '100%' : '65%'
                        }}
                      >
                        <span className="font-extrabold text-3xl tracking-widest uppercase">{phase}</span>
                      </div>
                    </div>

                    <div className="flex flex-col items-center">
                      <div className="text-6xl font-bold text-[#AC87C5] mb-2">{timer}</div>
                      <p className="text-gray-400 font-medium tracking-[0.3em] uppercase">Seconds Left</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}