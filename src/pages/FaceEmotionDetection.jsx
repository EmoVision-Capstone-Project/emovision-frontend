import React, { useRef, useState, useCallback } from "react";
import Webcam from "react-webcam";
import { FiCamera } from "react-icons/fi";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import happyImg from "../assets/happy.png";
import angryImg from "../assets/angry.png";
import fearImg from "../assets/fear.png";
import disgustImg from "../assets/disgust.png";
import surprisedImg from "../assets/surprised.png";
import neutralImg from "../assets/neutral.png";
import sadImg from "../assets/sad.png";

const EmotionProgressBar = ({ label, percentage }) => (
  <div className="mb-4">
    <div className="flex justify-between mb-1">
      <span className="font-bold text-gray-900 text-[15px]">{label}</span>
      <span className="font-bold text-gray-900 text-[15px]">{percentage}%</span>
    </div>
    <div className="w-full bg-gray-300 rounded-full h-3.5">
      <div
        className="bg-[#D8A7CA] h-3.5 rounded-full"
        style={{ width: `${percentage}%` }}
      ></div>
    </div>
  </div>
);

export default function FaceEmotionDetection() {
  const webcamRef = useRef(null);
  const [primaryEmotion, setPrimaryEmotion] = useState("Angry");

  const moodImages = {
    Happy: happyImg,
    Angry: angryImg,
    Fear: fearImg,
    Disgust: disgustImg,
    Surprised: surprisedImg,
    Neutral: neutralImg,
    Sad: sadImg,
  };

  const captureAndAnalyze = useCallback(() => {
    if (!webcamRef.current) return;
    const imageSrc = webcamRef.current.getScreenshot();
    console.log("Gambar berhasil ditangkap!", imageSrc);
  }, [webcamRef]);

  return (
    <div className="flex h-screen bg-emo-bg font-fredoka overflow-hidden">
      <Sidebar />

      <div className="flex-1 overflow-y-auto">
        <div className="p-5 pt-20 md:p-10 max-w-6xl mx-auto min-h-screen">
          
          <div className="mb-10">
            <h1 className="text-5xl font-bold text-gray-900 mb-3">Face Mood Detection</h1>
            <p className="text-3xl text-gray-800 leading-snug">
              Let our AI translate your expressions into meaningful insights for emotional clarity.
            </p>
          </div>

          <div className="flex flex-col lg:flex-row gap-10 items-start">
            
            <div className="flex-1 flex flex-col items-center w-full">
              <div className="w-full h-[400px] bg-black rounded-[32px] relative overflow-hidden mb-6 shadow-md">
                <Webcam
                  audio={false}
                  ref={webcamRef}
                  screenshotFormat="image/jpeg"
                  className="w-full h-full object-cover"
                  mirrored={true} 
                />
              </div>

              <button 
                onClick={captureAndAnalyze}
                className="bg-[#AC87C5] hover:bg-[#9b75b3] text-white px-12 py-3.5 rounded-full font-bold text-lg transition-colors shadow-sm"
              >
                Analyze Emotion
              </button>
            </div>

            <div className="w-full lg:w-[450px] bg-white p-8 rounded-[32px] shadow-lg">
              
              <div className="flex items-center gap-4 mb-5">
                <div className="w-20 h-20 flex-shrink-0">
                  <img 
                    src={moodImages[primaryEmotion]} 
                    alt={primaryEmotion} 
                    className="w-full h-full object-contain" 
                  />
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">
                    PRIMARY EMOTION
                  </p>
                  <h2 className="text-4xl font-black text-gray-900 leading-none">
                    {primaryEmotion}
                  </h2>
                </div>
              </div>

              <p className="text-[14px] text-gray-700 leading-relaxed mb-8 font-medium">
                The webcam feature identifies “{primaryEmotion}” as the dominant emotion with a high degree of confidence, as indicated by forehead wrinkles or pursed lips during live detection.
              </p>

              <div className="flex flex-col gap-2">
                <EmotionProgressBar label="Angry" percentage={92} />
                <EmotionProgressBar label="Neutral" percentage={22} />
                <EmotionProgressBar label="Depressed" percentage={12} />
              </div>

            </div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}