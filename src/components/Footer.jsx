import React from "react";

export default function Footer() {
  return (
    <footer className="bg-[#D8A7CA] py-6 px-5 md:px-10 text-white w-full flex-shrink-0 mt-auto">
      <div className="max-w-4xl mx-auto flex flex-col items-center">
        
        <h3 className="font-bold text-xl mb-8 tracking-widest uppercase drop-shadow-sm">
          Contact Us
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 md:gap-x-16 gap-y-6 md:gap-y-4 mb-8 w-full text-center">
          
          <div className="flex flex-col items-center space-y-4 md:space-y-3">
            <div className="flex flex-col items-center w-full">
              <span className="text-xs opacity-80 mb-1">Atika Adelia</span>
              <span className="text-sm font-semibold tracking-wide">
                cdcc119d6x2248@student.devacademy.id
              </span>
            </div>
            <div className="flex flex-col items-center w-full">
              <span className="text-xs opacity-80 mb-1">Hildyah Maretasya A.</span>
              <span className="text-sm font-semibold tracking-wide">
                cacc119d6x2214@student.devacademy.id
              </span>
            </div>
          </div>

          <div className="flex flex-col items-center space-y-4 md:space-y-3">
            <div className="flex flex-col items-center w-full">
              <span className="text-xs opacity-80 mb-1">Fadzilah Saputri</span>
              <span className="text-sm font-semibold tracking-wide">
                cfcc119d6x2340@student.devacademy.id
              </span>
            </div>
            <div className="flex flex-col items-center w-full">
              <span className="text-xs opacity-80 mb-1">Elfa Noviana Sari</span>
              <span className="text-sm font-semibold tracking-wide">
                cacc119D6X2318@student.devacademy.id
              </span>
            </div>
          </div>

          <div className="flex flex-col items-center space-y-4 md:space-y-3">
            <div className="flex flex-col items-center w-full">
              <span className="text-xs opacity-80 mb-1">Fadina Mustika R.</span>
              <span className="text-sm font-semibold tracking-wide">
                cfcc119d6x2423@student.devacademy.id
              </span>
            </div>
            <div className="flex flex-col items-center w-full">
              <span className="text-xs opacity-80 mb-1">Charista Septi D. A.</span>
              <span className="text-sm font-semibold tracking-wide">
                cdcc183d6x2720@student.devacademy.id
              </span>
            </div>
          </div>

        </div>

        <div className="w-full h-[1.5px] bg-white/40 mb-4 rounded-full"></div>
        
        <p className="text-sm font-bold tracking-wide drop-shadow-sm">
          © 2026 EmoVision. All rights reserved.
        </p>
        
      </div>
    </footer>
  );
}