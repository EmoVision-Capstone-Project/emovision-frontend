import { Link } from "react-router-dom";
import logoImg from "../assets/logo.png";

export default function Navbar() {
  return (
    <nav className="flex justify-between items-center py-5 px-10 bg-emo-bg sticky top-0 z-50">
      
      <Link to="/" className="flex items-center gap-3 cursor-pointer">
        
        <img src={logoImg} alt="Logo EmoVision" className="h-10 object-contain" />
        
        <div className="font-fredoka font-bold text-2xl tracking-tight hidden md:block">
          <span className="text-emo-secondary">Emo</span>
          <span className="text-emo-primary">Vision</span>
        </div>

      </Link>

      <div className="flex items-center gap-8 font-medium text-gray-800 text-sm tracking-wide">
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

    </nav>
  );
}