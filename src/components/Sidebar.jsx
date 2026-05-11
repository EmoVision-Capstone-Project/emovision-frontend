import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { FiMenu, FiGrid, FiBookOpen, FiCamera, FiMessageCircle, FiUser, FiLogOut, FiWind } from "react-icons/fi";
import logoImg from "../assets/logo.png";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setIsMobile(true);
        setIsOpen(false); 
      } else {
        setIsMobile(false);
        setIsOpen(true); 
      }
    };

    handleResize(); 
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (isMobile) setIsOpen(false);
  }, [location.pathname, isMobile]);

  const menus = [
    { title: "DASHBOARD", icon: <FiGrid size={24} />, path: "/dashboard" },
    { title: "JOURNALING", icon: <FiBookOpen size={24} />, path: "/journaling" },
    { title: "FACE MOOD DETECTION", icon: <FiCamera size={24} />, path: "/face-mood" },
    { title: "AFFIRMATION", icon: <FiMessageCircle size={24} />, path: "/affirmation" },
    { title: "MINDFUL BREATHING", icon: <FiWind size={24} />, path: "/breathing" },
  ];

  return (
    <>
      {isMobile && !isOpen && (
        <FiMenu 
          className="fixed top-6 left-6 text-emo-primary bg-white text-4xl p-2 rounded-xl cursor-pointer shadow-md z-40"
          onClick={() => setIsOpen(true)}
        />
      )}

      {isMobile && isOpen && (
        <div 
          className="fixed inset-0 bg-black/40 z-40 transition-opacity"
          onClick={() => setIsOpen(false)}
        />
      )}

      <div className={`
        ${isMobile ? "fixed h-full z-50 shadow-2xl" : "relative h-screen flex-shrink-0"} 
        ${isOpen ? "w-72 translate-x-0" : isMobile ? "-translate-x-full w-72" : "w-20 translate-x-0"} 
        bg-emo-primary flex flex-col justify-between p-5 pt-8 text-white transition-all duration-300
      `}>
        
        {!isMobile && (
          <FiMenu 
            className={`absolute top-9 bg-white text-emo-primary text-3xl p-1 rounded-full cursor-pointer shadow-md border border-emo-primary z-50 transition-all duration-300
              ${isOpen ? "-right-4" : "-right-4"} 
            `}
            onClick={() => setIsOpen(!isOpen)}
          />
        )}

        <div className="overflow-hidden">
          <div className="flex items-center gap-x-4 mb-10 h-10">
            <img src={logoImg} alt="Logo" className={`h-10 w-10 object-contain flex-shrink-0 duration-500 ${isOpen && "rotate-[360deg]"}`} />
            <h1 className={`text-white origin-left font-bold text-2xl duration-200 ${!isOpen && "scale-0"}`}>
              EmoVision
            </h1>
          </div>

          <ul className="pt-2 space-y-4">
            {menus.map((menu, index) => (
              <Link to={menu.path} key={index}>
                <li className={`flex items-center ${isOpen ? "justify-start gap-x-4" : "justify-center"} cursor-pointer p-3 rounded-xl transition-colors duration-200 ${
                    location.pathname === menu.path ? "bg-white text-emo-primary font-bold" : "hover:bg-white/20"
                  } mt-2`}
                >
                  <div className="flex-shrink-0">{menu.icon}</div>
                  <span className={`duration-200 whitespace-nowrap ${!isOpen && "hidden"}`}>
                    {menu.title}
                  </span>
                </li>
              </Link>
            ))}
          </ul>
        </div>

        <div className="border-t border-white/30 pt-4 space-y-4 overflow-hidden">
          <Link to="/profile" className={`flex items-center ${isOpen ? "justify-start gap-x-4" : "justify-center"} cursor-pointer p-3 hover:bg-white/20 rounded-xl`}>
            <div className="flex-shrink-0"><FiUser size={24} /></div>
            <span className={`duration-200 whitespace-nowrap ${!isOpen && "hidden"}`}>PROFILE</span>
          </Link>
          <Link to="/login" className={`flex items-center ${isOpen ? "justify-start gap-x-4" : "justify-center"} cursor-pointer p-3 hover:bg-white/20 rounded-xl`}>
            <div className="flex-shrink-0"><FiLogOut size={24} /></div>
            <span className={`duration-200 whitespace-nowrap ${!isOpen && "hidden"}`}>LOG OUT</span>
          </Link>
        </div>
      </div>
    </>
  );
}