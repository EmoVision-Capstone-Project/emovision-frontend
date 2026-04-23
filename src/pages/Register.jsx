import { useState } from "react";
import { Link } from "react-router-dom";
import authCharacters from "../assets/auth-characters.png";
import logoImg from "../assets/logo.png";
import eyeOpen from "../assets/eye-open.png";
import eyeClose from "../assets/eye-close.png";

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center bg-emo-bg font-fredoka p-4 md:p-8">
      <div className="flex w-full max-w-5xl bg-emo-bg rounded-[40px] shadow-2xl overflow-hidden">
        
        <div className="hidden md:flex flex-col justify-between w-1/2 bg-emo-secondary p-12 text-white rounded-[40px]">
          <div>
            <div className="flex items-center gap-3 mb-12">
               <img src={logoImg} alt="Logo" className="h-8 w-auto" />
               <div className="text-xl font-bold">
                 <span className="text-emo-bg">Emo</span>Vision
               </div>
            </div>
            
            <h1 className="text-5xl font-bold mb-2">Welcome!</h1>
            <p className="text-2xl font-bold mb-8">First thing first...</p>
          </div>

          <div className="flex justify-center mb-8">
            <img src={authCharacters} alt="Characters" className="w-3/4 object-contain" />
          </div>

          <p className="text-sm font-light opacity-90 leading-relaxed max-w-xs">
            Personalize your profile today to get to know yourself better through a clear emotional perspective.
          </p>
        </div>

        <div className="w-full md:w-1/2 flex flex-col justify-center items-center p-12 bg-emo-bg">
          <h2 className="text-5xl font-bold text-emo-secondary mb-8">Create Account</h2>

          <form className="w-full max-w-sm flex flex-col gap-4">
            
            <input 
              type="text" 
              placeholder="Name" 
              className="w-full px-6 py-4 rounded-full border-[3px] border-emo-secondary bg-transparent focus:outline-none focus:border-emo-primary"
            />

            <input 
              type="text" 
              placeholder="Username" 
              className="w-full px-6 py-4 rounded-full border-[3px] border-emo-secondary bg-transparent focus:outline-none focus:border-emo-primary"
            />

            <div className="relative w-full">
              <input 
                type={showPassword ? "text" : "password"} 
                placeholder="Password" 
                className="w-full px-6 py-4 rounded-full border-[3px] border-emo-secondary bg-transparent focus:outline-none focus:border-emo-primary"
              />
              <div 
                className="absolute right-6 top-1/2 -translate-y-1/2 cursor-pointer hover:opacity-70 transition-opacity"
                onClick={() => setShowPassword(!showPassword)}
              >
                <img 
                  src={showPassword ? eyeOpen : eyeClose} 
                  alt="Toggle" 
                  className="h-6 w-6 object-contain"
                />
              </div>
            </div>

            <div className="relative w-full">
              <input 
                type={showConfirmPassword ? "text" : "password"} 
                placeholder="Confirm Password" 
                className="w-full px-6 py-4 rounded-full border-[3px] border-emo-secondary bg-transparent focus:outline-none focus:border-emo-primary"
              />
              <div 
                className="absolute right-6 top-1/2 -translate-y-1/2 cursor-pointer hover:opacity-70 transition-opacity"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                <img 
                  src={showConfirmPassword ? eyeOpen : eyeClose} 
                  alt="Toggle" 
                  className="h-6 w-6 object-contain"
                />
              </div>
            </div>

            <button type="button" className="w-full bg-emo-secondary text-white font-bold text-xl py-4 rounded-full hover:bg-emo-primary shadow-md mt-2">
              Create Account
            </button>
          </form>

          <p className="mt-8 text-gray-800">
            Already have an account? <Link to="/login" className="text-emo-secondary font-bold">Login Now</Link>
          </p>
        </div>

      </div>
    </div>
  );
}