import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi"; 
import logoImg from "../assets/logo.png";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen]);

  const closeMenu = () => setIsOpen(false);

  return (
    <nav className="flex justify-between items-center py-5 px-5 md:px-10 bg-emo-bg sticky top-0 z-50 shadow-sm md:shadow-none">
      
      <Link to="/" className="flex items-center gap-3 cursor-pointer z-50" onClick={closeMenu}>
        <img src={logoImg} alt="Logo EmoVision" className="h-10 object-contain" />
        <div className="font-fredoka font-bold text-2xl tracking-tight">
          <span className="text-emo-secondary">Emo</span>
          <span className="text-emo-primary">Vision</span>
        </div>
      </Link>

      <div className="hidden md:flex items-center gap-8 font-medium text-gray-800 text-sm tracking-wide">
        <a href="#home" className="hover:text-emo-primary transition-colors cursor-pointer">HOME</a>
        <a href="#about" className="hover:text-emo-primary transition-colors cursor-pointer">ABOUT US</a>
        <a href="#features" className="hover:text-emo-primary transition-colors cursor-pointer">FEATURES</a>
        
        <Link to="/login" className="hover:text-emo-primary transition-colors uppercase">
          LOGIN
        </Link>
        
        <Link to="/register" className="bg-emo-secondary text-white px-6 py-2 rounded-full uppercase hover:bg-emo-primary transition-all shadow-md">
          JOIN
        </Link>
      </div>

      <div 
        className="md:hidden z-50 cursor-pointer text-gray-800 bg-white p-2 rounded-xl shadow-sm" 
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
      </div>

      <div className={`
        fixed inset-0 bg-white/95 backdrop-blur-md z-40 flex flex-col items-center justify-center gap-8 font-bold text-xl transition-all duration-300 md:hidden
        ${isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full pointer-events-none'}
      `}>
        <a href="#home" onClick={closeMenu} className="hover:text-emo-primary transition-colors uppercase tracking-widest">HOME</a>
        <a href="#about" onClick={closeMenu} className="hover:text-emo-primary transition-colors uppercase tracking-widest">ABOUT US</a>
        <a href="#features" onClick={closeMenu} className="hover:text-emo-primary transition-colors uppercase tracking-widest">FEATURES</a>
        
        <div className="w-16 h-[2px] bg-gray-200 my-2"></div> 

        <Link to="/login" onClick={closeMenu} className="hover:text-emo-primary transition-colors uppercase tracking-widest">
          LOGIN
        </Link>
        
        <Link to="/register" onClick={closeMenu} className="bg-emo-secondary text-white px-10 py-3 rounded-full uppercase tracking-widest shadow-md">
          JOIN EMOVISION
        </Link>
      </div>

    </nav>
  );
}