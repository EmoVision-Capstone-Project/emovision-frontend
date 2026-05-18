import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiChevronLeft, FiChevronRight, FiEdit3 } from "react-icons/fi";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import axios from "axios";
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
  7: 'Happy', 6: 'Surprised', 5: 'Neutral', 4: 'Sad',
  3: 'Fear', 2: 'Disgust', 1: 'Angry'
};

const monthNames = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const quotesData = [
  {
    image: quoteImg1,
    text: "You are your own little plant, water yourself, speak to yourself nicely and bloom."
  },
  {
    image: quoteImg2,
    text: "If it doesn't happen the way you wanted, it will happen in a better way daripada can imagine."
  },
  {
    image: quoteImg3,
    text: "Darkness cannot drive out darkness: only light can do that."
  }
];

export default function Dashboard() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null); 
  const [currentMood, setCurrentMood] = useState("Neutral");
  const [currentDate, setCurrentDate] = useState(new Date());
  const [userStreak, setUserStreak] = useState(0);
  const [weeklyChartData, setWeeklyChartData] = useState([]);

  const API_BASE_URL = "https://emovision-backend-production.up.railway.app/api";

  const moodImages = {
    Happy: happyImg, Angry: angryImg, Fear: fearImg,
    Disgust: disgustImg, Surprised: surprisedImg, Neutral: neutralImg, Sad: sadImg,
  };

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    
    if (!storedUser) {
      navigate("/login");
      return;
    }

    const parsedUser = JSON.parse(storedUser);
    setUserData(parsedUser);
    
    const fetchBasicData = async () => {
      try {
        const streakRes = await axios.get(`${API_BASE_URL}/journals/stats/${parsedUser.user_id}`);
        if (streakRes.data && streakRes.data.data) {
          setUserStreak(streakRes.data.data.current_streak || 0);
        }
      } catch (error) {
        console.error("Gagal mengambil data streak:", error);
      }

      try {
        const journalRes = await axios.get(`${API_BASE_URL}/journals`);
        if (journalRes.data && Array.isArray(journalRes.data.data)) {
          const myJournals = journalRes.data.data.filter(j => j.user_id === parsedUser.user_id);
          
          if (myJournals.length > 0) {
            const sortedJournals = myJournals.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
            const latestMood = sortedJournals[0].mood_result || "Neutral";
            const formattedMood = latestMood.charAt(0).toUpperCase() + latestMood.slice(1).toLowerCase();
            setCurrentMood(formattedMood);
          }
        }
      } catch (error) {
        console.error("Gagal mengambil data mood dari jurnal:", error);
      }
    };

    fetchBasicData();
  }, [navigate]);

  useEffect(() => {
    if (!userData) return;

    const fetchChartData = async () => {
      const month = currentDate.getMonth() + 1; 
      const year = currentDate.getFullYear();
      
      try {
        const response = await axios.get(`${API_BASE_URL}/journals/stats/weekly/${userData.user_id}?month=${month}&year=${year}`);
        
        if (response.data && response.data.status === "success" && response.data.data.length > 0) {
          setWeeklyChartData(response.data.data);
        } else {
          setWeeklyChartData([]);
        }
      } catch (error) {
        console.error("Gagal mengambil data grafik mingguan:", error);
        setWeeklyChartData([]); 
      }
    };

    fetchChartData();
  }, [currentDate, userData]);

  const changeMonth = (direction) => {
    setCurrentDate(prevDate => {
      const newDate = new Date(prevDate);
      newDate.setMonth(prevDate.getMonth() + direction);
      return newDate;
    });
  };

  const currentMonthName = monthNames[currentDate.getMonth()];
  const currentYear = currentDate.getFullYear();

  const displayFirstName = userData?.full_name ? userData.full_name.split(' ')[0] : 'User';

  return (
    <div className="flex h-screen bg-emo-bg font-fredoka overflow-hidden">
      <Sidebar />

      <div className="flex-1 h-screen overflow-y-auto flex flex-col relative">
        <div className="p-5 pt-20 md:p-10 max-w-6xl mx-auto w-full flex-grow">
          
          <div className="mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">Dashboard</h1>
            <p className="text-2xl md:text-3xl text-gray-800">Welcome, {displayFirstName}!</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="bg-white p-6 rounded-3xl shadow-lg flex flex-col items-center justify-center text-center">
              <h3 className="font-bold text-xl mb-4">Mood Today</h3>
              <div className="h-24 w-24 mb-2">
                <img src={moodImages[currentMood] || neutralImg} alt={currentMood} className="w-full h-full object-contain" />
              </div>
              <p className="font-bold text-lg text-gray-800">{currentMood}</p>
            </div>

            <div className="bg-white p-6 rounded-3xl shadow-lg flex flex-col items-center justify-center text-center">
              <h3 className="font-bold text-xl mb-4">Streak</h3>
              <img src={streakIcon} alt="Streak" className="h-16 mb-2 object-contain" />
                <p className="font-bold text-lg text-gray-800">{userStreak} Days</p>
            </div>

            <Link to="/journaling" className="bg-white p-6 rounded-3xl shadow-lg flex flex-col items-center justify-center text-center hover:scale-105 transition-transform duration-300 group">
              <h3 className="font-bold text-xl mb-2 text-emo-primary">Gentle Reminder</h3>
              <div className="h-14 flex items-center justify-center mb-3 text-[#AC87C5] group-hover:scale-110 group-hover:-rotate-12 transition-transform duration-300">
                <FiEdit3 size={40} />
              </div>
              <p className="font-medium text-gray-700 mb-4 leading-tight">Don't forget to fill your journal today!!</p>
              <div className="bg-[#AC87C5] text-white px-6 py-2 rounded-full font-bold text-sm shadow-sm group-hover:bg-[#9b75b3] transition-colors flex items-center gap-2">
                Click Here <FiChevronRight size={16} />
              </div>
            </Link>
          </div>

          <div className="bg-white p-6 md:p-10 rounded-[30px] md:rounded-[40px] shadow-lg mb-12 relative z-10">
            <h2 className="text-center text-2xl md:text-3xl font-bold mb-8 text-gray-800">Graphic Mood</h2>
            
            <div className="w-full h-[300px] md:h-[400px] mb-8">
              {weeklyChartData.length === 0 ? (
                <div className="flex items-center justify-center h-full w-full bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200">
                  <p className="text-gray-400 font-medium italic text-lg">Belum ada data jurnal untuk bulan ini.</p>
                </div>
              ) : (
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={weeklyChartData} margin={{ top: 10, right: 30, left: -10, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorMood" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#AC87C5" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#AC87C5" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#EEEEEE" />
                    <XAxis 
                      dataKey="name" 
                      tick={{ fill: '#AC87C5', fontWeight: 'bold', fontSize: 12 }} 
                      axisLine={{ stroke: '#AC87C5', strokeWidth: 2 }}
                      tickLine={false}
                      interval={0} 
                      padding={{ left: 10, right: 10 }} 
                    />
                    <YAxis 
                      domain={[1, 7]} 
                      ticks={[1, 2, 3, 4, 5, 6, 7]} 
                      tickFormatter={(tick) => moodLabelsY[tick]} 
                      tick={{ fill: '#374151', fontSize: 12, fontWeight: 600 }}
                      axisLine={false}
                      tickLine={false}
                      width={70} 
                    />
                    <Tooltip formatter={(value) => [moodLabelsY[value], "Mood"]} />
                    <Area 
                      type="linear" 
                      dataKey="moodValue" 
                      stroke="#AC87C5" 
                      strokeWidth={4} 
                      fillOpacity={1} 
                      fill="url(#colorMood)" 
                      dot={{ stroke: '#AC87C5', strokeWidth: 2, r: 4, fill: 'white' }}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              )}
            </div>

            <div className="flex items-center justify-center gap-4 md:gap-8 border-t border-gray-100 pt-8 flex-wrap">
              <button onClick={() => changeMonth(-1)} className="p-3 hover:bg-emo-bg rounded-full transition-colors group">
                <FiChevronLeft size={28} className="text-emo-primary group-hover:scale-110 transition-transform" />
              </button>
              <span className="text-xl md:text-2xl font-bold text-gray-800 text-center uppercase tracking-widest min-w-[180px]">
                {currentMonthName} {currentYear}
              </span>
              <button onClick={() => changeMonth(1)} className="p-3 hover:bg-emo-bg rounded-full transition-colors group">
                <FiChevronRight size={28} className="text-emo-primary group-hover:scale-110 transition-transform" />
              </button>
            </div>
          </div>

          <div className="mb-12">
            <h2 className="text-3xl font-bold mb-2">Positive Quotes</h2>
            <p className="text-gray-600 mb-6 text-lg">A message designed to provide moral support</p>
            <div className="flex flex-col gap-6">
              {quotesData.map((quote, index) => (
                <div key={index} className="bg-white p-6 rounded-3xl shadow-md flex flex-col md:flex-row items-center gap-8">
                  <div className="w-full md:w-1/3 h-48 bg-gray-200 rounded-2xl overflow-hidden flex-shrink-0">
                    <img src={quote.image} alt={`Quote ${index + 1}`} className="w-full h-full object-cover" />
                  </div>
                  <p className="flex-1 font-medium text-lg text-gray-800 italic leading-relaxed">
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