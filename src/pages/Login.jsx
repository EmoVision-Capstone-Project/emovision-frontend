import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom"; 
import axios from "axios";
import authCharacters from "../assets/auth-characters.png";
import logoImg from "../assets/logo.png";
import eyeOpen from "../assets/eye-open.png";
import eyeClose from "../assets/eye-close.png";

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();

  const [showPassword, setShowPassword] = useState(false);
  
  const [formData, setFormData] = useState({
    username: "",
    password: ""
  });

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    if (location.state?.message) {
      setSuccessMessage(location.state.message);
      window.history.replaceState({}, document.title);
    }
  }, [location]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    if (!formData.username || !formData.password) {
      return setErrorMessage("Your password and username must be entered!");
    }

    setIsLoading(true);

    try {
      const response = await axios.post("https://emovision-backend-production.up.railway.app/api/auth/login", formData);
      const userData = response.data.data;
      localStorage.setItem("user", JSON.stringify(userData));
      console.log("Login successful, session saved:", userData);
      navigate("/dashboard"); 
      
    } catch (error) {
      console.error("Failed to login:", error);
      setErrorMessage(error.response?.data?.message || "An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

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
            <p className="text-2xl font-bold mb-8">Let's start to writing...</p>
          </div>
          <div className="flex justify-center mb-8">
            <img src={authCharacters} alt="Characters" className="w-3/4 object-contain" />
          </div>
          <p className="text-sm font-light opacity-90 leading-relaxed max-w-xs">
            Login to continue your journey of self-reflection and get your latest Personal Insight today.
          </p>
        </div>

        <div className="w-full md:w-1/2 flex flex-col justify-center items-center p-12 bg-emo-bg">
          <h2 className="text-5xl font-bold text-emo-secondary mb-12">Login</h2>

          <form onSubmit={handleLogin} className="w-full max-w-sm flex flex-col gap-6">
            {successMessage && (
              <div className="bg-green-100 text-green-700 p-3 rounded-lg text-sm text-center font-medium">
                {successMessage}
              </div>
            )}

            {errorMessage && (
              <div className="bg-red-100 text-red-600 p-3 rounded-lg text-sm text-center font-medium">
                {errorMessage}
              </div>
            )}

            <input 
              type="text" 
              name="username"
              placeholder="Username" 
              value={formData.username}
              onChange={handleChange}
              className="w-full px-6 py-4 rounded-full border-[3px] border-emo-secondary bg-transparent focus:outline-none focus:border-emo-primary"
            />

            <div className="relative w-full">
              <input 
                type={showPassword ? "text" : "password"} 
                name="password"
                placeholder="Password" 
                value={formData.password}
                onChange={handleChange}
                className="w-full px-6 py-4 rounded-full border-[3px] border-emo-secondary bg-transparent focus:outline-none focus:border-emo-primary"
              />
              <div 
                className="absolute right-6 top-1/2 -translate-y-1/2 cursor-pointer hover:opacity-70 transition-opacity"
                onClick={() => setShowPassword(!showPassword)}
              >
                <img src={showPassword ? eyeOpen : eyeClose} alt="Toggle Password" className="h-6 w-6 object-contain" />
              </div>
            </div>

            <button 
              type="submit" 
              disabled={isLoading}
              className={`w-full text-white font-bold text-xl py-4 rounded-full shadow-md transition-colors ${
                isLoading ? 'bg-gray-400 cursor-not-allowed' : 'bg-emo-secondary hover:bg-emo-primary'
              }`}
            >
              {isLoading ? "Loading..." : "Login"}
            </button>
          </form>

          <p className="mt-8 text-gray-800">
            Not a member? <Link to="/register" className="text-emo-secondary font-bold">Register Now</Link>
          </p>
        </div>
      </div>
    </div>
  );
}