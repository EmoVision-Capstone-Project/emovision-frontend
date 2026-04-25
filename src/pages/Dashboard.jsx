import { useState } from "react";
import { Link } from "react-router-dom";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import streakIcon from "../assets/streak-icon.png";
import happyImg from "../assets/happy.png";
import angryImg from "../assets/angry.png";
import fearImg from "../assets/fear.png";
import disgustImg from "../assets/disgust.png";
import surprisedImg from "../assets/surprised.png";
import neutralImg from "../assets/neutral.png";
import sadImg from "../assets/sad.png";
import quoteImg1 from "../assets/quote1.jpg";
import quoteImg2 from "../assets/quote2.jpg";
import quoteImg3 from "../assets/quote3.jpg";

const moodLabelsY = {
  7: 'Angry', 6: 'Happy', 5: 'Sad', 4: 'Disgust',
  3: 'Fear', 2: 'Neutral', 1: 'Surprised'
};

const monthNames = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

export default function Dashboard() {
  const username = "Zila";
  const [currentMood, setCurrentMood] = useState("Happy");
  const [currentDate, setCurrentDate] = useState(new Date());

  const moodImages = {
    Happy: happyImg, Angry: angryImg, Fear: fearImg,
    Disgust: disgustImg, Surprised: surprisedImg, Neutral: neutralImg, Sad: sadImg,
  };

  const changeMonth = (direction) => {
    setCurrentDate(prevDate => {
      const newDate = new Date(prevDate);
      newDate.setMonth(prevDate.getMonth() + direction);
      return newDate;
    });
  };

  const quotesData = [
    { image: quoteImg1, text: "You are your own little plant, water yourself, speak to yourself nicely and bloom." },
    { image: quoteImg2, text: "If it doesn't happen the way you wanted, it will happen in a better way than you can imagine." },
    { image: quoteImg3, text: "Darkness cannot drive out darkness: only light can do that." }
  ];

  const weeklyData = [
    { name: 'Week 1', moodValue: 2 },
    { name: 'Week 2', moodValue: 6 },
    { name: 'Week 3', moodValue: 4 },
    { name: 'Week 4', moodValue: 7 },
  ];

  return (
    <div className="flex h-screen bg-emo-bg font-fredoka overflow-hidden">
      <Sidebar />
      <div className="flex-1 overflow-y-auto">
        <div className="p-10 max-w-6xl mx-auto min-h-screen">
          <div className="mb-8">
            <h1 className="text-5xl font-bold text-gray-900 mb-2">Dashboard</h1>
            <p className="text-3xl text-gray-800">Welcome, {username}!</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="bg-white p-6 rounded-3xl shadow-lg flex flex-col items-center justify-center text-center">
              <h3 className="font-bold text-xl mb-4">Mood Today</h3>
              <div className="h-24 w-24 mb-2">
                <img src={moodImages[currentMood]} alt={currentMood} className="w-full h-full object-contain" />
              </div>
              <p className="font-bold text-lg text-gray-800">{currentMood}</p>
            </div>

            <div className="bg-white p-6 rounded-3xl shadow-lg flex flex-col items-center justify-center text-center">
              <h3 className="font-bold text-xl mb-4">Streak</h3>
              <img src={streakIcon} alt="Streak" className="h-16 mb-2 object-contain" />
              <p className="font-bold text-lg text-gray-800">7 Days</p>
            </div>

            <Link to="/journaling" className="bg-white p-6 rounded-3xl shadow-lg flex flex-col items-center justify-center text-center hover:scale-105 transition-all">
              <h3 className="font-bold text-xl mb-4 text-emo-primary">Gentle Reminder</h3>
              <p className="font-medium text-gray-700">Don't forget fill your journal today!!</p>
            </Link>
          </div>

          <div className="bg-white p-10 rounded-[40px] shadow-lg mb-12">
            <h2 className="text-center text-3xl font-bold mb-8">Graphic Mood</h2>
            <div className="h-80 w-full mb-6">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={weeklyData} margin={{ bottom: 20, left: 10, right: 10 }}>
                  <defs>
                    <linearGradient id="colorMood" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#FF69B4" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#FF69B4" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eee" />
                  
                  <XAxis 
                    dataKey="name" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{fill: '#999', fontSize: 14}} 
                    dy={15} 
                  />
                  
                  <YAxis 
                    domain={[1, 7]} 
                    ticks={[1, 2, 3, 4, 5, 6, 7]} 
                    tickFormatter={(tick) => moodLabelsY[tick]} 
                    axisLine={false} 
                    tickLine={false} 
                    width={110}
                    tick={{fill: '#333', fontSize: 14}}
                    dx={-10} 
                  />
                  <Tooltip />
                  <Area type="monotone" dataKey="moodValue" stroke="#FF69B4" strokeWidth={4} fillOpacity={1} fill="url(#colorMood)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            
            <div className="flex items-center justify-center gap-6 border-t pt-8">
              <button onClick={() => changeMonth(-1)}><FiChevronLeft size={30} className="text-emo-primary"/></button>
              <span className="text-2xl font-bold text-emo-secondary uppercase tracking-widest">
                {monthNames[currentDate.getMonth()]}
              </span>
              <button onClick={() => changeMonth(1)}><FiChevronRight size={30} className="text-emo-primary"/></button>
            </div>
          </div>

          <div className="mb-12">
            <h2 className="text-3xl font-bold mb-2">Positive Quotes</h2>
            <div className="flex flex-col gap-8 mt-8">
              {quotesData.map((quote, index) => (
                <div key={index} className="bg-white p-8 rounded-[35px] shadow-md flex flex-col md:flex-row items-center gap-10">
                  <div className="w-full md:w-64 aspect-video flex-shrink-0 overflow-hidden rounded-[25px] shadow-sm">
                    <img src={quote.image} className="w-full h-full object-cover" alt="Quote Illustration" />
                  </div>
                  <p className="flex-1 text-xl italic text-gray-700 leading-relaxed">
                    "{quote.text}"
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