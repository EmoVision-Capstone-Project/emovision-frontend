import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="flex justify-between items-center py-5 px-10 bg-emo-bg sticky top-0 z-50">
      {/* Bagian Kiri: Logo */}
      <div className="flex items-center gap-2 cursor-pointer">
        {/* Kamu bisa menambahkan tag <img> di sini nanti jika ada file ikon mata-nya */}
        <span className="text-3xl font-bold text-emo-secondary">Emo</span>
        <span className="text-3xl font-bold text-emo-primary">Vision</span>
      </div>

      {/* Bagian Kanan: Menu Navigasi */}
      <div className="flex items-center gap-8 font-medium text-gray-800 text-sm tracking-wide">
        <a href="#home" className="hover:text-emo-primary transition-colors cursor-pointer">HOME</a>
        <a href="#about" className="hover:text-emo-primary transition-colors cursor-pointer">ABOUT US</a>
        <a href="#features" className="hover:text-emo-primary transition-colors cursor-pointer">FEATURES</a>
        
        {/* Link ke Halaman Login */}
        <Link to="/login" className="hover:text-emo-primary transition-colors uppercase">
          LOGIN
        </Link>
        
        {/* Tombol ke Halaman Register (Join) */}
        <Link 
          to="/register" 
          className="bg-emo-secondary text-white px-6 py-2 rounded-full uppercase hover:bg-emo-primary transition-all shadow-md"
        >
          JOIN
        </Link>
      </div>
    </nav>
  );
}