import Navbar from "../components/Navbar";
import heroImg from "../assets/hero-illustration.png"; 
import aboutImg from "../assets/about-illustration.png";
import iconCamera from "../assets/icon-camera.png";
import iconLaptop from "../assets/icon-laptop.png";
import iconAffirmation from "../assets/icon-affirmation.png";
import iconBreathing from "../assets/icon-breathing.png";
import iconGraphic from "../assets/icon-graphic.png";
import iconStreak from "../assets/icon-streak.png";
import iconQuotes from "../assets/icon-quotes.png";
import Footer from "../components/Footer";

const featuresData = [
  {
    title: "FACE MOOD DETECTION",
    icon: <img src={iconCamera} alt="Camera Icon" className="h-30 mb-6 object-contain" />,
    desc: "Detecting users' moods in real-time through facial expressions using a camera."
  },
  {
    title: "JOURNALING",
    icon: <img src={iconLaptop} alt="Laptop Icon" className="h-30 mb-6 object-contain" />,
    desc: "A space for users to share their experiences and thoughts every day."
  },
  {
    title: "AFFIRMATION",
    icon: <img src={iconAffirmation} alt="Affirmation Icon" className="h-30 mb-6 object-contain" />,
    desc: "Users can write a positive message or a personal resolution for themselves today."
  },
  {
    title: "MINDFUL BREATHING",
    icon: <img src={iconBreathing} alt="Breathing Icon" className="h-30 mb-6 object-contain" />,
    desc: "Relax your mind and body with guided 4-7-8 breathing techniques."
  },
  {
    title: "MOOD GRAPHIC",
    icon: <img src={iconGraphic} alt="Graphic Icon" className="h-30 mb-6 object-contain" />,
    desc: "Allows you to visualize daily emotional changes alongside your journal entries."
  },
  {
    title: "STREAK",
    icon: <img src={iconStreak} alt="Streak Icon" className="h-30 mb-6 object-contain" />,
    desc: "Track how often users write in their journals each day to build a positive habit."
  },
  {
    title: "POSITIVE QUOTES",
    icon: <img src={iconQuotes} alt="Quotes Icon" className="h-30 mb-6 object-contain" />,
    desc: "A message designed to provide moral support every time the user opens the app."
  }
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-emo-bg font-fredoka">
      <Navbar />

      <section id="home" className="flex flex-col md:flex-row items-center justify-between px-10 md:px-20 py-16 gap-10">
        
        <div className="flex-1 space-y-6">
          <h1 className="text-5xl md:text-6xl font-bold leading-tight text-gray-900">
            See Your <span className="text-emo-primary font-bold">Emotion</span>, <br />
            Understand Yourself
          </h1>
          
          <p className="text-lg text-gray-700 max-w-lg leading-relaxed">
            Transforming the spectrum of emotions into a clear vision. 
            EmoVision helps you see more clearly, understand more deeply, 
            and grow more effectively through the power of visualizing your mood.
          </p>

          <button className="bg-emo-secondary text-white px-8 py-3 rounded-full font-bold uppercase tracking-wider shadow-lg hover:bg-emo-primary transition-all transform hover:scale-105">
            Get Started
          </button>
        </div>

        <div className="flex-1 flex justify-center">
          <img 
            src={heroImg} 
            alt="EmoVision Illustrations" 
            className="w-full max-w-md md:max-w-xl object-contain drop-shadow-xl"
          />
        </div>

      </section>

      <section id="about" className="bg-emo-primary text-white py-20 px-10 md:px-20 flex flex-col items-center text-center">
        
        <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white py-1">
          What is <span className="text-emo-secondary">EmoVision</span>?
        </h2>
        <p className="max-w-3xl text-lg md:text-xl leading-relaxed mb-12">
          In a world that moves so fast, we often lose touch with our emotions. 
          EmoVision is designed to combine cutting-edge technology with human 
          emotional well-being. We believe that the ability to recognize our 
          emotions objectively and honestly is the first step toward self-understanding.
        </p>

        <img 
          src={aboutImg} 
          alt="Berbagai Karakter Emosi" 
          className="w-full max-w-2xl object-contain mb-12 drop-shadow-2xl"
        />

        <h2 className="text-4xl md:text-5xl font-bold mb-6">Our Vision</h2>
        <p className="max-w-3xl text-lg md:text-xl leading-relaxed">
          With the theme 'Healthy Lives & Well-being,' EmoVision helps everyone 
          achieve life balance and inner well-being through intelligent 
          visualization of emotional data, supporting mental health.
        </p>

      </section>

      <section id="features" className="py-20 px-10 md:px-20 bg-emo-bg text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
          Why is <span className="text-emo-primary">EmoVision</span>?
        </h2>
        <p className="text-lg text-gray-700 mb-16">
          We don't just provide data, we also offer insights through features such as:
        </p>

        <div className="max-w-7xl mx-auto flex flex-col gap-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuresData.slice(0, 4).map((feature, index) => (
              <div 
                key={index} 
                className={`
                  ${index % 2 === 0 ? 'bg-emo-secondary' : 'bg-emo-primary'} 
                  text-white p-10 rounded-[40px] shadow-lg flex flex-col items-center text-center transform transition-all duration-300 hover:-translate-y-3 hover:shadow-2xl
                `}
              >
                <h3 className="font-bold text-lg mb-3 tracking-wide">{feature.title}</h3>
                {feature.icon}
                <p className="text-xs leading-relaxed opacity-90">{feature.desc}</p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:px-32">
            {featuresData.slice(4).map((feature, index) => (
              <div 
                key={index} 
                className={`
                  ${index % 2 === 0 ? 'bg-emo-primary' : 'bg-emo-secondary'} 
                  text-white p-10 rounded-[40px] shadow-lg flex flex-col items-center text-center transform transition-all duration-300 hover:-translate-y-3 hover:shadow-2xl
                `}
              >
                <h3 className="font-bold text-lg mb-3 tracking-wide">{feature.title}</h3>
                {feature.icon}
                <p className="text-xs leading-relaxed opacity-90">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}