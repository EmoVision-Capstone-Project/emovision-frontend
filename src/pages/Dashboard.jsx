import { Link } from "react-router-dom";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import streakIcon from "../assets/streak-icon.png";
import quoteImg1 from "../assets/quote1.jpg";
import quoteImg2 from "../assets/quote2.jpg";
import quoteImg3 from "../assets/quote3.jpg";

const moodLabels = {
  8: 'Anger', 7: 'Happy', 6: 'Sad', 5: 'Disgust',
  4: 'Anxious', 3: 'Tired', 2: 'Calm', 1: 'Insecure'
};

const dataMood = [
  { name: 'Jan', mood: 5 }, { name: 'Feb', mood: 6 }, { name: 'Mar', mood: 2 },
  { name: 'Apr', mood: 3 }, { name: 'May', mood: 7 }, { name: 'Jun', mood: 5 },
  { name: 'Jul', mood: 4 }, { name: 'Aug', mood: 6 }, { name: 'Sep', mood: 3 },
  { name: 'Oct', mood: 4 }, { name: 'Nov', mood: 2 }, { name: 'Dec', mood: 1 },
];

const quotesData = [
  {
    image: quoteImg1,
    text: "You are your own little plant, water yourself, speak to yourself nicely and bloom."
  },
  {
    image: quoteImg2,
    text: "If it doesn't happen the way you wanted, it will happen in a better way than you can imagine because that's the beauty of God's plan."
  },
  {
    image: quoteImg3,
    text: "Darkness cannot drive out darkness: only light can do that. Hate cannot drive out hate: only love can do that."
  }
];

export default function Dashboard() {
  const username = "Zila"; 

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
              <div className="bg-[#81C784] h-20 w-20 rounded-full flex items-center justify-center text-white text-4xl mb-2 shadow-inner">
                😑
              </div>
              <p className="font-bold text-lg text-gray-800">Neutral</p>
            </div>

            <div className="bg-white p-6 rounded-3xl shadow-lg flex flex-col items-center justify-center text-center">
              <h3 className="font-bold text-xl mb-4">Streak</h3>
              <img src={streakIcon} alt="Streak Fire" className="h-16 mb-2 object-contain drop-shadow-md" />
              <p className="font-bold text-lg text-gray-800">7 Days</p>
            </div>

            <Link to="/journaling" className="bg-white p-6 rounded-3xl shadow-lg flex flex-col items-center justify-center text-center cursor-pointer hover:scale-105 transition-transform duration-300">
              <h3 className="font-bold text-xl mb-4 text-emo-primary">Gentle Reminder</h3>
              <p className="font-medium text-gray-700 px-4">Don't forget fill your journal today!!</p>
            </Link>
          </div>

          <div className="bg-white p-8 rounded-3xl shadow-lg mb-12">
            <h2 className="text-center text-2xl font-bold mb-8">Graphic Mood</h2>
            <div className="h-96 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={dataMood} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorMood" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#E0AED0" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#E0AED0" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="name" tick={{fill: '#AC87C5', fontWeight: 'bold'}} />
                  <YAxis 
                    domain={[1, 8]} 
                    ticks={[1, 2, 3, 4, 5, 6, 7, 8]} 
                    tickFormatter={(tick) => moodLabels[tick]} 
                    tick={{ fill: '#374151', fontSize: 13, fontWeight: 600 }}
                    axisLine={false}
                    tickLine={false}
                    width={80}
                  />
                  <Tooltip formatter={(value) => [moodLabels[value], "Mood"]} />
                  <Area type="monotone" dataKey="mood" stroke="#AC87C5" strokeWidth={3} fillOpacity={1} fill="url(#colorMood)" />
                </AreaChart>
              </ResponsiveContainer>
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