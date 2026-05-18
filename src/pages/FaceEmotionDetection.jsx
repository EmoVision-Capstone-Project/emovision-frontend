import React, { useRef, useState, useCallback } from "react";
import Webcam from "react-webcam";
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
        className="bg-[#D8A7CA] h-3.5 rounded-full transition-all duration-500 ease-out"
        style={{ width: `${percentage}%` }}
      ></div>
    </div>
  </div>
);

export default function FaceEmotionDetection() {
  const webcamRef = useRef(null);
  
  const [primaryEmotion, setPrimaryEmotion] = useState("Neutral");
  const [probabilities, setProbabilities] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  
  const [capturedImage, setCapturedImage] = useState(null);

  const moodImages = {
    Happy: happyImg,
    Angry: angryImg,
    Fear: fearImg,
    Disgust: disgustImg,
    Surprise: surprisedImg,
    Neutral: neutralImg,
    Sad: sadImg,
  };

  const captureAndAnalyze = useCallback(async () => {
    if (!webcamRef.current) return;
    
    const imageSrc = webcamRef.current.getScreenshot();
    if (!imageSrc) return;

    setCapturedImage(imageSrc);
    setIsLoading(true);

    try {
      const res = await fetch(imageSrc);
      const blob = await res.blob();

      const formData = new FormData();
      formData.append("file", blob, "webcam_capture.jpg");

      const response = await fetch("https://fadidinna-emovision-api.hf.space/api/face/predict", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        setPrimaryEmotion(data.emotion);
        setProbabilities(data.probabilities);
      } else {
        alert("Error: " + (data.error || "Wajah tidak terdeteksi"));
        setCapturedImage(null); 
      }
    } catch (error) {
      console.error("Gagal terhubung ke API:", error);
      alert("Gagal terhubung ke server backend! Pastikan uvicorn sedang jalan.");
      setCapturedImage(null); 
    } finally {
      setIsLoading(false);
    }
  }, [webcamRef]);

  const retakePhoto = () => {
    setCapturedImage(null);
    setPrimaryEmotion("Neutral");
    setProbabilities({});
  };

  return (
    <div className="flex h-screen bg-emo-bg font-fredoka overflow-hidden">
      <Sidebar />

      <div className="flex-1 overflow-y-auto">
        <div className="p-5 pt-20 md:p-10 max-w-6xl mx-auto min-h-screen">
          
          <div className="mb-10">
            <h1 className="text-5xl font-bold text-gray-900 mb-3">Face Mood Detection</h1>
            <p className="text-3xl text-gray-800 leading-snug">
              Position your face inside the box and let our AI analyze your emotion.
            </p>
          </div>

          <div className="flex flex-col lg:flex-row gap-10 items-start">
            
            <div className="flex-1 flex flex-col items-center w-full">
              <div className="w-full h-[400px] bg-black rounded-[32px] relative overflow-hidden mb-6 shadow-md flex items-center justify-center">
                
                {!capturedImage ? (
                  <>
                    <Webcam
                      audio={false}
                      ref={webcamRef}
                      screenshotFormat="image/jpeg"
                      className="w-full h-full object-cover"
                      mirrored={true} 
                    />
                    <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none gap-6">
                      <div className="w-48 h-64 border-4 border-dashed border-white/60 rounded-3xl shadow-[0_0_0_9999px_rgba(0,0,0,0.3)]"></div>
                      
                      <div className="bg-black/40 backdrop-blur-md border border-white/40 px-6 py-2.5 rounded-full shadow-lg">
                        <p className="text-white text-sm font-semibold tracking-wide">
                          Keep your face in the frame, please!
                        </p>
                      </div>
                    </div>
                  </>
                ) : (
                  <img 
                    src={capturedImage} 
                    alt="Captured" 
                    className="w-full h-full object-cover" 
                    style={{ transform: "scaleX(-1)" }} 
                  />
                )}
              </div>

              {!capturedImage ? (
                <button 
                  onClick={captureAndAnalyze}
                  disabled={isLoading}
                  className={`text-white px-12 py-3.5 rounded-full font-bold text-lg transition-colors shadow-sm
                    ${isLoading ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#AC87C5] hover:bg-[#9b75b3]'}`}
                >
                  {isLoading ? "Analyzing..." : "Capture & Analyze"}
                </button>
              ) : (
                <button 
                  onClick={retakePhoto}
                  className="bg-gray-600 hover:bg-gray-700 text-white px-12 py-3.5 rounded-full font-bold text-lg transition-colors shadow-sm"
                >
                  Retake Photo
                </button>
              )}
            </div>

            <div className="w-full lg:w-[450px] bg-white p-8 rounded-[32px] shadow-lg">
              
              <div className="flex items-center gap-4 mb-5">
                <div className="w-20 h-20 flex-shrink-0">
                  <img 
                    src={moodImages[primaryEmotion] || moodImages["Neutral"]} 
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
                {capturedImage 
                  ? `The AI identified "${primaryEmotion}" as the dominant emotion from your captured expression.`
                  : "Waiting for capture... Position your face in the frame and click the button to analyze."
                }
              </p>

              <div className="flex flex-col gap-2">
                {Object.keys(probabilities).length > 0 ? (
                  Object.entries(probabilities)
                    .sort((a, b) => b[1] - a[1])
                    .slice(0, 3) 
                    .map(([label, percentage]) => (
                      <EmotionProgressBar 
                        key={label} 
                        label={label} 
                        percentage={percentage.toFixed(1)} 
                      />
                    ))
                ) : (
                  <>
                    <EmotionProgressBar label="Neutral" percentage={0} />
                    <EmotionProgressBar label="Happy" percentage={0} />
                    <EmotionProgressBar label="Sad" percentage={0} />
                  </>
                )}
              </div>

            </div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}